import Link from "next/link";

interface HeaderProps {}

const NAVIGATION_ITEM = [
  { name: "profile", href: "/profile" },
  // { name: "album", href: "/album" },
  { name: "gallery", href: "/gallery" },
];

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <header className="inner bg-white text-authentic text-sm">
      <div className="flex !py-lg">
        <div className="basis-1/5">
          <Link href={"/"}>HANRORO</Link>
        </div>
        <nav className="flex gap-lg">
          {NAVIGATION_ITEM.map((item) => (
            <div key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
