"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const GenshinImpactPage = () => {
    const [selectedImage, setSelectedImage] = useState("/img/genshinimpact/1.png");

    const handleImageClick = (image : string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/HLUY1nICQRY");
    };

    const isYoutubeVideo = (url : string) => {
        return url.includes("youtube");
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Genshin Impact</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Genshin Impact Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Genshin Impact" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/genshinimpact/${index}.png`}
                                    alt={`Genshin Impact Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/genshinimpact/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/HLUY1nICQRY/0.jpg"
                                alt="Genshin Impact Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Genshin Impact" é um jogo de ação e RPG desenvolvido pela miHoYo. Neste título, você explora o mundo aberto de Teyvat, interage com diversos personagens, enfrenta inimigos poderosos e desvenda mistérios mágicos. Com gráficos deslumbrantes e uma jogabilidade envolvente, "Genshin Impact" oferece uma experiência rica e imersiva para todos os jogadores.</p>
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

export default GenshinImpactPage;
