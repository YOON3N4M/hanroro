"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useModalElements } from "./store";
import useModal from "./useModal";

function ModalPortal() {
  const modalElements = useModalElements();

  const pathname = usePathname();

  const { closeAllModal } = useModal();

  useEffect(() => {
    closeAllModal();
  }, [pathname]);

  return (
    <div id="modal-portal">
      {modalElements.map((element, idx) => (
        <div key={idx}>{element}</div>
      ))}
    </div>
  );
}

export default ModalPortal;

/**
 * 포탈은 계속 열려 있고 내부 아이테만 바뀌는건 어떤지?
 * 아니면 포털을 계속 열었다가 닫았다가?
 */
