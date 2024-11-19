import { StaticImageData } from "next/image";

export type SearchParams = Record<string, string>;

export interface GalleryDocsObj {
  gif: GalleryItemDoc[];
  images: GalleryItemDoc[];
}

export interface GalleryItemDoc {
  id?: string;
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
  engTitle: string;
  cover: StaticImageData;
  releaseDate: string;
  trackList: Track[];
  desc?: string;
}

export interface Track {
  title: string;
  duration: string;
  youtubeUrl: string;
  isTitle?: boolean;
  desc?: string;
  //작곡가
}

export interface UserDoc {
  uid: string;
  email: string;
  displayName: string;
  createdAt: number;
  job: string;
}
