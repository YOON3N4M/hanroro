import PhotobookContainer from "@/containers/photobook";
import { Metadata } from "next";

interface PhotobookPageProps {}

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 포토북",
  description: "한로로 님의 화보 및 포토북을 확인할 수 있습니다.",
  openGraph: {
    title: "한로로 팬사이트 | 포토북",
    description: "한로로 님의 화보 및 포토북을 확인할 수 있습니다.",
    type: "website",
  },
};

function PhotobookPage(props: PhotobookPageProps) {
  const {} = props;

  return <PhotobookContainer />;
}

export default PhotobookPage;
