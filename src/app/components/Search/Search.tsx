"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../style/Search.module.css';

export default function Search() {
    const pathname = usePathname();

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className={styles.searchInput}
                />
                {pathname !== '/free' && (
                    <Link href="/free" className={styles.gratuitos}>
                        Jogos Gratuitos
                    </Link>
                )}
                <Link href="/Wishlist" className={styles.wishlist}>
                    Lista de Desejos
                </Link>
                <Link href="/cart" className={styles.cart}>
                    Carrinho
                </Link>
            </div>
        </div>
    );
}
