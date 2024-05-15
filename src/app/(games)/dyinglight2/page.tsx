"use client"
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/dyinglight2/1.jpg");
    const [description, setDescription] = useState("Descrição do jogo Dying Light 2");

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://youtu.be/2MD4gTitmzw?si=IwgR13vCHztXQKJv");
    };

    const isYoutubeVideo = (url) => {
        return url.includes("youtube");
    };

    return (
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Dying Light 2</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Dying Light 2 Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Dying Light 2" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/dyinglight2/${index}.jpg`}
                                alt={`Dying Light 2 Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/dyinglight2/${index}.jpg`)}
                            />
                        ))}
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Dying Light 2" é um jogo de ação e sobrevivência em mundo aberto desenvolvido pela Techland. Situado em um mundo pós-apocalíptico devastado por uma infecção zumbi, você joga como Aiden Caldwell, um sobrevivente com habilidades de parkour excepcionais. O jogo combina combate visceral com movimentação fluida, permitindo que você explore uma cidade vasta e dinâmica. Suas decisões impactam a história e o mundo ao seu redor, criando uma experiência única para cada jogador. Com gráficos impressionantes, um ciclo dia-noite que altera a jogabilidade e um foco em escolhas e consequências, "Dying Light 2" oferece uma aventura intensa e envolvente para os fãs de ação e horror.</p>
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
