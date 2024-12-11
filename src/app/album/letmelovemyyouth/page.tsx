import LetMeLoveMyYouthContainer from "@/containers/Album/letmelovemyyouth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 입춘",
  description:
    "한로로 님의 앨범 '입춘'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};

interface LetMeLoveMyYouthPageProps {}

function LetMeLoveMyYouthPage(props: LetMeLoveMyYouthPageProps) {
  const {} = props;

  return <LetMeLoveMyYouthContainer />;
}

export default LetMeLoveMyYouthPage;
