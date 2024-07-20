"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/sekiro/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/rUNVgAwqjQs");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Sekiro: Shadows Die Twice</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Sekiro: Shadows Die Twice Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Sekiro: Shadows Die Twice" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/sekiro/${index}.png`}
                                alt={`Sekiro: Shadows Die Twice Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/sekiro/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/rUNVgAwqjQs/0.jpg"
                            alt="Sekiro: Shadows Die Twice Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Sekiro: Shadows Die Twice" é um jogo de ação e aventura desenvolvido pela FromSoftware. Situado em uma versão fictícia do Japão no final dos anos 1500, os jogadores assumem o papel de um guerreiro chamado Wolf, que embarca em uma missão para resgatar seu mestre e se vingar de seus inimigos. Com uma jogabilidade desafiadora, combate intenso e uma narrativa envolvente, "Sekiro: Shadows Die Twice" oferece uma experiência única e emocionante para os fãs do gênero.</p>
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
