import Link from "next/link";

interface FooterProps {}

function Footer(props: FooterProps) {
  const {} = props;

  return (
    <div className="py-xxxl mt-auto text-center opacity-70 text-xs">
      <p className="">hanroro panpage</p>
      <a href="https://open.kakao.com/o/s6CV3FWg" target="_blank" rel="noopener noreferrer">
        contact
      </a>
    </div>
  );
}

export default Footer;
