import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface BookingCalendarProps {
  propertyName: string;
  /** Simulated booked dates — replace with real iCal parsing later */
  bookedDates?: Date[];
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Generate some sample booked dates for demo
const generateSampleBookedDates = (): Date[] => {
  const today = new Date();
  const dates: Date[] = [];
  // Book a few random ranges
  for (let offset of [3, 4, 5, 10, 11, 12, 13, 20, 21, 22, 35, 36, 37, 38, 39]) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    dates.push(d);
  }
  return dates;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isPast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const BookingCalendar = ({ propertyName, bookedDates }: BookingCalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: "2",
    message: "",
  });

  const booked = bookedDates || generateSampleBookedDates();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", checkin: "", checkout: "", guests: "2", message: "" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
      {/* Calendar */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-serif text-lg">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center font-sans text-xs tracking-wider text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentYear, currentMonth, i + 1);
            const isBooked = booked.some((b) => isSameDay(b, date));
            const isDatePast = isPast(date);
            const isToday = isSameDay(date, today);

            return (
              <div
                key={i + 1}
                className={`aspect-square flex items-center justify-center font-sans text-sm transition-colors ${
                  isDatePast
                    ? "text-muted-foreground/30"
                    : isBooked
                    ? "bg-primary/10 text-primary line-through"
                    : "text-foreground hover:bg-secondary"
                } ${isToday ? "ring-1 ring-primary/40" : ""}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/10 border border-primary/20" />
            <span className="font-sans text-xs text-muted-foreground">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-background border border-border" />
            <span className="font-sans text-xs text-muted-foreground">Available</span>
          </div>
        </div>

        <p className="font-sans text-xs text-muted-foreground/60 mt-4">
          Calendar synced via iCal. Updated daily.
        </p>
      </div>

      {/* Booking inquiry form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div>
          <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
              Check-in
            </label>
            <input
              type="date"
              required
              value={formData.checkin}
              onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
              className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
              Check-out
            </label>
            <input
              type="date"
              required
              value={formData.checkout}
              onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
              className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
            Guests
          </label>
          <select
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5+ guests</option>
          </select>
        </div>
        <div>
          <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
            Message (optional)
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Room preference, dietary needs, questions..."
            className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/40"
          />
        </div>
        <button
          type="submit"
          className="font-sans text-xs tracking-[0.2em] uppercase border border-foreground/20 px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500 w-full md:w-auto"
        >
          Send booking inquiry
        </button>
      </form>
    </div>
  );
};

export default BookingCalendar;
