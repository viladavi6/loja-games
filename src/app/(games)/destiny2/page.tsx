"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const Destiny2Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/destiny2/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/RfUoz1_i5_E");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Destiny 2</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Destiny 2 Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Destiny 2" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/destiny2/${index}.png`}
                                    alt={`Destiny 2 Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/destiny2/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/RfUoz1_i5_E/0.jpg"
                                alt="Destiny 2 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Destiny 2" é um jogo de tiro em primeira pessoa desenvolvido pela Bungie. Lançado em 2017, o jogo combina elementos de tiro, RPG e MMO em um universo futurista repleto de ação e aventuras. Os jogadores assumem o papel de Guardiões, lutando contra forças invasoras enquanto exploram planetas e completam missões cooperativas e competitivas. Com uma narrativa envolvente e uma jogabilidade rica, "Destiny 2" oferece uma experiência imersiva para os fãs do gênero.</p>
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

export default Destiny2Page;
