import NewTabAnchor from "@/components/ui/NewTabAnchor";
import React from "react";

export default function AboutContainer() {
  return (
    <div className="my-auto text-xs">
      <p>
        가수 한로로님의 팬 페이지 입니다.
        <br /> 순전히 팬심으로 제작되었으며, 사이트를 운영함에 있어
        <br /> 트래픽/광고 등 일체의 금전적 수익은 발생하지 않습니다.
      </p>
      <p className="mt-sm">
        사이트에 기재된 한로로 님의 앨범, 스케줄 등의 정보 중 오류가 있는
        부분들은
        <br />
        아래의 이메일 혹은 오픈채팅으로 제보해 주시면 감사하겠습니다.
        <br />
        새로운 기능, 건의 사항, 디자인 개선에 대한 제안도 환영합니다.
      </p>
      <div className="flex flex-col mt-md">
        <span>yoon3namm@gmail.com</span>
        <NewTabAnchor
          className="underline"
          href="https://open.kakao.com/o/s6CV3FWg"
        >
          kakaotalk
        </NewTabAnchor>
      </div>
    </div>
  );
}
