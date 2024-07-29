"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const FallGuysPage = () => {
    const [selectedImage, setSelectedImage] = useState("/img/fallguys/1.png");
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/GAiaXIxS_4c");
    };

    const isYoutubeVideo = (url: string) => url.includes("youtube");

    const handleAddToWishlist = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        setIsAddingWishlist(true); // Disable button

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Fall Guys",
                    img: '/img/games/fallguys.jpg',
                    link: '/fallguys',
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
        } finally {
            setIsAddingWishlist(false); // Re-enable button
        }
    };

    const handleAddToCart = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        setIsAddingCart(true); // Disable button

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Fall Guys",
                    img: '/img/games/fallguys.jpg',
                    link: '/fallguys',
                    price: 0, // Preço do jogo (ajuste conforme necessário)
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
        } finally {
            setIsAddingCart(false); // Re-enable button
        }
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Fall Guys</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Fall Guys Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Fall Guys" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/fallguys/${index}.png`}
                                    alt={`Fall Guys Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/fallguys/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/GAiaXIxS_4c/0.jpg"
                                alt="Fall Guys Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Fall Guys: Ultimate Knockout" é um jogo de battle royale desenvolvido pela Mediatonic. Lançado em 2020, o jogo coloca os jogadores em uma competição caótica e divertida de obstáculos e desafios, onde apenas um pode vencer. Com uma combinação de jogabilidade frenética e visuais vibrantes, "Fall Guys" oferece uma experiência de jogo social e competitiva que é tanto acessível quanto viciante.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>Grátis</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button
                            className={styles.cartButton}
                            onClick={handleAddToCart}
                            disabled={isAddingCart} // Disable button while adding
                        >
                            {isAddingCart ? 'Adicionando...' : 'ADICIONAR AO CARRINHO'}
                        </Button>
                        <Button
                            className={styles.cartButton}
                            onClick={handleAddToWishlist}
                            disabled={isAddingWishlist} // Disable button while adding
                        >
                            {isAddingWishlist ? 'Adicionando...' : 'ADICIONAR À LISTA DE DESEJOS'}
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default FallGuysPage;
