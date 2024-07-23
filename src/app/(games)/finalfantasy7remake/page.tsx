"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/finalfantasy7remake/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/ERgrFVhL-n4");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search />
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Final Fantasy VII Remake</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Final Fantasy VII Remake Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Final Fantasy VII Remake" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/finalfantasy7remake/${index}.png`}
                                alt={`Final Fantasy VII Remake Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/finalfantasy7remake/${index}.png`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/ERgrFVhL-n4/0.jpg"
                            alt="Final Fantasy VII Remake Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Final Fantasy VII Remake" é um remake do clássico jogo de RPG desenvolvido pela Square Enix. Reimaginando o icônico título de 1997, o jogo apresenta gráficos atualizados, uma nova mecânica de combate e uma narrativa expandida que mergulha ainda mais no mundo de Midgar. Os jogadores reviverão a jornada de Cloud Strife e seus aliados enquanto enfrentam a corporação Shinra e buscam salvar o planeta. Com uma história emocionante e visuais deslumbrantes, "Final Fantasy VII Remake" oferece uma experiência imersiva para novos e antigos fãs da série.</p>
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
