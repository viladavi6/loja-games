"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/dmc5/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/KMSGj9Y2T9Q");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Devil May Cry 5</h1>
            </header>
            <main>
                <section className={styles.mainBox}>
                    {isYoutubeVideo(selectedImage) ? (
                        <iframe
                            width="60%"
                            height="400"
                            src={selectedImage}
                            title="Devil May Cry 5 Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img src={selectedImage} alt="Devil May Cry 5" className={styles.mainImage} />
                    )}
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/dmc5/${index}.png`}
                                alt={`Devil May Cry 5 Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/dmc5/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/KMSGj9Y2T9Q/0.jpg"
                            alt="Devil May Cry 5 Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Devil May Cry 5" é um jogo de ação desenvolvido pela Capcom, continuando a renomada série de hack-and-slash. O jogo segue a história de Dante, Nero e V, três caçadores de demônios, enquanto eles enfrentam uma invasão demoníaca em Red Grave City. Com um combate estilizado e uma narrativa envolvente, "Devil May Cry 5" oferece uma experiência intensa e visualmente impressionante para os fãs de ação.</p>
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
