import { Album } from "@/types";
import {
  dontBeAfraidToFall,
  evenIfYouLeave,
  home,
  howToGoOn,
  letMeLoveMyYouth,
  mayfly,
  mirror,
  systemError,
  takeOff,
  theCompass,
  theLastStopOfPain,
} from "../../public/images/album";

export const ALBUM_LIST: Album[] = [
  {
    type: "single",
    title: "입춘",
    releaseDate: "2022/03/14",
    cover: letMeLoveMyYouth,
    trackList: [{ title: "입춘", duration: "04:08", youtubeUrl: "" }],
  },
  {
    type: "single",
    title: "거울",
    releaseDate: "2022/06/18",
    cover: mirror,
    trackList: [{ title: "거울", duration: "04:42", youtubeUrl: "" }],
  },
  {
    type: "single",
    title: "비틀비틀 짝짜꿍",
    releaseDate: "2022/09/14",
    cover: dontBeAfraidToFall,
    trackList: [
      { title: "비틀비틀 짝짜꿍", duration: "03:31", youtubeUrl: "" },
    ],
  },
  {
    type: "single",
    title: "정류장",
    releaseDate: "2023/01/04",
    cover: theLastStopOfPain,
    trackList: [{ title: "정류장", duration: "04:12", youtubeUrl: "" }],
  },
  {
    type: "single",
    title: "자처",
    releaseDate: "2023/04/21",
    cover: evenIfYouLeave,
    trackList: [{ title: "자처", duration: "04:32", youtubeUrl: "" }],
  },
  {
    type: "EP1",
    title: "이상비행",
    releaseDate: "2023/08/31",
    cover: takeOff,
    trackList: [
      {
        title: "금붕어",
        duration: "03:32",
        youtubeUrl: "",
      },
    ],
  },
  {
    type: "single",
    title: "하루살이",
    releaseDate: "2023/12/26",
    cover: mayfly,
    trackList: [{ title: "하루살이", duration: "04:02", youtubeUrl: "" }],
  },
  {
    type: "single",
    title: "먹이사슬",
    releaseDate: "2023/04/30",
    cover: systemError,
    trackList: [{ title: "먹이사슬", duration: "03:22", youtubeUrl: "" }],
  },
  {
    type: "single",
    title: "생존법",
    releaseDate: "2023/05/16",
    cover: howToGoOn,
    trackList: [{ title: "생존법", duration: "03:27", youtubeUrl: "" }],
  },
  {
    type: "EP2",
    title: "집",
    releaseDate: "2024/05/28",
    cover: home,
    trackList: [
      {
        title: "귀가",
        duration: "01:50",
        youtubeUrl: "",
      },
    ],
  },
  {
    type: "single",
    title: "나침반",
    releaseDate: "2024/10/29",
    cover: theCompass,
    trackList: [{ title: "나침반", duration: "02:47", youtubeUrl: "" }],
  },
];
