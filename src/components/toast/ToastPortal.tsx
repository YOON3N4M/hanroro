"use client";

import { Toast, useToastList } from "./store";
import useToast from "./useToast";

function ToastPortal() {
  const toastList = useToastList();

  return (
    <div id="toast-portal">
      <div className="fixed bottom-[2%] left-[3%] flex flex-col gap-sm">
        {toastList.map((toast, idx) => (
          <ToastItem key={`${idx}-${toast.message}`} toast={toast} />
        ))}
      </div>
    </div>
  );
}

export default ToastPortal;

function ToastItem({ toast }: { toast: Toast }) {
  const { message } = toast;
  return (
    <div className="py-sm px-md bg-default-black-bg text-white text-sm rounded-md animate-fadeIn">
      <p>{message}</p>
    </div>
  );
}
