import { IconAppleMusic, IconSpotify, IconYoutube } from "@/components/svg";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { Album } from "@/types";
import Image from "next/image";

interface InformationSectionProps {
  album: Album;
}

function InformationSection(props: InformationSectionProps) {
  const { album } = props;
  const { desc, cover, trackList } = album;
  const titleTrack = trackList.find((track) => track.isTitle);
  return (
    <div className="mb-[20rem] inner">
      <div className="flex gap-xxl tab:flex-col">
        <div className="flex justify-center">
          <Image
            width={cover.width}
            height={cover.height}
            src={cover.src}
            alt={album.title}
            className="pc:size-[300px] tab:w-[80%] tab::h-auto aspect-square"
          />
        </div>
        <div className="max-w-[520px] flex flex-col gap-xl tab:text-sm">
          <div className="flex tab:flex-col tab:gap-sm">
            <div className="basis-[20%] shrink-0">
              <h3>[앨범 소개]</h3>
            </div>
            <div className="">
              <p className="">{desc}</p>
            </div>
          </div>
          <div className="flex tab:flex-col tab:gap-sm">
            <div className="basis-[20%]">
              <h3>[수록곡]</h3>
            </div>
            <div className="flex flex-col">
              {trackList.map((track, idx) => (
                <div key={track.title} className="flex gap-xxs">
                  <span>{idx + 1}. </span>
                  <span>{track.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {titleTrack && (
          <div className="pc:ml-auto flex pc:flex-col text-3xl tab:text-2xl gap-md tab:justify-end">
            {titleTrack.youtubeUrl && (
              <NewTabAnchor
                href={titleTrack.youtubeUrl}
                className="brightness-50 hover:brightness-100 transition-all"
              >
                <IconYoutube />
              </NewTabAnchor>
            )}
            {titleTrack.appleMusicUrl && (
              <NewTabAnchor
                href={titleTrack.appleMusicUrl}
                className="brightness-50 hover:brightness-100 transition-all"
              >
                <IconAppleMusic />
              </NewTabAnchor>
            )}
            {titleTrack.spotifyUrl && (
              <NewTabAnchor
                href={titleTrack.spotifyUrl}
                className="brightness-50 hover:brightness-100 transition-all"
              >
                <IconSpotify />
              </NewTabAnchor>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InformationSection;
