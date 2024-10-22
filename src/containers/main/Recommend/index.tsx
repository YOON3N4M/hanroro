import { RECOMMEND_MUSIC_LIST } from "@/data/music";
import MusicItem from "./MusicItem";

interface RecommendProps {}

function Recommend(props: RecommendProps) {
  const {} = props;

  return (
    <div className="flex">
      <div className="basis-1/2">
        <h2>music</h2>
        <div>
          {RECOMMEND_MUSIC_LIST.map((music) => (
            <MusicItem key={music.id} music={music} />
          ))}
        </div>
      </div>
      <div className="basis-1/2">
        <h2>books</h2>
      </div>
    </div>
  );
}

export default Recommend;
