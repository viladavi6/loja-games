"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/hades/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/91t0ha9x0AE");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Hades</h1>
            </header>
            <main>
                <section className={styles.mainBox}>
                    {isYoutubeVideo(selectedImage) ? (
                        <iframe
                            width="60%"
                            height="400"
                            src={selectedImage}
                            title="Hades Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img src={selectedImage} alt="Hades" className={styles.mainImage} />
                    )}
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/hades/${index}.png`}
                                alt={`Hades Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/hades/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/91t0ha9x0AE/0.jpg"
                            alt="Hades Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Hades" é um jogo de ação e roguelike desenvolvido pela Supergiant Games. Ambientado no submundo da mitologia grega, o jogo segue a história de Zagreus, o filho de Hades, enquanto ele tenta escapar do reino dos mortos. Com uma jogabilidade dinâmica e narrativa envolvente, "Hades" oferece uma experiência de combate fluida e desafios emocionantes. O jogo é conhecido por sua arte estilizada, trilha sonora cativante e história rica, que se desenrola a cada tentativa de escapar.</p>
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
