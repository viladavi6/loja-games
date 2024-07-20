import styles from '../../style/Search.module.css';
import Link from 'next/link';

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
                    <Link href='/jogosgratuitos' className={styles.gratuitos}>Jogos Gratuitos</Link>
                </div>
            </div>
        </>
    );
}
