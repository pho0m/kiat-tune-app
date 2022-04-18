import Music from "./components/Music";
import { useEffect, useState, useContext } from "react";
import { Grid, ResponsiveContext } from "grommet";

const Home = (props) => {
  const [musicList, setMusicList] = useState(props.songs);
  const size = useContext(ResponsiveContext);

  useEffect(() => {
    setMusicList(props.songs);
  }, [props.songs]);

  return (
    <div>
      <Grid
        columns={{
          count: size == "small" ? 1 : 2,
          size: "auto",
        }}
        gap="small"
      >
        {musicList.map((song, id) => (
          <Music song={song} key={id} />
        ))}
      </Grid>
    </div>
  );
};
export default Home;
