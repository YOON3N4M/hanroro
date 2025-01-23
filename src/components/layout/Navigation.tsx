"use client";

import { Link } from "next-view-transitions";
import LoginButton from "../auth/LoginButton";
import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { IconMenu } from "../svg";
import { usePathname } from "next/navigation";

interface NavigationProps {}

const NAVIGATION_ITEM: { name: string; href: string }[] = [
  { name: "프로필", href: "/profile" },
  // { name: "album", href: "/album" },
  { name: "일정", href: "/calendar" },
  { name: "갤러리", href: "/gallery" },
  { name: "포토앨범", href: "/photobook" },
];

function Navigation(props: NavigationProps) {
  const [isNavHide, setIsNavHide] = useState(true);

  const pathname = usePathname();

  function onClickMenuBtn() {
    setIsNavHide((prev) => !prev);
  }

  useEffect(() => {
    setIsNavHide(true);
  }, [pathname]);

  return (
    <div className="size-full flex">
      <div className="ml-auto h-full relative w-[12px] pc:hidden tab:hidden mo:!flex">
        <button
          onClick={onClickMenuBtn}
          className={cn(" absolute center z-[1000] text-xl")}
        >
          <IconMenu className={cn("", !isNavHide && "stroke-white")} />
        </button>
      </div>

      <nav
        className={cn(
          "flex gap-lg pc:items-center mo:!items-start tab:items-center animate-fadeIn flex-1 mo:fixed mo:bg-default-black-bg mo:w-full mo:left-0 mo:top-0 mo:flex-col mo:h-full mo:p-xxl",
          isNavHide && "mo:hidden"
        )}
      >
        <h2 className="visually-hidden">네비게이션</h2>
        {NAVIGATION_ITEM.map((item) => (
          <div key={item.name}>
            <Link className="mo:text-white mo:text-2xl" href={item.href}>
              {item.name}
            </Link>
          </div>
        ))}
        <div className="pc:ml-auto tab:ml-auto mo:!ml-0">
          <LoginButton className="mo:text-white mo:text-2xl" />
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
