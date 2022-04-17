import { useState } from "react";
import Swal from "sweetalert2";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");
  const [entity, setEntity] = useState("musicTrack");
  const [limit, setLimit] = useState(10);

  const searchHandler = (event) => {
    event.preventDefault();
    if (term === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter all search data",
      });
      return;
    }
    const params = {
      term: term,
      entity: entity,
      limit: limit,
    };
    props.searchSong(params);
  };
  return (
    <div className="my-4 text-primary">
      <form className="form-inline" onSubmit={searchHandler}>
        <label className="ml-2 text-dark">Term: </label>
        <input
          type="text"
          className="form-control"
          placeholder="Search Term"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        <label className="ml-2 text-dark">Entity:</label>
        <input
          type="radio"
          className="form-check-input mx-1"
          name="rdEntity"
          value="musicVideo"
          checked={entity === "musicVideo" && "checked"}
          onChange={(e) => setEntity(e.target.value)}
        />
        Video
        <input
          type="radio"
          className="form-check-input mx-1"
          name="rdEntity"
          value="musicTrack"
          checked={entity === "musicTrack" && "checked"}
          onChange={(e) => setEntity(e.target.value)}
        />
        Audio
        <label className="ml-2 text-dark">Limit: </label>
        <input
          type="number"
          className="form-control"
          min={1}
          max={50}
          onChange={(e) => setLimit(e.target.value)}
          value={limit}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-outline-primary mx-1"
        />
      </form>
    </div>
  );
};
export default SearchBar;
