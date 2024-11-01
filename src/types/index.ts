import { StaticImageData } from "next/image";

export interface GalleryDocsObj {
  gif: GalleryItemDoc[];
  images: GalleryItemDoc[];
}

export interface GalleryItemDoc {
  id?: string;
  title: string;
  tags: string[];
  url: string;
  isGif: boolean;
  uploaderId: string;
  storageFileName: string;
  uploadAt: number;
}

export interface Album {
  type: string;
  title: string;
  cover: StaticImageData;
  releaseDate: string;
  trackList: Track[];
}

export interface Track {
  title: string;
  duration: string;
  //작곡가
}
