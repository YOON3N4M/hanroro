import CalendarContainer from "@/containers/calendar";
import { getSchedule } from "@/services/_server";
import { ScheduleDoc } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 캘린더",
  description:
    "한로로 님의 공연, 앨범 발매 일정 등 여러 일정들을 확인 할 수 있습니다.",
};

export interface ScheduleResult {
  data: ScheduleDoc[];
}

interface CalendarPageProps {}

async function CalendarPage(props: CalendarPageProps) {
  const res = await getSchedule();
  const data = res
    ? ((await res?.json()).data as ScheduleResult)
    : ({ data: [] } as ScheduleResult);

  return <CalendarContainer scheduleList={data.data} />;
}

export default CalendarPage;
