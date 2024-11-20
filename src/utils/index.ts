import { ScheduleType } from "@/data/schedule";

export const cn = (...classNames: (string | false | undefined)[]) => {
  const styledClassNames = [...classNames]
    .map((className) => className && className.split(" "))
    .flat()
    .filter((className) => className);

  return styledClassNames.join(" ");
};

export function isGif(filename: string) {
  return filename.includes(".gif") ? true : false;
}

export function filterDuple<T>(arr: T[]): T[] {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export function sortByNumber<T>(
  arr: T[],
  key: keyof T,
  reverse: boolean = false
): T[] {
  const arrCopy = [...arr];

  arrCopy.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return reverse ? bValue - aValue : aValue - bValue;
    }

    return 0;
  });

  return arrCopy;
}

/**
 * 특정 id값을 가진 element에게 스크롤하는 함수
 */
export const scrollMove = (id: string) => {
  const target = document.querySelector(`#${id}`);

  if (!target) return;

  const targetElementY = target.getBoundingClientRect().y;
  const tagetAbsoluteY = window.scrollY + targetElementY;
  // nav 값을 빼지않으면 이동 위치가 애매해지는 문제가 있음
  const navHeight = 45;

  window.scrollTo({ top: tagetAbsoluteY - navHeight, behavior: "smooth" });
};

/**
 * URL이 아래와 같은 형태여야만 가능
 *
 * https://youtu.be/puw1hdSnSX0?si=-UDmcwoFQkravEaq
 */
export function getYoutubeIdFromUrl(url: string) {
  const match = url.match(/youtu\.be\/([^?]+)/);

  if (match) {
    return match[1];
  } else {
    null;
  }
}

/**
 * 날짜 비교를 위해 문자열 날짜를 숫자 날짜 형식으로 변환해주는 함수
 *
 * ex) 2024-11-20, 2024-11-21에 적용하면
 *
 * => 20241120, 20241121 과 같이 변환되어 이전/이후/당일을 비교할 수 있게 됨.
 */
export function getNumberDate(dateStr: string) {
  const result = parseInt(dateStr.replace(/-/g, ""), 10);

  return result;
}

/**
 * 스케줄 타입의 영문명을 국문명으로 변경
 */
export function translateScheduleType(str: ScheduleType) {
  switch (str) {
    case "anniversary":
      return "기념일";
    case "concert":
      return "공연";
    case "event":
      return "티켓팅/이벤트";
    case "release":
      return "발매";
    case "etc":
      return "기타";
    default:
      return str;
  }
}
