import { Album } from "@/types";
import { LET_ME_LOVE_MY_YOUTH_PAGE_DATA } from "./letMeLoveMyYouth";
import { MIRROR_PAGE_DATA } from "./mirror";
import { DONT_BE_AFRAID_TO_FALL_PAGE_DATA } from "./dontBeAfraidToFall";
import { THE_LAST_STOP_OF_PAIN_PAGE_DATA } from "./theLastStopOfPain";
import { EVEN_IF_YOU_LEAVE_PAGE_DATA } from "./evenIfYouLeave";
import { TAKE_OFF_PAGE_DATA } from "./takeOff";
import { MAYFLY_PAGE_DATA } from "./mayfly";
import { HOME_PAGE_DATA } from "./home";
import { THE_COMPASS_PAGE_DATA } from "./theCompass";
import { JAMONG_SALGU_CLUB_PAGE_DATA } from "./jamongSalguClub";

export interface LocalAlbumPageData {
  album: Album;
  videoSection: string;
  imageSectionList: string[][];
  keyColor: string;
}

export const LOCAL_ALBUM_PAGE_DATA: LocalAlbumPageData[] = [
  LET_ME_LOVE_MY_YOUTH_PAGE_DATA,
  MIRROR_PAGE_DATA,
  DONT_BE_AFRAID_TO_FALL_PAGE_DATA,
  THE_LAST_STOP_OF_PAIN_PAGE_DATA,
  EVEN_IF_YOU_LEAVE_PAGE_DATA,
  TAKE_OFF_PAGE_DATA,
  MAYFLY_PAGE_DATA,
  HOME_PAGE_DATA,
  THE_COMPASS_PAGE_DATA,
  JAMONG_SALGU_CLUB_PAGE_DATA,
];
