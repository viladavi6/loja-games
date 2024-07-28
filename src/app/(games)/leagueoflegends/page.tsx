"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const LeagueOfLegendsPage = () => {
    const [selectedImage, setSelectedImage] = useState("/img/leagueoflegends/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/BEbPi89HZ0I");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>League of Legends</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="League of Legends Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="League of Legends" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/leagueoflegends/${index}.png`}
                                    alt={`League of Legends Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/leagueoflegends/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/BEbPi89HZ0I/0.jpg"
                                alt="League of Legends Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"League of Legends" é um jogo multiplayer online de batalha em campo (MOBA) desenvolvido e publicado pela Riot Games. Lançado em 2009, o jogo é conhecido por suas intensas partidas 5 contra 5 onde jogadores escolhem campeões com habilidades únicas e competem em batalhas estratégicas. "League of Legends" é um dos jogos mais populares e influentes no gênero MOBA, oferecendo uma rica experiência competitiva e um universo expansivo.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>Grátis</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button className={styles.cartButton}>ADICIONAR AO CARRINHO</Button>
                        <Button className={styles.cartButton}>ADICIONAR A LISTA DE DESEJOS</Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default LeagueOfLegendsPage;
