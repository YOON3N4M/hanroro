"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lenis = useLenis();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (!lenis) return;
      console.log("resize init");
      lenis.resize();
    });
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    lenis.resize();
    console.log("초기화");
  }, [pathname, searchParams, lenis]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, []);
  // useEffect(() => {
  //   if (!lenis) return;
  //   const resizeObserver = new ResizeObserver(() => {
  //     lenis.resize(); // Lenis 크기 업데이트
  //     console.log("resize init");
  //   });

  //   resizeObserver.observe(document.body); // body 전체를 감시하거나 특정 컨테이너만 지정 가능

  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [lenis]);
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }} autoRaf>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
