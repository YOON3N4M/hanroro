"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { TOAST_MESSAGE } from "@/components/toast/message";
import useToast from "@/components/toast/useToast";
import { auth, dbService } from "@/lib/firebase/firebase";
import { useAuthActions, useIsLogin, useUser, useUserDoc } from "@/store/auth";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface AccountContainerProps {}

function AccountContainer(props: AccountContainerProps) {
  const {} = props;

  const { setUserDoc } = useAuthActions();
  const { addToast } = useToast();

  const user = useUserDoc();
  const isLogin = useIsLogin();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  async function handleSignOut() {
    await signOut(auth);
    router.push("/");
  }

  function handleEditClick() {
    setIsEdit((prev) => !prev);
  }

  function onChangeNickname(event: ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
  }

  async function updateUserDoc() {
    if (!user) return;
    if (user.displayName !== nickname) {
      const userDocRef = doc(dbService, "user", user.uid);
      await updateDoc(userDocRef, {
        displayName: nickname,
      });
    }

    setUserDoc({ ...user, displayName: nickname });
    handleEditClick();
    addToast({ message: TOAST_MESSAGE.profileChangeSuccess });
  }

  if (isLogin === "unauthenticated") {
    alert("로그인이 필요한 페이지 입니다.");
    router.push("/");
  }

  useEffect(() => {
    if (!user) return;
    setNickname(user.displayName!);
  }, [user]);
  return (
    <div className="h-full pt-md min-h-fu">
      {isLogin === "initial" && <LoadingSpinner />}
      {user && (
        <>
          <div className="inner">
            <div className="bg-default-gray-bg border min-h-[300px] flex flex-col p-md text-sm">
              <label className="opacity-80">이메일</label>
              <input
                className="max-w-[200px] border rounded-md p-xxs mt-xxxs"
                value={user.email!}
                disabled
              />
              <label className="opacity-80 mt-sm">닉네임</label>
              <div className="flex mt-xxxs gap-xxs">
                <input
                  className="max-w-[200px] border rounded-md p-xxs "
                  value={nickname}
                  disabled={!isEdit}
                  required
                  onChange={onChangeNickname}
                />
                <div className="text-xs flex items-center gap-xxs opacity-70">
                  {!isEdit && <button onClick={handleEditClick}>수정</button>}
                  {isEdit && (
                    <>
                      <button onClick={handleEditClick}>취소</button>
                      <button onClick={updateUserDoc}>확인</button>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-auto ml-auto text-red-400"
              >
                로그아웃
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountContainer;
