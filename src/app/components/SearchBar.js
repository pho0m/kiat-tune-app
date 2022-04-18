import { Form, FormField, Header, RadioButtonGroup, TextInput } from "grommet";
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
    <div>
      <Form onSubmit={searchHandler}>
        <FormField label="Term" value={term}>
          <TextInput
            placeholder="search ....."
            onChange={(e) => setTerm(e.target.value)}
          />
        </FormField>
        <FormField label="Entity">
          <RadioButtonGroup
            options={["musicVideo", "musicTrack"]}
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
          />
        </FormField>

        <label>Limit: </label>
        <input
          type="number"
          min={1}
          max={50}
          onChange={(e) => setLimit(e.target.value)}
          value={limit}
        />
        <input type="submit" value="Search" />
      </Form>
    </div>
  );
};
export default SearchBar;
