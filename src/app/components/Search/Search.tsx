import styles from '../../style/Search.module.css'

export default function Search() {
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
      </>
    );
}
   