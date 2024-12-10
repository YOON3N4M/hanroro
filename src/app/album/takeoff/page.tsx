import CategorySection from "@/containers/Album/CategorySection";
import ImageSection from "@/containers/Album/ImageSection";
import InformationSection from "@/containers/Album/InformationSection";
import IntroSection from "@/containers/Album/IntroSection";
import VideoSection from "@/containers/Album/VideoSection";
import TakeOffContainer from "@/containers/Album/takeoff";
import { cn } from "@/utils";

interface TakeOffPageProps {}

function TakeOffPage(props: TakeOffPageProps) {
  const {} = props;

  return <TakeOffContainer />;
}

export default TakeOffPage;
