import { Link } from "next-view-transitions";
import LoginButton from "../auth/LoginButton";
import Navigation from "./Navigation";

interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <>
      <header className="text-white text-xs h-nav w-full fixed z-[100] mix-blend-difference">
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
