import MainContainer from "@/containers/main";
import { getGallery } from "@/services/firebase";
import { GalleryDocsObj } from "@/types";
import { sortByNumber } from "@/utils";

const defaultData: GalleryDocsObj = {
  images: [],
  gif: [],
};

export default async function Home() {
  const res = await getGallery();
  const data = res ? ((await res?.json()).data as GalleryDocsObj) : defaultData;
  const sorted = { images: sortByNumber(data.images, "uploadAt", true), gif: sortByNumber(data.gif, "uploadAt", true) };
  return <MainContainer galleryDocs={sorted} />;
}
