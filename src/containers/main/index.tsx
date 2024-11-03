"use client";

import GalleryItem from "@/components/GalleryItem";
import Recommend from "./Recommend";
import Footer from "@/components/layout/Footer";
import { GalleryDocsObj } from "@/types";
import Link from "next/link";
import { sortByNumber } from "@/utils";
import Calendar from "@/components/calendar";

interface MainContainerProps {
  galleryDocs: GalleryDocsObj;
}

function MainContainer(props: MainContainerProps) {
  const { galleryDocs } = props;

  return (
    <div className="">
      <section>
        <h2 className="text-authentic-dark text-sm opacity-70 border-b border-authentic-light">schedule</h2>
        <div className="mt-xs">
          <Calendar />
        </div>
      </section>
      <section className="mt-md">
        <h2 className="text-authentic-dark text-sm opacity-70 border-b border-authentic-light">gallery</h2>
        <div className="grid grid-cols-4 gap-xxs mt-xs">
          {galleryDocs.images.slice(0, 8).map((i) => (
            <GalleryItem className="aspect-[1/1] overflow-hidden flex justify-center" key={i.id} doc={i} />
          ))}
        </div>
        <div className="flex justify-end mt-xs">
          <Link className="text-xs" href={"/gallery"}>
            more
          </Link>
        </div>
      </section>
      <section className="mt-md">
        <h2 className="text-sm font-normal opacity-70 border-b border-authentic-light">roro&#39;s recommended</h2>
        <div className="mt-xs">
          <Recommend />
        </div>
      </section>
    </div>
  );
}

export default MainContainer;
