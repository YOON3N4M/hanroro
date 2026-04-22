import { PHOTOBOOK_LIST } from "@/containers/photobook/_local";
import PhotobookSubContainer from "@/containers/photobook/photobookSub";
import { Metadata } from "next";

type PhotobookParams = Promise<{ id: string }>;

interface PhotobookSubPageProps {
  params: PhotobookParams;
}

export async function generateMetadata(
  props: PhotobookSubPageProps
): Promise<Metadata> {
  const { params } = props;
  const { id } = await params;

  const photobook = PHOTOBOOK_LIST.find((item) => item.titleEng === id);

  if (!photobook) {
    return {
      title: "한로로 팬사이트 | 포토북",
    };
  }

  return {
    title: `한로로 팬사이트 | ${photobook.title}`,
    description: `${photobook.title} 화보 및 포토북`,
    openGraph: {
      title: `한로로 팬사이트 | ${photobook.title}`,
      description: `${photobook.title} 화보 및 포토북`,
      type: "website",
    },
  };
}

async function PhotobookSubPage(props: PhotobookSubPageProps) {
  const { params } = props;
  const { id } = await params;

  const photobook = PHOTOBOOK_LIST.find((item) => item.titleEng === id);

  return <PhotobookSubContainer photobook={photobook} />;
}

export default PhotobookSubPage;
