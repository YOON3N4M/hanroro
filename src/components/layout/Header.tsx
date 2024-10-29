import Link from "next/link";

interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <header className="inner bg-white text-authentic text-sm">
      <div className="flex !py-lg">
        <div className="basis-1/5">
          <Link href={"/"}>ABC</Link>
        </div>
        <nav className="flex gap-lg">
          <div>
            <Link href={"/profile"}>profile</Link>
          </div>
          <div>
            <Link href={"/album"}>album</Link>
          </div>
          <div>
            <Link href={"/gallery"}>gallery</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
