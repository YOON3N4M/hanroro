interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <header className="inner bg-white text-authentic">
      <div className="flex !py-lg">
        <div className="basis-1/5">ABC</div>
        <nav className="flex gap-lg">
          <div>profile</div>
          <div>album</div>
          <div>gallery</div>
          <div> </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
