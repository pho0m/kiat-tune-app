import SearchBar from "./components/SearchBar";
import Home from "./Home";
import MusicPreview from "./components/MusicPreview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Swal } from "sweetalert2";
import FadeIn from "react-fade-in";
import logo from "../static/logo-gif.gif";

import {
  Page,
  PageContent,
  Paragraph,
  Grid,
  Header,
  Heading,
  Box,
} from "grommet";

// import { Icons } from "grommet-icons";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0);

  const searchSong = (params) => {
    setIsLoading(true);
    setCount(0);

    var url = new URL("https://itunes.apple.com/search");
    for (let i in params) {
      url.searchParams.append(i, params[i]);
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log("2nd", data);
        setCount(data.resultCount);
        setSongs(data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
          footer: '<a href="">Why do I have this issue?</a>',
        });
        setIsLoading(false);
      });
  };

  return (
    <Page kind="narrow">
      <PageContent>
        <FadeIn>
          <Grid
            rows={["xxsmall", "xsmall"]}
            columns={["xsmall", "small"]}
            areas={[
              { name: "nav", start: [0, 1], end: [0, 1] },
              { name: "main", start: [1, 1], end: [1, 1] },
            ]}
          >
            <Box gridArea="nav">
              <img src={logo} width={100} height={100} />
            </Box>
            <Box gridArea="main">
              <Header>
                <Heading>KiatTune</Heading>
              </Header>
            </Box>
          </Grid>
          <Paragraph>
            Apple iTunes preview web app by Kiattiphoom Pho0m
          </Paragraph>
        </FadeIn>
      </PageContent>
      <PageContent>
        <SearchBar searchSong={searchSong} />
        <h4 className="text-info">Total track found: {count}</h4>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home songs={songs} />} />
            <Route path="/preview" element={<MusicPreview />} />
          </Routes>
        </BrowserRouter>
      </PageContent>
    </Page>
  );
};
export default App;
