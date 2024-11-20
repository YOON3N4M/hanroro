import ProfileContainer from "@/containers/profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 프로필",
  description:
    "한로로 님의 프로필, 앨범 활동, 미디어 출연 정보 등을 확인 할 수 있습니다.",
};

export default function ProfilePage(props: any) {
  return <ProfileContainer searchParams={props.searchParams} />;
}
