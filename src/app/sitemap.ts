import { ALBUM_LIST } from "@/data/album";

const baseUrl = "https://hanroro.vercel.app";

function generateAlbumSiteMap() {
  const albumSiteMap = ALBUM_LIST.map((album) => ({
    url: `${baseUrl}/album/${album.engTitle.toLowerCase()}`,
    lastModified: new Date(),
  }));

  return albumSiteMap;
}

export default async function sitemap() {
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/profile`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/calendar`, lastModified: new Date() },
    ...generateAlbumSiteMap(),
  ];
}
