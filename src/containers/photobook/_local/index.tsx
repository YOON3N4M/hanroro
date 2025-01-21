import photobookJson from "@/data/photobookData.json";

// type PhotobookType = "album" | "concert" | "shoot";

export const srcGenerate = (titleEng: string, imageFileName: string) =>
  `/images/photobook/${titleEng}/${imageFileName}`;

export interface Photobook {
  title: string;
  titleEng: string;
  // type: PhotobookType;
  imageList: PhotobookImageData[];
}

export interface PhotobookImageData {
  imageFileName: string;
  ref: string | null;
}

const GERMINATION: Photobook = {
  title: `단독 콘서트 '발아'`,
  // type: "concert",
  titleEng: "germination",
  imageList: photobookJson.germination,
};

const HYUNDAI_DIVE: Photobook = {
  title: "공연 '현대카드 다이브'",
  // type: "concert",
  titleEng: "hyundai-card-dive",
  imageList: photobookJson["hyundai-card-dive"],
  // thumbnail: "2.JPG",
};

export const PHOTOBOOK_LIST: Photobook[] = [GERMINATION, HYUNDAI_DIVE];
