import photobookJson from "@/data/photobookData.json";

// type PhotobookType = "album" | "concert" | "shoot";

export const srcGenerate = (titleEng: string, filename: string) =>
  `/images/photobook/${titleEng}/hanroro-${titleEng}-${filename}`;

export interface Photobook {
  title: string;
  titleEng: string;
  // type: PhotobookType;
  imageList: PhotobookImageData[];
}

export interface PhotobookImageData {
  src: string;
  ref: string | null;
}

const GERMINATION: Photobook = {
  title: `단독 콘서트 '발아'`,
  // type: "concert",
  titleEng: "germination",
  imageList: photobookJson.germination,
};

// const HYUNDAI_DIVE: Photobook = {
//   title: "공연 '현대카드 다이브'",
//   // type: "concert",
//   titleEng: "hyundai-dive",
//   imageList: photobookJson["hyundai-dive"],
//   // thumbnail: "2.JPG",
// };

export const PHOTOBOOK_LIST: Photobook[] = [GERMINATION];
