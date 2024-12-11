import TakeOffContainer from "@/containers/Album/takeoff";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 이상비행",
  description:
    "한로로 님의 앨범 '이상비행'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface TakeOffPageProps {}

function TakeOffPage(props: TakeOffPageProps) {
  const {} = props;

  return <TakeOffContainer />;
}

export default TakeOffPage;
