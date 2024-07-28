"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/farcry6/1.jpg");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/yzCZyJSGub4");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Far Cry 6</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Far Cry 6 Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Far Cry 6" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/farcry6/${index}.jpg`}
                                alt={`Far Cry 6 Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/farcry6/${index}.jpg`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/yzCZyJSGub4/0.jpg"
                            alt="Far Cry 6 Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Far Cry 6" é um jogo de ação e aventura desenvolvido pela Ubisoft. Situado na ilha fictícia de Yara, inspirada em Cuba, o jogo segue a história de Dani Rojas, um guerrilheiro que luta contra o regime opressor do ditador Antón Castillo. Com um mundo aberto vasto e detalhado, "Far Cry 6" oferece aos jogadores a liberdade para explorar e participar de diversas atividades, proporcionando uma experiência de jogo imersiva e diversificada.</p>
                </section>

                <div className={styles.buttonsSection}>
                    <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$220</Button>
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
