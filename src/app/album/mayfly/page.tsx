import MayflyContainer from "@/containers/Album/mayfly";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 하루살이",
  description:
    "한로로 님의 앨범 '하루살이'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface MayflyPageProps {}

function MayflyPage(props: MayflyPageProps) {
  const {} = props;

  return <MayflyContainer />;
}

export default MayflyPage;
