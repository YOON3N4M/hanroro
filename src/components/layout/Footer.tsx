import Link from "next/link";

interface FooterProps {}

function Footer(props: FooterProps) {
  const {} = props;

  return (
    <div className="py-xxxl mt-auto text-center opacity-70 text-xs">
      <div>
        <span className="mx-auto">hanroro panpage</span>
      </div>
      <div className="flex gap-sm justify-center">
        <a href="https://open.kakao.com/o/s6CV3FWg" target="_blank" rel="noopener noreferrer">
          contact
        </a>
        <Link href="/about">about</Link>
      </div>
    </div>
  );
}

export default Footer;
