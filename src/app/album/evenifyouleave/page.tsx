import EvenIfYouLeaveContainer from "@/containers/Album/evenifyouleave";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 자처",
  description:
    "한로로 님의 앨범 '자처'의 정보와 티저 영상/이미지를 확인 할 수 있습니다.",
};
interface EvenIfYouLeavePageProps {}

function EvenIfYouLeavePage(props: EvenIfYouLeavePageProps) {
  const {} = props;

  return <EvenIfYouLeaveContainer />;
}

export default EvenIfYouLeavePage;
