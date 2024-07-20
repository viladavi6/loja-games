"use client"
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/sifu/1.jpg");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/Kx3R2CNhLWA?autoplay=1&mute=1");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    return (
        <>
        <Search/>
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Sifu</h1>
            </header>
            <main>
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Sifu Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Sifu" className={styles.mainImage} />
                        )}
                    </div>
                </section>
                <section className={styles.imageSelector}>
                    <div className={styles.thumbnailContainer}>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`/img/sifu/${index}.jpg`}
                                alt={`Sifu Screenshot ${index}`}
                                className={styles.thumbnail}
                                onClick={() => handleImageClick(`/img/sifu/${index}.jpg`)}
                            />
                        ))}
                        <img
                            src="https://img.youtube.com/vi/Kx3R2CNhLWA/0.jpg"
                            alt="Sifu Trailer Thumbnail"
                            className={styles.thumbnail}
                            onClick={handleTrailerClick}
                        />
                    </div>
                </section>
                <section className={styles.desc}>
                    <h2 className={styles.desctitle}>Descrição</h2>
                    <p>"Sifu" é um jogo de ação e luta desenvolvido pela Sloclap. Nele, você assume o papel de um jovem estudante de kung fu em busca de vingança contra aqueles que mataram sua família. Com um sistema de combate dinâmico e desafiador, "Sifu" destaca-se pelo uso inovador de um amuleto mágico que envelhece o protagonista cada vez que ele é derrotado, afetando suas habilidades e aparência. Com gráficos estilizados e uma jogabilidade intensa, "Sifu" oferece uma experiência única e imersiva para os amantes de artes marciais e jogos de ação.</p>
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
