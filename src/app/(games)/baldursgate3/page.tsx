"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/baldursgate3/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/OcP0WdH7rTs");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Baldur's Gate 3</h1>
            </header>
            <main>
                <section className={styles.mainBox}>
                    {isYoutubeVideo(selectedImage) ? (
                        <iframe
                            width="60%"
                            height="400"
                            src={selectedImage}
                            title="Baldur's Gate 3 Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img src={selectedImage} alt="Baldur's Gate 3" className={styles.mainImage} />
                    )}
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/baldursgate3/${index}.png`}
                                alt={`Baldur's Gate 3 Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/baldursgate3/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/OcP0WdH7rTs/0.jpg"
                            alt="Baldur's Gate 3 Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Baldur's Gate 3" é um RPG de fantasia desenvolvido pela Larian Studios, que dá continuidade à lendária série de jogos Baldur's Gate. Ambientado no universo de Dungeons & Dragons, o jogo oferece uma rica narrativa com escolhas impactantes, um mundo aberto expansivo e um combate tático baseado em turnos. Explore um vasto mundo repleto de perigos, alianças e mistérios enquanto você forma uma equipe de heróis e enfrenta uma ameaça sobrenatural.</p>
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
