import { PHOTOBOOK_LIST } from "@/containers/photobook/_local";
import { ALBUM_LIST } from "@/data/album";

const baseUrl = "https://hanroro.vercel.app";

export default async function sitemap() {
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/profile`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/calendar`, lastModified: new Date() },
    ...generateAlbumSiteMap(),
    ...generatePhotobookSiteMap(),
  ];
}

function generateAlbumSiteMap() {
  const albumSiteMap = ALBUM_LIST.map((album) => ({
    url: `${baseUrl}/album/${album.engTitle.toLowerCase()}`,
    lastModified: new Date(),
  }));

  return albumSiteMap;
}

function generatePhotobookSiteMap() {
  const photobookSiteMap = PHOTOBOOK_LIST.map((photobook) => ({
    url: `${baseUrl}/photobook/${photobook.titleEng.toLowerCase()}`,
    lastModified: new Date(),
  }));

  return photobookSiteMap;
}
