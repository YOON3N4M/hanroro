import { Link } from "next-view-transitions";
import NewTabAnchor from "../ui/NewTabAnchor";

interface FooterProps {}

function Footer(props: FooterProps) {
  const {} = props;

  return (
    <div className="text-center text-xs text-white">
      <div className="py-lg tab:py-md bg-default-black-bg">
        <div>
          <span className="mx-auto">hanroro fansite</span>
        </div>
        <div className="flex gap-sm justify-center">
          <NewTabAnchor href="https://open.kakao.com/o/s6CV3FWg">
            contact
          </NewTabAnchor>
          <Link href="/about">about</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
