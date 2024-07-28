"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/alanwake2/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/fCyY487J3aQ");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Alan Wake 2</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Alan Wake 2 Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Alan Wake 2" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/alanwake2/${index}.png`}
                                alt={`Alan Wake 2 Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/alanwake2/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/fCyY487J3aQ/0.jpg"
                            alt="Alan Wake 2 Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Alan Wake 2" é um jogo de ação e terror psicológico desenvolvido pela Remedy Entertainment. Continuando a história do aclamado "Alan Wake", o jogo mergulha os jogadores em uma narrativa complexa e atmosférica que combina suspense e mistério. Os jogadores assumem o papel de Alan Wake, um escritor que enfrenta horrores sobrenaturais e tenta desvendar os mistérios que cercam sua própria história. Com uma jogabilidade envolvente e uma história profunda, "Alan Wake 2" oferece uma experiência única para os fãs do gênero de terror psicológico.</p>
                </section>

                <div className={styles.buttonsSection}>
                    <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                    <Button className={styles.buyButton}>COMPRAR</Button>
                    <Button className={styles.cartButton}>ADICIONAR AO CARRINHO</Button>
                    <Button className={styles.cartButton}>ADICIONAR A LISTA DE DESEJOS</Button>
                </div>
            </main>
        </div>
        </>
    );
};

export default Page;
