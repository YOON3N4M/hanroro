import { PHOTOBOOK_LIST } from "@/containers/photobook/_local";
import PhotobookSubContainer from "@/containers/photobook/photobookSub";

interface PhotobookSubPageProps {
  params: { id: string };
}

function PhotobookSubPage(props: PhotobookSubPageProps) {
  const { params } = props;
  const { id } = params;

  const photobook = PHOTOBOOK_LIST.find((item) => item.titleEng === id);

  return <PhotobookSubContainer photobook={photobook} />;
}

export default PhotobookSubPage;
