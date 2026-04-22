import CalendarContainer from "@/containers/calendar";
import { fetchSchedule } from "@/services/_server";
import { ScheduleDoc } from "@/types";
import { getNumberDate } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 캘린더",
  description:
    "한로로 님의 공연, 앨범 발매 일정 등 여러 일정들을 확인 할 수 있습니다.",
  openGraph: {
    title: "한로로 팬사이트 | 캘린더",
    description:
      "한로로 님의 공연, 앨범 발매 일정 등 여러 일정들을 확인 할 수 있습니다.",
    type: "website",
  },
};

export interface ScheduleResult {
  data: ScheduleDoc[];
}

interface CalendarPageProps {}

async function CalendarPage(props: CalendarPageProps) {
  const res = await fetchSchedule();
  let scheduleList: ScheduleDoc[] = [];

  if (res) {
    if (res.ok) {
      const data = res
        ? ((await res?.json()).data as ScheduleResult)
        : ({ data: [] } as ScheduleResult);
      // startDate를 기준으로 정렬
      const sorted = [...data.data].sort(
        (a, b) => getNumberDate(a.startDate) - getNumberDate(b.startDate)
      );
      scheduleList = sorted;
    }
  }

  return <CalendarContainer scheduleList={scheduleList} />;
}

export default CalendarPage;
