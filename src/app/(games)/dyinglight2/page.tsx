"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '../../components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/dyinglight2/1.jpg");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/2MD4gTitmzw");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    const handleAddToWishlist = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Dying Light 2",
                    img: '/img/games/dyinglight2.jpg',
                    link: '/dyinglight2',
                }),
            });

            if (response.ok) {
                alert('Adicionado à lista de desejos');
            } else {
                const errorText = await response.text();
                console.error('Failed to add to wishlist:', errorText);
                alert('Não foi possível adicionar à lista de desejos');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert('Erro ao adicionar à lista de desejos');
        }
    };

    return (
        <>
            <Search />
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
                            <img
                                src="https://img.youtube.com/vi/2MD4gTitmzw/0.jpg"
                                alt="Dying Light 2 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
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
                        <Button className={styles.cartButton} onClick={handleAddToWishlist}>
                            ADICIONAR À LISTA DE DESEJOS
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Page;
