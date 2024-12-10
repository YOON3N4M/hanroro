"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    lenis.resize();
  }, [pathname, searchParams, lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }} autoRaf>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
