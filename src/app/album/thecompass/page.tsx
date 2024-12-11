import TheCompassContainer from "@/containers/Album/thecompass";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 나침반",
  description:
    "한로로 님의 앨범 '나침반'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface TheCompassPageProps {}

function TheCompassPage(props: TheCompassPageProps) {
  const {} = props;

  return <TheCompassContainer />;
}

export default TheCompassPage;
