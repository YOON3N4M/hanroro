import CalendarContainer from "@/containers/calendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 캘린더",
  description:
    "한로로 님의 공연, 앨범 발매 일정 등 여러 일정들을 확인 할 수 있습니다.",
};

interface CalendarPageProps {}

function CalendarPage(props: CalendarPageProps) {
  const {} = props;

  return <CalendarContainer />;
}

export default CalendarPage;
