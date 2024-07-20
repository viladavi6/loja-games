"use client"
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/godofwar/1.jpg");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/FyIwEFXOcaE");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>God of War</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="God of War Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="God of War" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/godofwar/${index}.jpg`}
                                alt={`God of War Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/godofwar/${index}.jpg`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/FyIwEFXOcaE/0.jpg"
                            alt="God of War Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"God of War" (2018) é um jogo de ação-aventura desenvolvido pela Santa Monica Studio. Ambientado na mitologia nórdica, o jogo segue Kratos e seu filho Atreus em uma jornada épica para espalhar as cinzas da esposa de Kratos no pico mais alto dos nove reinos. Com uma nova perspectiva de câmera, combates intensos usando o Leviathan Axe e gráficos impressionantes, "God of War" oferece uma experiência envolvente e emocional que foi amplamente aclamada pela crítica e vencedora de vários prêmios, incluindo Jogo do Ano.</p>
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
