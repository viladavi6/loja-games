import { Container } from 'react-bootstrap';
import styles from '../../style/Catalog.module.css';
import Link from 'next/link';

const games = [
    { title: "Control", img: "/img/games/control.jpg", link: "/control" },
    { title: "Baldur's Gate 3", img: "/img/games/baldursgate3.jpg", link: "/baldursgate3" },
    { title: "Elden Ring - Shadow of the Erdtree", img: "/img/games/shadow.jpg", link: "/shadowoftheerdtree" },
    { title: "Dark Souls 3", img: "/img/games/darksouls3.jpg", link: "/darksouls3" },
    { title: "The Witcher 3", img: "/img/games/thewitcher3.jpg", link: "/thewitcher3" },
    { title: "Devil May Cry 5", img: "/img/games/dmc5.jpg", link: "/devilmaycry5" },
    { title: "Elden Ring", img: "/img/games/eldenring.jpg", link: "/eldenring" },
    { title: "Sekiro", img: "/img/games/sekiro.jpeg", link: "/sekiro" },
    { title: "GTA V", img: "/img/games/gtav.jpg", link: "/gtav" },
    { title: "Spiderman Remastered", img: "/img/games/spiderman.jpeg", link: "/spiderman" },
    { title: "Farcry 6", img: "/img/games/farcry6.jpeg", link: "/farcry6" },
    { title: "Alan Wake 2", img: "/img/games/alanwake2.jpg", link: "/alanwake2" },
    { title: "Dark Souls Remastered", img: "/img/games/darksouls.jpg", link: "/darksoulsremastered" },
    { title: "Alan Wake", img: "/img/games/alanwake.jpg", link: "/alanwake" },
    { title: "Crash N Trilogy", img: "/img/games/crash.jpg", link: "/crashntrilogy" },
    { title: "Final Fantasy 7 Remake", img: "/img/games/ff7.jpg", link: "/finalfantasy7remake" },
    { title: "Hades", img: "/img/games/hades.jpg", link: "/hades" },
    { title: "It Takes Two", img: "/img/games/ittakestwo.jpg", link: "/ittakestwo" },
    { title: "Resident Evil 4 Remake", img: "/img/games/residentevil4remake.jpg", link: "/residentevil4remake" },
    { title: "Metal Gear Revengeance", img: "/img/games/metalgearrevengeance.jpg", link: "/metalgear" },
    { title: "The Last of Us Remake", img: "/img/games/thelastofus.jpg", link: "/thelastofusremake" },
    { title: "The Evil Within 2", img: "/img/games/theevilwithin2.jpg", link: "/theevilwithin2" },
    { title: "Cuphead", img: "/img/games/cuphead.jpg", link: "/cuphead" },
    { title: "A Way Out", img: "/img/games/awayout.jpg", link: "/awayout" },
    { title: "Hogwarts Legacy", img: "/img/games/hogwartslegacy.jpg", link: "/hogwartslegacy" },
    { title: "Stardew Valley", img: "/img/games/stardewvalley.jpg", link: "/stardewvalley" },
    { title: "Shovel Knight", img: "/img/games/shovelknight.jpg", link: "/shovelknight" },
    { title: "Diablo IV", img: "/img/games/diabloiv.jpg", link: "/diabloiv" },
    { title: "Limbo", img: "/img/games/limbo.jpg", link: "/limbo" },
    { title: "Resident Evil 2 Remake", img: "/img/games/residentevil2remake.jpg", link: "/residentevil2remake" }
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
