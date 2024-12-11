import DonBeAfraidToFallContainer from "@/containers/Album/dontbeafraidtofall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 비틀비틀짝짜꿍",
  description:
    "한로로 님의 앨범 '비틀비틀짝짜꿍'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface DonBeAfraidToFallPageProps {}

function DonBeAfraidToFallPage(props: DonBeAfraidToFallPageProps) {
  const {} = props;

  return <DonBeAfraidToFallContainer />;
}

export default DonBeAfraidToFallPage;
