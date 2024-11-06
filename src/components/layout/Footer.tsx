import Link from "next/link";
import NewTabAnchor from "../ui/NewTabAnchor";

interface FooterProps {}

function Footer(props: FooterProps) {
  const {} = props;

  return (
    <div className="py-xxxl mt-auto text-center opacity-70 text-xs">
      <div>
        <span className="mx-auto">hanroro fanpage</span>
      </div>
      <div className="flex gap-sm justify-center">
        <NewTabAnchor href="https://open.kakao.com/o/s6CV3FWg">contact</NewTabAnchor>
        <Link href="/about">about</Link>
      </div>
    </div>
  );
}

export default Footer;
