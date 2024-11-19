import ProfileContainer from "@/containers/profile";
import React from "react";

export default function ProfilePage(props: any) {
  return <ProfileContainer searchParams={props.searchParams} />;
}
