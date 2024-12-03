"use server";

import { revalidateTag } from "next/cache";
import { API_BASE_URL, API_TAG } from "..";

//  해당 파일엔
//  app/api에 직접 요청을 날리는 함수들을 작성

export async function revalidateApi(tag: string) {
  revalidateTag(tag);
}

// 현재 클라이언트 컴포넌트에서 쓰임
export async function fetchUserDisplayName(uid: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/user/?uid=${encodeURIComponent(
        uid
      )}&displayName=true`,
      {
        cache: "force-cache",
        next: { tags: [API_TAG.user, uid] },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

// 이 아래는 모두 페이지(서버 컴포넌트)
export async function fetchGallery() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/gallery/`, {
      cache: "force-cache",
      next: { tags: [API_TAG.gallery] },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchSchedule() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/schedule/`, {
      cache: "force-cache",
      next: { tags: [API_TAG.schedule] },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
