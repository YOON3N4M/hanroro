"use client";

import { GalleryDocsObj } from "@/types";
import { theCompass } from "../../../public/images/album";
import { hatchingRoomCollaboration } from "./images";
import ContentModule from "./ui/ContentModule";
import ContentSection from "./ui/ContentSection";
import BannerCarousel from "./BannerCarousel";

interface MainContainerProps {
  galleryDocs: GalleryDocsObj;
}

function MainContainer(props: MainContainerProps) {
  const { galleryDocs } = props;

  return (
    <div className="bg-white flex flex-col gap-sm">
      <ContentSection className="">
        <BannerCarousel />
      </ContentSection>
      <ContentSection className="flex gap-sm text-white">
        <div className="flex-1">
          <ContentModule
            staticImage={theCompass}
            href="https://hatchingroom.com/index.html"
            alt="hanroro single compass cover image"
          >
            <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
              <h2 className="text-3xl">The Compass</h2>
              <p>New Release</p>
              <p>10.29</p>
            </div>
          </ContentModule>
        </div>
        <div className="flex-1 bg-white relative group">
          <ContentModule
            staticImage={hatchingRoomCollaboration}
            href="https://hatchingroom.com/index.html"
            alt="hanroro x hatchingroom keyring"
          >
            <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
              <h2 className="text-3xl">HANRORO X HATCHINGROOM</h2>
              {/* <p>click to hatchingroom</p> */}
            </div>
          </ContentModule>
        </div>
      </ContentSection>
    </div>
  );
}

export default MainContainer;
