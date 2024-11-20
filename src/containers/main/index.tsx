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
    <div className="flex flex-col gap-sm">
      <ContentSection className="mt-sm tab:min-h-[350px] tab:h-[350px]">
        <BannerCarousel />
      </ContentSection>
      <ContentSection className="flex gap-sm text-white mo:flex-col">
        <div className="flex-1 border">
          <ContentModule
            staticImage={theCompass}
            linkHref="/profile?album=나침반"
            alt="hanroro single compass cover image"
          >
            <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
              <h2 className="text-3xl">The Compass</h2>
              <p>New Release</p>
              <p>10.29</p>
            </div>
          </ContentModule>
        </div>
        <div className="flex-1 relative group border">
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
