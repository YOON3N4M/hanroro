"use client";

import useDeviceDetect from "@/hooks/useDeviceDetect";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  const { isPc } = useDeviceDetect();

  useEffect(() => {
    if (!isPc) return;
    window.addEventListener("resize", () => {
      if (!lenis) return;
      lenis.resize();
    });
  }, [isPc]);

  useEffect(() => {
    if (!lenis) return;
    if (!isPc) {
      lenis.destroy();
      return;
    }
    lenis.scrollTo(0, { immediate: true });
    lenis.resize();
  }, [pathname, lenis, isPc]);

  useEffect(() => {
    if (!isPc) return;
    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, [isPc]);
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
