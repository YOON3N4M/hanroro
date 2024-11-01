import { Album } from "@/types";
import takeOff from "../../public/images/album/take-off.webp";

export const ALBUM_LIST: Album[] = [
  {
    type: "EP1",
    title: "이상비행",
    releaseDate: "2023/08/31",
    cover: takeOff,
    trackList: [
      {
        title: "금붕어",
        duration: "03:32",
      },
    ],
  },
];
