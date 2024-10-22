import GalleryItem from "@/components/GalleryItem";
import Recommend from "./Recommend";

interface MainContainerProps {}

const testArr = [1, 2, 3, 4, 5, 6, 7, 8];

function MainContainer(props: MainContainerProps) {
  const {} = props;

  return (
    <main className="inner bg-white h-full">
      <section>
        <h2 className="text-authentic-dark text-sm">calendar</h2>
        <div></div>
      </section>
      <section className="mt-md">
        <h2 className="text-authentic-dark text-sm">gallery</h2>
        <div className="grid grid-cols-4 gap-sm mt-sm">
          {testArr.map((i) => (
            <GalleryItem className="aspect-[1/1] rounded-md" key={i} />
          ))}
        </div>
        <div className="flex justify-end mt-sm">
          <span className="text-sm">more</span>
        </div>
      </section>
      <section className="mt-md">
        <Recommend />
      </section>
    </main>
  );
}

export default MainContainer;
