import MirrorContainer from "@/containers/Album/mirror";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 거울",
  description:
    "한로로 님의 앨범 '거울'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface MirroPageProps {}

function MirroPage(props: MirroPageProps) {
  const {} = props;

  return <MirrorContainer />;
}

export default MirroPage;
