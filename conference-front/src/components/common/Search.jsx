import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function Search({ handleSearch }) {
  const [search, setSearch] = useState("");

  const [criteria, setCriteria] = useState("title")

  function handleChange(event) {
    setSearch(event.target.value);
    handleSearch(criteria, event.target.value);
  }

  function changeCriteria(event) {
    setCriteria(event.target.value);
  }
  return (
    <div>
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Search"
        />
      </InputGroup>

      <InputGroup className="flex gap-2 justify-center">
        <Form.Check
          checked={criteria === "title"}
          onChange={changeCriteria}
          value="title"
          name="search"
          type="radio"
        />
        <span>Title</span>
        <Form.Check
        checked={criteria === "city"}
          onChange={changeCriteria}
          value="city"
          name="search"
          type="radio"
        />
        <span>Location</span>
        <Form.Check
        checked={criteria === "ministry"}
          onChange={changeCriteria}
          value="ministry"
          name="search"
          type="radio"
        />
        <span>Ministry</span>
        <Form.Check
        checked={criteria === "state_department"}
          onChange={changeCriteria}
          value="state_department"
          name="search"
          type="radio"
        />
        <span>State Department</span>
      </InputGroup>
    </div>
  );
}

export default Search;
