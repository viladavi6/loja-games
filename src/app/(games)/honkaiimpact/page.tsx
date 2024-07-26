"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const HonkaiImpactPage = () => {
    const [selectedImage, setSelectedImage] = useState("/img/honkaiimpact/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/3xm1kqqN3GQ");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Honkai Impact</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Honkai Impact Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Honkai Impact" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/honkaiimpact/${index}.png`}
                                    alt={`Honkai Impact Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/honkaiimpact/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/3xm1kqqN3GQ/0.jpg"
                                alt="Honkai Impact Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Honkai Impact 3rd" é um jogo de ação e RPG desenvolvido pela miHoYo. Lançado em 2016, o jogo se passa em um mundo devastado por uma força conhecida como Honkai, e os jogadores assumem o papel de Valkyries lutando para proteger a humanidade. Com uma mistura de combate dinâmico, narrativa envolvente e visuais impressionantes, "Honkai Impact 3rd" oferece uma experiência imersiva e épica.</p>
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

export default HonkaiImpactPage;