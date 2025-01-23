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
  titleEng: "germination",
  imageList: photobookJson.germination,
};

const HYUNDAI_DIVE: Photobook = {
  title: "현대카드 Curated 95",
  titleEng: "hyundai-card-dive",
  imageList: photobookJson["hyundai-card-dive"],
};

const HYPEBEAST: Photobook = {
  title: "Hypebeast 인터뷰",
  titleEng: "hypebeast",
  imageList: photobookJson.hypebeast,
};

const CHUNBEIRA: Photobook = {
  title: "2024 춘베리아 특급열차",
  titleEng: "chunberia",
  imageList: photobookJson.chunberia,
};

export const PHOTOBOOK_LIST: Photobook[] = [
  GERMINATION,
  CHUNBEIRA,
  HYUNDAI_DIVE,
  HYPEBEAST,
];
