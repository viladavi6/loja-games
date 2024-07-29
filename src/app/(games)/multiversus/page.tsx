"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const MultiVersusPage = () => {
    const [selectedImage, setSelectedImage] = useState("/img/multiversus/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/zCNAbJ8vOME");
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
                    title: "MultiVersus",
                    img: '/img/games/multiversus.jpg',
                    link: '/multiversus',
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

    const handleAddToCart = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "MultiVersus",
                    img: '/img/games/multiversus.jpg',
                    link: '/multiversus',
                    price: 0, // Preço fixo como "Grátis"
                }),
            });

            if (response.ok) {
                alert('Adicionado ao carrinho');
            } else {
                const errorText = await response.text();
                console.error('Failed to add to cart:', errorText);
                alert('Não foi possível adicionar ao carrinho');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Erro ao adicionar ao carrinho');
        }
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>MultiVersus</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="MultiVersus Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="MultiVersus" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/multiversus/${index}.png`}
                                    alt={`MultiVersus Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/multiversus/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/zCNAbJ8vOME/0.jpg"
                                alt="MultiVersus Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"MultiVersus" é um jogo de luta crossover desenvolvido pela Player First Games e publicado pela Warner Bros. Interactive Entertainment. O jogo apresenta personagens de diversas franquias populares da Warner Bros., incluindo o Universo DC, Looney Tunes, Scooby-Doo e muitos outros. Os jogadores podem se enfrentar em batalhas emocionantes, combinando habilidades únicas e estratégias para vencer. Com gráficos vibrantes e uma jogabilidade competitiva, "MultiVersus" oferece uma experiência de luta divertida e envolvente para todos os fãs de crossovers.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>Grátis</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button className={styles.cartButton} onClick={handleAddToCart}>
                            ADICIONAR AO CARRINHO
                        </Button>
                        <Button className={styles.cartButton} onClick={handleAddToWishlist}>
                            ADICIONAR À LISTA DE DESEJOS
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default MultiVersusPage;
