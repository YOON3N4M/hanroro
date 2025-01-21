export interface BannerGridContent {
  title: string;
  src: string;
  /**
   * 사이트 내 이동
   */
  linkHref?: string;
  /**
   * 외부 링크 (새탭 열기)
   */
  href?: string;
  subTitle?: string;
  date?: string;
}

const HATCHING_ROOM: BannerGridContent = {
  title: "HANRORO X HATCHINGROOM",
  src: "hatchingroom-collaboration.jpg",
  href: "https://hatchingroom.com/product/list.html?cate_no=268",
};

const GERMINATION: BannerGridContent = {
  title: "HANRORO 3rd CONCERT ‘발아(發芽)’",
  subTitle: "포토북",
  src: "hanroro-germination-ref-seung__what-83.jpeg",
};

export const BANNER_GIRD_CONTENT_LIST: BannerGridContent[][] = [
  [GERMINATION, HATCHING_ROOM],
];
