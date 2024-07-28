"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const TheSims4Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/thesims4/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/DL2hlOIf-PM");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>The Sims 4</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="The Sims 4 Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="The Sims 4" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/thesims4/${index}.png`}
                                    alt={`The Sims 4 Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/thesims4/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/DL2hlOIf-PM/0.jpg"
                                alt="The Sims 4 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"The Sims 4" é um jogo de simulação de vida desenvolvido pela Maxis e publicado pela Electronic Arts. Neste título, os jogadores podem criar e controlar pessoas em um mundo virtual, moldando suas vidas e personalidades, construindo suas casas e explorando novas experiências. Com inúmeras expansões e pacotes de conteúdo, "The Sims 4" oferece uma experiência profunda e diversificada, permitindo que os jogadores expressem sua criatividade e simulem a vida de formas infinitas.</p>
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

export default TheSims4Page;
