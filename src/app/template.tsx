"use client";

import SmoothScrolling from "@/components/layout/SmoothScrolling";
import { ReactNode } from "react";

interface templateProps {
  children: ReactNode;
}

function template(props: templateProps) {
  const { children } = props;

  return <SmoothScrolling>{children}</SmoothScrolling>;
}

export default template;
