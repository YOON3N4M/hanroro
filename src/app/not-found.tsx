import { Link } from "next-view-transitions";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="my-auto text-xs inner y-inner min-h-screen relative">
      <div className="absolute x-center top-1/4">
        <p>존재하지 않는 페이지 입니다.</p>
        <Link href={"/"} className="underline">
          메인으로 이동
        </Link>
      </div>
    </div>
  );
}
