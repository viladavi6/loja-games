"use client"
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/battlefront/1.jpg");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/V2xp-qtUlsQ?autoplay=1&mute=1");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
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
                                title="Star Wars - Battlefront Trailer"
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
                                alt={`Star Wars Battlefront Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/battlefront/${index}.jpg`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/V2xp-qtUlsQ/0.jpg"
                            alt="Star Wars Battlefront Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
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
                    <Button className={styles.cartButton}>ADICIONAR A LISTA DE DESEJOS</Button>
                </div>
            </main>
        </div>
        </>
    );
};

export default Page;
