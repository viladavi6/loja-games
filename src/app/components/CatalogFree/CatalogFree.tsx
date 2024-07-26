import { Container } from 'react-bootstrap';
import styles from '../../style/Catalog.module.css';
import Link from 'next/link';
import Search from '../Search/Search';

const freeGames = [
    { title: "Genshin Impact", img: "/img/games/genshinimpact.jpg", link: "/genshinimpact" },
    { title: "Rocket League", img: "/img/games/rocketleague.jpg", link: "/rocketleague" },
    { title: "Valorant", img: "/img/games/valorant.jpg", link: "/valorant" },
    { title: "League of Legends", img: "/img/games/leagueoflegends.jpg", link: "/leagueoflegends" },
    { title: "Fortnite", img: "/img/games/fortnite.jpg", link: "/fortnite" },
    { title: "Fall Guys", img: "/img/games/fallguys.jpg", link: "/fallguys" },
    { title: "Honkai Impact", img: "/img/games/honkaiimpact.jpg", link: "/honkaiimpact" },
    { title: "Destiny 2", img: "/img/games/destiny2.jpg", link: "/destiny2" },
    { title: "PUBG", img: "/img/games/pubg.jpg", link: "/pubg" },
    { title: "Lego Fortnite", img: "/img/games/legofortnite.jpg", link: "/legofortnite" },
    { title: "The Sims 4", img: "/img/games/thesims4.jpg", link: "/thesims4" },
    { title: "Multiversus", img: "/img/games/multiversus.jpg", link: "/multiversus" }
];

const Free = () => {
    return (
        <>
            < Search />
            <div className={styles.catalogTitle}>
                <h1>Catálogo de Jogos Gratuitos</h1>
            </div>
            <div className={styles.catalogContainer}>
                <Container>
                    <div className={styles.catalogGrid}>
                        {freeGames.map((game, index) => (
                            <Link key={index} href={game.link}>
                                <div className={styles.card}>
                                    <img src={game.img} alt={game.title} className={styles.cardImage} />
                                    <p className={styles.cardTitle}>{game.title}</p>
                                    <p className={styles.cardPrice}>Grátis</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Free;
