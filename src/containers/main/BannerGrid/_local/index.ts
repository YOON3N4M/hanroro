//2025.01.15 추가
const THECOLDESTMOMENT: BannerGridContent = {
  title: "HANRORO X THECOLDESTMOMENT",
  src: "hanroro-x-thecoldestmoment.jpeg",
  href: "https://www.instagram.com/thecoldestmoment/",
  objectFit: "contain",
  date: "Available on 2026.01.26",
  subTitle: "Collaboration",
};

const JAMONG_SALGU_CLUB_CONCERT: BannerGridContent = {
  title: "HANRORO 4rd CONCERT ‘자몽살구클럽’",
  src: "hanroro-jamong-salgu-concert1.webp",
  href: "https://www.instagram.com/thecoldestmoment/",
  objectFit: "contain",
  date: "Available on 2026.01.26",
  subTitle: "Collaboration",
};

const JAMONG_SALGU_CLUB: BannerGridContent = {
  title: "자몽살구클럽",
  src: "jamong-salgu-club.webp",
  linkHref: "/album/jamongsalguclub",
  objectFit: "contain",
  subTitle: "포토앨범",
};

//
const GERMINATION: BannerGridContent = {
  title: "HANRORO 3rd CONCERT ‘발아(發芽)’",
  subTitle: "포토앨범",
  src: "thumbnail-hanroro-germination-ref-seung__what-27.jpeg",
  linkHref: "/photobook/germination",
};

const HATCHING_ROOM: BannerGridContent = {
  title: "HANRORO X HATCHINGROOM",
  src: "hatchingroom-collaboration.jpg",
  href: "https://hatchingroom.com/product/list.html?cate_no=268",
};

export const BANNER_GIRD_CONTENT_LIST: BannerGridContent[][] = [
  [THECOLDESTMOMENT, JAMONG_SALGU_CLUB_CONCERT],
  [JAMONG_SALGU_CLUB, GERMINATION],
];

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
  objectFit?: "cover" | "contain";
}
