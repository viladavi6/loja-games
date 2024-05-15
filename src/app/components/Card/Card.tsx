"use client"
import { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import styles from "../../style/Card.module.css";

const gamesData = [
    { id: 1, name: 'Rocket League', imageUrl: '/img/games/rocketleague.jpg', description: 'Futebol com carros? É aqui!' },
    { id: 2, name: 'God of War', imageUrl: '/img/games/godofwar.jpg', description: 'Kratos está de volta com o seu filho em um novo universo.' },
    { id: 3, name: 'Star Wars - Battlefront', imageUrl: '/img/games/battlefront.jpg', description: 'Mais um grande jogo da série amada por muitos.' },
    { id: 4, name: 'Dying Light 2', imageUrl: '/img/games/dyinglight2.jpg', description: 'Como o nome sugere, continue humano.' },
    { id: 5, name: 'Sifu', imageUrl: '/img/games/sifu.jpg', description: 'Vingue seu mestre.' },
    { id: 6, name: 'Evil Dead', imageUrl: '/img/games/evildead.jpg', description: 'Lute contra o mal em uma cabana abandonada.' },
];

const GameCarousel = () => {
    const [currentGameIndex, setCurrentGameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGameIndex((prevIndex) => (prevIndex + 1) % gamesData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.carouselcontainer}>
            <div className={styles.carousellarge}>
                <Image src={gamesData[currentGameIndex].imageUrl} fluid />
                <div className={styles['carousel-caption']}>
                    <h3 className={styles['carousel-title']}>{gamesData[currentGameIndex].name}</h3>
                    <p className={styles['carousel-description']}>{gamesData[currentGameIndex].description}</p>
                </div>
            </div>
            <div className={styles.carouselsmall}>
                {gamesData.map((game) => (
                    <div key={game.id} className={styles.carouselitem}>
                        <Image src={game.imageUrl} fluid />
                        <div className={styles['carousel-caption']}>
                            <h3 className={styles['carousel-title']}>{game.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameCarousel;
