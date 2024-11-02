"use client";

import GalleryItem from "@/components/GalleryItem";
import Recommend from "./Recommend";
import Footer from "@/components/layout/Footer";
import { GalleryDocsObj } from "@/types";
import Link from "next/link";

interface MainContainerProps {
  galleryDocs: GalleryDocsObj;
}

function MainContainer(props: MainContainerProps) {
  const { galleryDocs } = props;
  return (
    <div className="">
      <section>
        <h2 className="text-authentic-dark text-sm">calendar</h2>
        <div></div>
      </section>
      <section className="mt-md">
        <h2 className="text-authentic-dark text-sm">gallery</h2>
        <div className="grid grid-cols-4 gap-xxs mt-sm">
          {galleryDocs.images.slice(0, 8).map((i) => (
            <GalleryItem
              className="aspect-[1/1] overflow-hidden flex justify-center"
              key={i.id}
              doc={i}
            />
          ))}
        </div>
        <div className="flex justify-end mt-sm">
          <Link className="text-xs" href={"/gallery"}>
            more
          </Link>
        </div>
      </section>
      <section className="mt-md">
        <h2 className="text-sm font-normal opacity-70">
          roro&#39;s recommended
        </h2>
        <Recommend />
      </section>
    </div>
  );
}

export default MainContainer;
