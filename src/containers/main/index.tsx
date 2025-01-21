"use client";

import { GalleryDocsObj } from "@/types";
import { theCompass } from "../../../public/images/album";

import ContentModule from "./BannerGrid/ContentModule";
import ContentSection from "./BannerGrid/ContentSection";
import BannerCarousel from "./BannerCarousel";
import { chunberia, thirdSolo } from "../../../public/images/schdule";
import { BANNER_GIRD_CONTENT_LIST } from "./BannerGrid/_local";

interface MainContainerProps {
  galleryDocs: GalleryDocsObj;
}

function MainContainer(props: MainContainerProps) {
  const { galleryDocs } = props;

  return (
    <div className="flex flex-col gap-sm y-inner">
      <ContentSection className="tab:min-h-[350px] tab:h-[350px]">
        <h2 className="visually-hidden">배너 캐러셀</h2>
        <BannerCarousel />
      </ContentSection>
      {BANNER_GIRD_CONTENT_LIST.map((colList, idx) => (
        <ContentSection
          key={`col-${idx}`}
          className="flex gap-sm text-white mo:flex-col pc:px-md"
        >
          {colList.map((content) => (
            <ContentModule content={content} key={content.title} />
          ))}
        </ContentSection>
      ))}

      {/* <ContentSection className="flex gap-sm text-white mo:flex-col pc:px-md">
        <div className="flex-1 border">
          <ContentModule
            staticImage={theCompass}
            linkHref="/album/thecompass"
            alt="hanroro single compass cover image"
          >
            <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
              <h3 className="text-3xl">The Compass</h3>
              <p>New Release</p>
              <p>10.29</p>
            </div>
          </ContentModule>
        </div>

        <div className="flex-1 relative group border">
          <ContentModule
            staticImage={hatchingRoomCollaboration}
            href="https://hatchingroom.com/product/list.html?cate_no=268"
            alt="hanroro x hatchingroom keyring"
          >
            <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
              <h3 className="text-3xl">HANRORO X HATCHINGROOM</h3>
              
            </div>
          </ContentModule>
        </div>
      </ContentSection> */}
    </div>
  );
}

export default MainContainer;
