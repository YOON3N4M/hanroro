import { PHOTOBOOK_LIST } from "@/containers/photobook/_local";
import PhotobookSubContainer from "@/containers/photobook/photobookSub";

type PhotobookParams = Promise<{ id: string }>;

interface PhotobookSubPageProps {
  params: PhotobookParams;
}

async function PhotobookSubPage(props: PhotobookSubPageProps) {
  const { params } = props;
  const { id } = await params;

  const photobook = PHOTOBOOK_LIST.find((item) => item.titleEng === id);

  return <PhotobookSubContainer photobook={photobook} />;
}

export default PhotobookSubPage;
