import React from "react";
import ModalTemplate from "../ModalTemplate";
import LoginButton from "@/components/auth/LoginButton";

export default function NeedLoginModal() {
  return (
    <ModalTemplate>
      <div className="min-w-[300px] text-sm mo:min-w-[80vw]">
        <p>
          부적절한 이미지 업로드 방지를 위해
          <br />
          이미지 업로드는 로그인 이후 이용 가능합니다.
        </p>
        <div className="mt-md flex justify-center">
          <LoginButton />
        </div>
      </div>
    </ModalTemplate>
  );
}
