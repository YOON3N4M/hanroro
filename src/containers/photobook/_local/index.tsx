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

const JAMONG_SALGU_CLUB_CONCERT: Photobook = {
  title: "HANRORO 4rd CONCERT ‘자몽살구클럽’",
  titleEng: "jamong-salgu-club-concert",
  imageList: photobookJson["jamong-salgu-club-concert"],
};

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

const HATCHING_ROOM: Photobook = {
  title: "한로로 X 해칭룸",
  titleEng: "hatchingroom",
  imageList: photobookJson.hatchingroom,
};

const UMBRO: Photobook = {
  title: "한로로 X 엄브로",
  titleEng: "umbro",
  imageList: photobookJson.umbro,
};

const ARENA_KOREA: Photobook = {
  title: "아레나 코리아 화보",
  titleEng: "arenakorea",
  imageList: photobookJson.arenakorea,
};

const THANKSGIVING: Photobook = {
  title: "2024 추석 화보",
  titleEng: "thanksgiving",
  imageList: photobookJson.thanksgiving,
};

// const SEBS: Photobook = {
//   title: "2024 SEBS",
//   titleEng: "sebs",
//   imageList: photobookJson.sebs,
// };

export const PHOTOBOOK_LIST: Photobook[] = [
  JAMONG_SALGU_CLUB_CONCERT,
  GERMINATION,
  CHUNBEIRA,
  HYUNDAI_DIVE,
  HYPEBEAST,
  HATCHING_ROOM,
  UMBRO,
  ARENA_KOREA,
  THANKSGIVING,
  // SEBS,
];
