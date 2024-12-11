import TheLastStopOfPainContainer from "@/containers/Album/thelaststopofpain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 정류장",
  description:
    "한로로 님의 앨범 '정류장'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface TheLastStopOfPainPageProps {}

function TheLastStopOfPainPage(props: TheLastStopOfPainPageProps) {
  const {} = props;

  return <TheLastStopOfPainContainer />;
}

export default TheLastStopOfPainPage;
