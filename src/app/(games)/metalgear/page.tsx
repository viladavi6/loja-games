"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/metalgearrising/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/EMCkbDnaTDM");
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
                    title: "Metal Gear Rising",
                    img: '/img/games/metalgearrevengeance.jpg',
                    link: '/metalgearrising',
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
                    title: "Metal Gear Rising",
                    img: '/img/games/metalgearrevengeance.jpg',
                    link: '/metalgearrising',
                    price: 250, // Preço fixo
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
                    <h1>Metal Gear Rising</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Metal Gear Rising Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Metal Gear Rising" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/metalgearrising/${index}.png`}
                                    alt={`Metal Gear Rising Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/metalgearrising/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/EMCkbDnaTDM/0.jpg"
                                alt="Metal Gear Rising Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Metal Gear Rising: Revengeance" é um jogo de ação desenvolvido pela PlatinumGames e publicado pela Konami. O jogo foca em Raiden, um ciborgue ninja, que combate inimigos com sua katana em batalhas frenéticas e repletas de ação. A história se passa após os eventos de "Metal Gear Solid 4: Guns of the Patriots" e explora temas de vingança e superação. Com um sistema de combate rápido e dinâmico, o jogo oferece uma experiência única dentro da série Metal Gear.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
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

export default Page;
