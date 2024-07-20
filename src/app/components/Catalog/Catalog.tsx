import { Container } from 'react-bootstrap';
import styles from '../../style/Catalog.module.css';
import Link from 'next/link';

const games = [
    { title: "Elden Ring", img: "/img/games/eldenring.jpg", link: "/eldenring" },
    { title: "Sekiro", img: "/img/games/sekiro.jpeg", link: "/sekiro" },
    { title: "GTA V", img: "/img/games/gtav.jpg", link: "/gtav" },
    { title: "Spiderman Remastered", img: "/img/games/spiderman.jpeg", link: "/spiderman" },
    { title: "Farcry 6", img: "/img/games/farcry6.jpeg", link: "/farcry6" },
    { title: "Alan Wake 2", img: "/img/games/alanwake2.jpg", link: "/alanwake2" }
];

const Catalog = () => {
    return (
        <>
            <div className={styles.catalogTitle}>
                <h1>Catálogo de Jogos</h1>
            </div>
            <div className={styles.catalogContainer}>
                <Container>
                    <div className={styles.catalogGrid}>
                        {games.map((game, index) => (
                            <Link key={index} href={game.link}>
                                <div className={styles.card}>
                                    <img src={game.img} alt={game.title} className={styles.cardImage} />
                                    <p className={styles.cardTitle}>{game.title}</p>
                                    <p className={styles.cardPrice}>R$250</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Catalog;
