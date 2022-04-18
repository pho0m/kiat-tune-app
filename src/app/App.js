import SearchBar from "./components/SearchBar";
import Home from "./Home";
import MusicPreview from "./components/MusicPreview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";

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
  ResponsiveContext,
  Spinner,
} from "grommet";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const size = useContext(ResponsiveContext);

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
          <Box
            direction={size == "small" ? "column" : "row"}
            justify="between"
            align="center"
            pad={{ vertical: "20px" }}
          >
            <img src={logo} width={100} height={100} />
            <Box align={size == "small" ? "start" : "end"}>
              <Heading>KiatTune</Heading>
              <p>Apple iTunes preview web app by Kiattiphoom Pho0m</p>
            </Box>
          </Box>
        </FadeIn>
      </PageContent>
      <PageContent>
        <FadeIn>
          <SearchBar searchSong={searchSong} />
          <h4 className="text-info">Total track found: {count}</h4>

          {isLoading ? (
            <Box width="100%" height="50vh" justify="center" align="center">
              <Spinner />
            </Box>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home songs={songs} />} />
                <Route path="/preview" element={<MusicPreview />} />
              </Routes>
            </BrowserRouter>
          )}
        </FadeIn>
      </PageContent>
    </Page>
  );
};

export default App;
