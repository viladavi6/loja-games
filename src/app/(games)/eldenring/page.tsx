"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/eldenring/1.jpg");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/T6EcJ6Sv5Ns");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Elden Ring</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Elden Ring Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Elden Ring" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/eldenring/${index}.jpg`}
                                alt={`Elden Ring Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/eldenring/${index}.jpg`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/T6EcJ6Sv5Ns/0.jpg"
                            alt="Elden Ring Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Elden Ring" é um jogo de ação e RPG desenvolvido pela FromSoftware e publicado pela Bandai Namco Entertainment. Ambientado em um mundo aberto vasto e interconectado, o jogo oferece uma experiência épica de combate e exploração. Os jogadores assumem o papel de um personagem conhecido como o "Tarnished", que busca restaurar o Elden Ring e se tornar o Elden Lord. Com uma narrativa profunda, um mundo rico e desafiador e uma jogabilidade envolvente, "Elden Ring" é um marco no gênero dos jogos de ação e RPG.</p>
                </section>

                <div className={styles.buttonsSection}>
                    <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                    <Button className={styles.buyButton}>COMPRAR</Button>
                    <Button className={styles.cartButton}>ADICIONAR AO CARRINHO</Button>
                </div>
            </main>
        </div>
        </>
    );
};

export default Page;
