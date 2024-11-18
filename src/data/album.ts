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
    engTitle: "letMeLoveMyYouth",
    releaseDate: "2022/03/14",
    cover: letMeLoveMyYouth,
    trackList: [
      {
        title: "입춘",
        duration: "04:08",
        youtubeUrl: "https://youtu.be/kIiW3XRP7bU?si=qB913rxtbJW_qVli",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "거울",
    engTitle: "mirror",
    releaseDate: "2022/06/18",
    cover: mirror,
    trackList: [
      {
        title: "거울",
        duration: "04:42",
        youtubeUrl: "https://youtu.be/OV668xgCau8?si=4HqUq49BD2uK0YJF",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "비틀비틀 짝짜꿍",
    engTitle: "dontBeAfraidToFall",
    releaseDate: "2022/09/14",
    cover: dontBeAfraidToFall,
    trackList: [
      {
        title: "비틀비틀 짝짜꿍",
        duration: "03:31",
        youtubeUrl: "https://youtu.be/XBiMV9kVhwQ?si=hT1K-UMoN6t3XPd7",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "정류장",
    engTitle: "theLastStopOfPain",
    releaseDate: "2023/01/04",
    cover: theLastStopOfPain,
    trackList: [
      {
        title: "정류장",
        duration: "04:12",
        youtubeUrl: "https://youtu.be/2EMgY5E5Ook?si=mmorq50oiHR89puv",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "자처",
    engTitle: "evenIfYouLeave",
    releaseDate: "2023/04/21",
    cover: evenIfYouLeave,
    trackList: [
      {
        title: "자처",
        duration: "04:32",
        youtubeUrl: "https://youtu.be/JyoltvsJ9Fw?si=1_A_DEpReOYI6aAy",
        isTitle: true,
      },
    ],
  },
  {
    type: "EP",
    title: "이상비행",
    engTitle: "takeOff",
    releaseDate: "2023/08/31",
    cover: takeOff,
    trackList: [
      {
        title: "금붕어",
        duration: "03:32",
        youtubeUrl: "https://youtu.be/dAgY7zUqd8E?si=0-nCdNT8_njzlJga",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "하루살이",
    engTitle: "mayfly",
    releaseDate: "2023/12/26",
    cover: mayfly,
    trackList: [
      {
        title: "하루살이",
        duration: "04:02",
        youtubeUrl: "https://youtu.be/ss_WdwNGawM?si=Ik3fMa2N_v4nDJUt",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "먹이사슬",
    engTitle: "systemError",
    releaseDate: "2023/04/30",
    cover: systemError,
    trackList: [
      {
        title: "먹이사슬",
        duration: "03:22",
        youtubeUrl: "https://youtu.be/4HZ8wh2MMpQ?si=PrBED8CR4KeJEYxm",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "생존법",
    engTitle: "howToGoOn",
    releaseDate: "2023/05/16",
    cover: howToGoOn,
    trackList: [
      {
        title: "생존법",
        duration: "03:27",
        youtubeUrl: "https://youtu.be/puw1hdSnSX0?si=-UDmcwoFQkravEaq",
        isTitle: true,
      },
    ],
  },
  {
    type: "EP",
    title: "집",
    engTitle: "home",
    releaseDate: "2024/05/28",
    cover: home,
    trackList: [
      {
        title: "귀가",
        duration: "01:50",
        youtubeUrl: "",
      },
      {
        title: "집",
        duration: "01:50",
        youtubeUrl: "https://youtu.be/U4-cz9NHQv4?si=_AB_3yQRLI159ebw",
        isTitle: true,
      },
    ],
  },
  {
    type: "single",
    title: "나침반",
    engTitle: "theCompass",
    releaseDate: "2024/10/29",
    cover: theCompass,
    trackList: [
      {
        title: "나침반",
        duration: "02:47",
        youtubeUrl: "https://youtu.be/4JwkYsfKRKM?si=ItOFeaGIA6JGbyyX",
        isTitle: true,
      },
    ],
  },
];
