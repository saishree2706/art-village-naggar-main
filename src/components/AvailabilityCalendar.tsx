import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addMonths, format, isBefore, isSameDay, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WHATSAPP_BASE = "https://wa.me/919816650400";

interface AvailabilityResponse {
  commonRooms: string[];
  villa: string[];
  lastSynced: string;
}

type ListingKey = "commonRooms" | "villa";

const LISTING_LABEL: Record<ListingKey, string> = {
  commonRooms: "Rooms / Suites",
  villa: "Entire Villa",
};

async function fetchAvailability(): Promise<AvailabilityResponse> {
  const res = await fetch("/api/availability");
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to load availability");
  }
  return res.json();
}

function toIsoDate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

interface ListingCalendarProps {
  listing: ListingKey;
  bookedDateStrings: string[];
}

function ListingCalendar({ listing, bookedDateStrings }: ListingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const isDesktop = useIsDesktop();

  const today = startOfDay(new Date());
  const maxBookable = addMonths(today, 12);

  const bookedDates = useMemo(
    () => bookedDateStrings.map((s) => startOfDay(new Date(`${s}T00:00:00`))),
    [bookedDateStrings]
  );

  const isDateBooked = (date: Date): boolean =>
    bookedDates.some((b) => isSameDay(b, date));

  // Disable: in the past, > 12 months out, or already booked.
  const disabledMatcher = (date: Date): boolean => {
    if (isBefore(date, today)) return true;
    if (isBefore(maxBookable, date)) return true;
    return isDateBooked(date);
  };

  const whatsappUrl = useMemo(() => {
    if (!range?.from) return null;
    const checkIn = format(range.from, "EEE, d MMM yyyy");
    const checkOutDate = range.to ?? range.from;
    const checkOut = format(checkOutDate, "EEE, d MMM yyyy");
    const message =
      listing === "villa"
        ? `Hi, I'd like to enquire about booking the Entire Kathkuni Villa from ${checkIn} to ${checkOut}.`
        : `Hi, I'd like to enquire about a room booking at Art Village from ${checkIn} to ${checkOut}.`;
    return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
  }, [range, listing]);

  const rangeSummary = useMemo(() => {
    if (!range?.from) return null;
    const from = format(range.from, "d MMM");
    if (!range.to || isSameDay(range.from, range.to)) {
      return `${from} — pick a check-out date`;
    }
    const to = format(range.to, "d MMM yyyy");
    const nights = Math.max(
      1,
      Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
    );
    return `${from} → ${to} · ${nights} night${nights > 1 ? "s" : ""}`;
  }, [range]);

  return (
    <div className="flex flex-col items-center">
      <Calendar
        mode="range"
        numberOfMonths={isDesktop ? 2 : 1}
        selected={range}
        onSelect={setRange}
        disabled={disabledMatcher}
        fromDate={today}
        toDate={maxBookable}
        className="bg-background"
      />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-muted-foreground font-sans">
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-foreground/10 rounded-sm" />
          Booked
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-primary rounded-sm" />
          Selected
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 border border-foreground/40 rounded-sm" />
          Available
        </span>
      </div>

      {rangeSummary && (
        <div className="mt-7 w-full max-w-md text-center">
          <p className="font-sans text-sm text-foreground mb-4">{rangeSummary}</p>
          {whatsappUrl && range?.to && !isSameDay(range.from!, range.to) && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-colors"
            >
              Enquire on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => setRange(undefined)}
            className="block mx-auto mt-3 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear dates
          </button>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {LISTING_LABEL[listing]} calendar. {bookedDateStrings.length} booked night
        {bookedDateStrings.length === 1 ? "" : "s"} loaded.
      </p>
    </div>
  );
}

const AvailabilityCalendar = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["availability"],
    queryFn: fetchAvailability,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const lastSyncedLabel = useMemo(() => {
    if (!data?.lastSynced) return null;
    return format(new Date(data.lastSynced), "d MMM yyyy, h:mm a");
  }, [data?.lastSynced]);

  return (
    <div className="w-full">
      <Tabs defaultValue="commonRooms" className="w-full flex flex-col items-center">
        <TabsList className="mb-8">
          <TabsTrigger value="commonRooms" className="font-sans text-xs tracking-[0.15em] uppercase px-5">
            Rooms / Suites
          </TabsTrigger>
          <TabsTrigger value="villa" className="font-sans text-xs tracking-[0.15em] uppercase px-5">
            Entire Villa
          </TabsTrigger>
        </TabsList>

        {isLoading && (
          <div className="py-20 text-center text-sm text-muted-foreground font-sans">
            Loading availability…
          </div>
        )}

        {isError && (
          <div className="py-12 text-center max-w-md mx-auto">
            <p className="font-sans text-sm text-muted-foreground mb-4">
              We couldn't load live availability right now.
            </p>
            <p className="font-sans text-xs text-muted-foreground/70 mb-6">
              {(error as Error)?.message}
            </p>
            <a
              href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                "Hi, I'd like to check availability at Art Village Naggar."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Ask on WhatsApp
            </a>
          </div>
        )}

        {data && (
          <>
            <TabsContent value="commonRooms" className="w-full flex justify-center">
              <ListingCalendar listing="commonRooms" bookedDateStrings={data.commonRooms} />
            </TabsContent>
            <TabsContent value="villa" className="w-full flex justify-center">
              <ListingCalendar listing="villa" bookedDateStrings={data.villa} />
            </TabsContent>
          </>
        )}
      </Tabs>

      {lastSyncedLabel && (
        <p className="mt-8 text-center font-sans text-[11px] tracking-[0.15em] uppercase text-muted-foreground/70">
          Synced {lastSyncedLabel} · Live from Airbnb
        </p>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
