import Link from "next/link";
import LoginButton from "../auth/LoginButton";
import Navigation from "./Navigation";

interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <>
      <div className="h-nav bg-default-black-bg absolute z-[99] w-full"></div>
      <header className="bg-default-black-bg text-white text-xs h-nav w-full fixed z-[100]">
        <div className="inner h-full">
          <div className="flex gap-[10%] h-full items-center">
            <div className="">
              <Link href={"/"}>HANRORO</Link>
            </div>
            <Navigation />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
