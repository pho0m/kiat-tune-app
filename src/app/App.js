import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Home from "./Home";
import MusicPreview from "./components/MusicPreview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

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

    fetch(url) // Fetch data from itunes server
      .then((res) => res.json())
      .then((data) => {
        console.log("2nd", data);
        setCount(data.resultCount);
        setSongs(data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        window.alert(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-3" style={{ border: "solid 1px #A00" }}>
      <Header />
      <SearchBar searchSong={searchSong} />
      <h4 className="text-info">Total track found: {count}</h4>
      {isLoading && <h4 className="text-warning">Loading......</h4>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home songs={songs} />} />
          <Route path="/preview" element={<MusicPreview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
