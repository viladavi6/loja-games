"use client"
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/evildead/1.jpg");

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/LiZqKiamYSs");
    };

    const isYoutubeVideo = (url) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Evil Dead</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Evil Dead Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Evil Dead" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/evildead/${index}.jpg`}
                                alt={`Evil Dead Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/evildead/${index}.jpg`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/LiZqKiamYSs/0.jpg"
                            alt="Evil Dead Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Evil Dead: The Game" é um jogo de ação e terror multiplayer desenvolvido pela Saber Interactive. Baseado na icônica franquia de filmes de terror "Evil Dead", o jogo permite que os jogadores assumam o papel de personagens clássicos como Ash Williams e seus amigos, ou do vilão Kandarian Demon. Em partidas cooperativas e competitivas, os jogadores enfrentam hordas de Deadites em locais emblemáticos da série. Com gráficos detalhados, uma atmosfera aterrorizante e uma jogabilidade intensa, "Evil Dead: The Game" oferece uma experiência emocionante para os fãs de terror e da série Evil Dead.</p>
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
