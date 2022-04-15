import Music from "./components/Music";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [musicList, setMusicList] = useState(props.songs);

  useEffect(() => {
    setMusicList(props.songs);
  }, [props.songs]);
  return (
    <div>
      {musicList.map((song, id) => {
        return <Music song={song} key={id} />;
      })}
    </div>
  );
};
export default Home;
