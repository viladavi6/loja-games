"use client";
import { useState, useEffect, ChangeEvent } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../style/Search.module.css';

export default function Search() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGames, setFilteredGames] = useState<any[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            if (searchTerm.length > 0) {
                const response = await fetch(`/api/search?searchTerm=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                setFilteredGames(data);
            } else {
                setFilteredGames([]);
            }
        };

        fetchGames();
    }, [searchTerm]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {pathname !== '/free' && (
                    <Link href="/free" className={styles.gratuitos}>
                        Jogos Gratuitos
                    </Link>
                )}
                <Link href="/wishlist" className={styles.wishlist}>
                    Lista de Desejos
                </Link>
                <Link href="/cart" className={styles.cart}>
                    Carrinho
                </Link>
            </div>
            {searchTerm.length > 0 && (
                <div className={styles.searchResults}>
                    {filteredGames.length > 0 ? (
                        <ul>
                            {filteredGames.map((game) => (
                                <li key={game.title}>
                                    <Link href={game.link}>
                                        <img src={game.img} alt={game.title} />
                                        <span>{game.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum jogo encontrado.</p>
                    )}
                </div>
            )}
        </div>
    );
}
