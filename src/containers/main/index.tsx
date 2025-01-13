"use client";

import { GalleryDocsObj } from "@/types";
import { theCompass } from "../../../public/images/album";
import { hatchingRoomCollaboration } from "./images";
import ContentModule from "./ui/ContentModule";
import ContentSection from "./ui/ContentSection";
import BannerCarousel from "./BannerCarousel";
import { chunberia, thirdSolo } from "../../../public/images/schdule";

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
      <ContentSection className="flex gap-sm text-white mo:flex-col pc:px-md">
        <h2 className="visually-hidden">메인 배너</h2>
        <div className="flex-1 border">
          <ContentModule
            staticImage={thirdSolo}
            href="https://www.instagram.com/p/DCYnEtkS4Vj/?utm_source=ig_web_copy_link"
            alt="한로로 3번째 단독 콘서트 '발아' 포스터"
          >
            <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
              <h3 className="text-3xl">단독 콘서트 &#39;발아&#39;</h3>

              <p>2025.01.11 ~ 2025.01.12</p>
            </div>
          </ContentModule>
        </div>

        <div className="flex-1 relative group border">
          <ContentModule
            staticImage={chunberia}
            href="https://www.instagram.com/p/DCqbmqlyLiq/"
            alt="춘베리아 특급열차 포스터"
          >
            <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
              <h3 className="text-3xl">춘베리아 특급 열차</h3>

              <p>2024.12.21 13:00</p>
            </div>
          </ContentModule>
        </div>
      </ContentSection>
      <ContentSection className="flex gap-sm text-white mo:flex-col pc:px-md">
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
              {/* <p>click to hatchingroom</p> */}
            </div>
          </ContentModule>
        </div>
      </ContentSection>
    </div>
  );
}

export default MainContainer;
