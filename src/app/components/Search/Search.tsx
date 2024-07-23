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
                    <Link href='/free' className={styles.gratuitos}>Jogos Gratuitos</Link>
                    <Link href="/Wishlist" className={styles.wishlist}>Lista de Desejos</Link>
                    <Link href='/cart' className={styles.cart}>Carrinho</Link>
                </div>
            </div>
        </>
    );
}
