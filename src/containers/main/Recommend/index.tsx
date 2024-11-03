import { RECOMMEND_MUSIC_LIST } from "@/data/music";
import MusicItem from "./MusicItem";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { IconSpotify } from "@/components/svg";
import { RECOMMEND_BOOK_LIST } from "@/data/book";
import BookItem from "./BookItem";

interface RecommendProps {}

function Recommend(props: RecommendProps) {
  const {} = props;

  return (
    <div className="flex text-sm gap-sm mo:flex-col">
      <div className="flex-1">
        <div className="flex gap-sm items-center">
          <h2>music</h2>
          <NewTabAnchor className="text-base" href="https://open.spotify.com/user/31b5u2b6imqqe6ddalfnqvbpdbbm">
            <IconSpotify />
          </NewTabAnchor>
        </div>
        <div className="mt-sm flex flex-col gap-xs max-h-[250px] overflow-y-auto">
          {RECOMMEND_MUSIC_LIST.map((music) => (
            <MusicItem key={music.id} music={music} />
          ))}
        </div>
      </div>
      <div className="flex-1">
        <h2>books</h2>
        <div className="mt-sm flex flex-col gap-xs max-h-[250px] overflow-y-auto">
          {RECOMMEND_BOOK_LIST.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
