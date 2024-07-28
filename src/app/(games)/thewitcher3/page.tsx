"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/thewitcher3/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/c0i88t0Kacs");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>The Witcher 3</h1>
            </header>
            <main>
                <section className={styles.mainBox}>
                    {isYoutubeVideo(selectedImage) ? (
                        <iframe
                            width="60%"
                            height="400"
                            src={selectedImage}
                            title="The Witcher 3 Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img src={selectedImage} alt="The Witcher 3" className={styles.mainImage} />
                    )}
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/thewitcher3/${index}.png`}
                                alt={`The Witcher 3 Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/thewitcher3/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/c0i88t0Kacs/0.jpg"
                            alt="The Witcher 3 Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"The Witcher 3: Wild Hunt" é um RPG de ação desenvolvido pela CD Projekt Red. Acompanhe Geralt de Rivia, um caçador de monstros conhecido como "Witcher", em uma jornada épica através de um vasto mundo aberto. O jogo oferece uma narrativa envolvente com escolhas impactantes, combate dinâmico e um mundo rico em detalhes. Explore reinos fantásticos, enfrente criaturas perigosas e descubra segredos enquanto busca por sua filha adotiva e se confronta com a ameaça da Wild Hunt.</p>
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
