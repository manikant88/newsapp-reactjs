import React from "react";
import "../App.css";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="searchbar">
      <span>Search News</span>
      <input
        type="text"
        placeholder="Search News"
        label="Search News"
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;