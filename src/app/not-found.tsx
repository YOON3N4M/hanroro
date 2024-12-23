import { Link } from "next-view-transitions";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="my-auto text-xs inner">
      <p>존재하지 않는 페이지 입니다.</p>
      <Link href={"/"} className="underline">
        메인으로 이동
      </Link>
    </div>
  );
}
