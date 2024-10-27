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
