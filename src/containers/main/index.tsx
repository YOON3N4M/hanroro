"use client";

import GalleryItem from "@/components/GalleryItem";
import Recommend from "./Recommend";
import Footer from "@/components/layout/Footer";
import { GalleryDocsObj } from "@/types";
import Link from "next/link";
import { sortByNumber } from "@/utils";
import Calendar from "@/components/calendar";
import ContentSection from "./ui/ContentSection";
import Image from "next/image";
import { theCompass } from "../../../public/images/album";
import { hatchingRoomCollaboration } from "./images";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import ContentModule from "./ui/ContentModule";
import {
  busan2024,
  gmf2024,
  wonderLivet,
} from "../../../public/images/schdule";

interface MainContainerProps {
  galleryDocs: GalleryDocsObj;
}

function MainContainer(props: MainContainerProps) {
  const { galleryDocs } = props;

  return (
    <div className="bg-white flex flex-col gap-sm">
      <ContentSection className="bg-black"></ContentSection>
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
      <ContentSection className="flex gap-sm">
        <div className="flex-1">
          <ContentModule
            staticImage={busan2024}
            alt="BUSAN ROCK FESTIVAL 2024"
            imageHover={false}
          >
            <span className="absolute center font-[100]">END</span>
            <div className="mt-auto h-1/3 flex flex-col pc:items-center font-[100]">
              <h2 className="text-3xl">BUSAN ROCK FESTIVAL 2024</h2>
              <span className="mo:mt-xs">10.05</span>
            </div>
          </ContentModule>
        </div>
        <div className="flex-1">
          <ContentModule
            staticImage={gmf2024}
            alt="grand mint festival 2024"
            imageHover={false}
          >
            <span className="absolute center font-[100]">END</span>
            <div className="mt-auto h-1/3 flex flex-col pc:items-center font-[100]">
              <h2 className="text-3xl">GRAND MINT FESTIVAL 2024</h2>
              <span className="mo:mt-xs">11.03</span>
            </div>
          </ContentModule>
        </div>
        <div className="flex-1">
          <ContentModule
            staticImage={wonderLivet}
            alt="wonderlivet 2024"
            href="https://wonderli.vet/"
          >
            <div className="mt-auto h-1/3 flex flex-col pc:items-center font-[100]">
              <h2 className="text-3xl">WONDERLIVET 2024</h2>
              <span className="mo:mt-xs">11.08</span>
            </div>
          </ContentModule>
        </div>
      </ContentSection>
    </div>
  );
}

export default MainContainer;
