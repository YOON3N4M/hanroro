import { RECOMMEND_MUSIC_LIST } from "@/data/music";
import MusicItem from "./MusicItem";

interface RecommendProps {}

function Recommend(props: RecommendProps) {
  const {} = props;

  return (
    <div className="flex text-sm">
      <div className="basis-1/2">
        <h2>music</h2>
        <div className="mt-sm flex flex-col gap-xs">
          {RECOMMEND_MUSIC_LIST.slice(0, 5).map((music) => (
            <MusicItem key={music.id} music={music} />
          ))}
        </div>
      </div>
      <div className="basis-1/2">
        <h2>books</h2>
        <div className="mt-sm flex flex-col gap-xs">
          {RECOMMEND_MUSIC_LIST.slice(0, 5).map((music) => (
            <MusicItem key={music.id} music={music} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
