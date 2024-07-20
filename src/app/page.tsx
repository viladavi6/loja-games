import React from "react";
import Card from "./components/Card/Card";
import Catalog from "./components/Catalog/Catalog";
import Search from './components/Search/Search';

const Home = () => {
  return (
    <>
      <Search />
      <main>
        <Card />
      </main>
      <main>
        <Catalog />
      </main>
    </>
  );
};

export default Home;
