"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const ValorantPage = () => {
    const [selectedImage, setSelectedImage] = useState("/img/valorant/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/lWr6dhTcu-E");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Valorant</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Valorant Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Valorant" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/valorant/${index}.png`}
                                    alt={`Valorant Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/valorant/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/lWr6dhTcu-E/0.jpg"
                                alt="Valorant Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Valorant" é um jogo de tiro em primeira pessoa tático desenvolvido e publicado pela Riot Games. Lançado em 2020, o jogo apresenta partidas 5 contra 5 onde jogadores assumem o papel de agentes com habilidades únicas. "Valorant" combina elementos de jogos de tiro táticos com habilidades de personagens para oferecer uma experiência competitiva intensa e estratégica.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>Grátis</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button className={styles.cartButton}>ADICIONAR AO CARRINHO</Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ValorantPage;
