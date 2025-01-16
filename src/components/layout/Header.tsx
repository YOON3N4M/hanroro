import { Link } from "next-view-transitions";
import LoginButton from "../auth/LoginButton";
import Navigation from "./Navigation";
import Image from "next/image";

interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <>
      <header className="text-white text-xs h-nav w-full fixed z-[100] pc:mix-blend-difference header-transition">
        <div className="inner h-full">
          <div className="flex gap-[10%] h-full items-center">
            <div className="">
              <Link href={"/"}>
                <Image
                  priority
                  className="h-[35px] w-auto hover:brightness-50 transition-all"
                  src={"/images/profile/logo.svg"}
                  width={1000}
                  height={1000}
                  alt="한로로 로고"
                />
              </Link>
            </div>
            <Navigation />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
