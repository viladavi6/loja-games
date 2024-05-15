// pages/index.tsx
import React from "react";
import Card from "./components/Card/Card";
import styles from "./style/Search.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Pesquisar..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <img src="/img/search.png" alt="Search" className={styles.searchIcon} />
          </button>
        </div>
      </div>
      <main>
        <Card />
      </main>
    </>
  );
};

export default Home;
