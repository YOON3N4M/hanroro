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
  title: "HANRORO 3rd CONCERT ‘발아(發芽)’",
  // type: "concert",
  titleEng: "germination",
  imageList: photobookJson.germination,
};

const HYUNDAI_DIVE: Photobook = {
  title: "현대카드 Curated 95",
  // type: "concert",
  titleEng: "hyundai-card-dive",
  imageList: photobookJson["hyundai-card-dive"],
  // thumbnail: "2.JPG",
};

const HYPEBEAST: Photobook = {
  title: "Hypebeast 인터뷰",
  // type: "concert",
  titleEng: "hypebeast",
  imageList: photobookJson["hypebeast"],
  // thumbnail: "2.JPG",
};

export const PHOTOBOOK_LIST: Photobook[] = [
  GERMINATION,
  HYUNDAI_DIVE,
  HYPEBEAST,
];
