import HomeContainer from "@/containers/Album/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 집",
  description:
    "한로로 님의 앨범 '집'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface HomePageProps {}

function HomePage(props: HomePageProps) {
  const {} = props;

  return <HomeContainer />;
}

export default HomePage;
