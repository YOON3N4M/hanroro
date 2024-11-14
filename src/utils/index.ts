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
