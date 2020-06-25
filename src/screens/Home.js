import React from "react";
import Nav from "../components/global/Nav";
import Search from "../components/home/Search";

export default function Home() {
  return (
    <div>
      <Nav />
      <h1>Musicall</h1>
      <p>
        Use the search bar below to find for your favourite music or discover
        something new!
      </p>
      {/* Search component */}
      <Search />
    </div>
  );
}
