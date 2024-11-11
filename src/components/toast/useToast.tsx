import React, { useEffect, useState } from "react";
import { Toast, useToastActions, useToastList } from "./store";

export default function useToast() {
  const toastList = useToastList();
  const { setToastList } = useToastActions();

  /**
   * 기본 값
   *
   * toast.status : 'success'
   *
   * toast.position : 'bottom-left
   */
  function addToast(toast: Toast) {
    const newToast: Toast = {
      ...toast,
      status: toast.status || "success",
      position: toast.position || "bottom-left",
    };

    setToastList([...toastList, newToast]);
  }

  useEffect(() => {
    if (toastList.length === 0) return;

    setTimeout(() => {
      setToastList(toastList.slice(1));
    }, 3000);
  }, [toastList]);

  return { addToast };
}