import PhotobookContainer from "@/containers/photobook";
import { Metadata } from "next";

interface PhotobookPageProps {}

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 포토앨범",
  description:
    "한로로 님의 콜라보, 화보, 공연 등의 각 활동들의 사진들을 한 곳에서 확인 할 수 있습니다.",
};

function PhotobookPage(props: PhotobookPageProps) {
  const {} = props;

  return <PhotobookContainer />;
}

export default PhotobookPage;
