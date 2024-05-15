"use client"
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/battlefront/1.jpg");
    const [description, setDescription] = useState("Descrição do jogo Star Wars - Battlefront");

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/watch?v=V2xp-qtUlsQ");
    };

    const isYoutubeVideo = (url) => {
        return url.includes("youtube");
    };

    return (
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Star Wars - Battlefront</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Rocket League Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="battlefront" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/battlefront/${index}.jpg`}
                                alt={`God of War Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/battlefront/${index}.jpg`)}
                            />
                        ))}
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Star Wars Battlefront" é um jogo de tiro em primeira e terceira pessoa desenvolvido pela DICE e publicado pela Electronic Arts. Situado no icônico universo de Star Wars, o jogo permite aos jogadores participar de batalhas épicas em planetas clássicos da série, como Hoth, Endor e Tatooine. Com gráficos impressionantes, sons autênticos e modos de jogo variados, incluindo multiplayer online e missões solo, "Star Wars Battlefront" oferece uma experiência imersiva para fãs de todas as idades. Junte-se aos Rebeldes ou ao Império e viva a emoção das batalhas galácticas de Star Wars.</p>
                </section>

                <div className={styles.buttonsSection}>
                    <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                    <Button className={styles.buyButton}>COMPRAR</Button>
                    <Button className={styles.cartButton}>ADICIONAR AO CARRINHO</Button>
                </div>
            </main>
        </div>
    );
};

export default Page;
