"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/gtav/1.png");

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/dnSTk7wCtAM");
    };

    const isYoutubeVideo = (url) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Grand Theft Auto V</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Grand Theft Auto V Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Grand Theft Auto V" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/gtav/${index}.png`}
                                alt={`Grand Theft Auto V Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/gtav/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/dnSTk7wCtAM/0.jpg"
                            alt="Grand Theft Auto V Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Grand Theft Auto V" é um jogo de ação e aventura desenvolvido pela Rockstar North. Situado no estado ficcional de San Andreas, inspirado na Califórnia, o jogo segue a história de três criminosos e seus esforços para cometer assaltos enquanto são pressionados por uma agência governamental. Com um mundo aberto vasto e detalhado, "GTA V" oferece aos jogadores a liberdade para explorar e participar de diversas atividades, proporcionando uma experiência de jogo imersiva e diversificada.</p>
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
