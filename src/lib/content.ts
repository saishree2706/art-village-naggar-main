export interface ContentBlockBase {
  type: string;
  content: string;
  url?: string;
  caption?: string;
  language?: string;
}

export interface CarouselBlock {
  type: "image_carousel";
  images: Array<{ url: string; caption?: string }>;
}

export type GroupedBlock = ContentBlockBase | CarouselBlock;

export function groupContentBlocks(blocks: ContentBlockBase[]): GroupedBlock[] {
  const result: GroupedBlock[] = [];
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i].type === "image") {
      const images: Array<{ url: string; caption?: string }> = [];
      while (i < blocks.length && blocks[i].type === "image") {
        images.push({ url: blocks[i].url ?? "", caption: blocks[i].caption });
        i++;
      }
      if (images.length === 1) {
        result.push({ type: "image", content: "", url: images[0].url, caption: images[0].caption });
      } else {
        result.push({ type: "image_carousel", images });
      }
    } else {
      result.push(blocks[i]);
      i++;
    }
  }
  return result;
}
