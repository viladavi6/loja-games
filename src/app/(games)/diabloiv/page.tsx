"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/diabloiv/1.png");
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/Ro26B394ZBM");
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
                    title: "Diablo IV",
                    img: '/img/games/diabloiv.jpg',
                    link: '/diabloiv',
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
                    title: "Diablo IV",
                    img: '/img/games/diabloiv.jpg',
                    link: '/diabloiv',
                    price: 250, // Preço do jogo
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
                    <h1>Diablo IV</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Diablo IV Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Diablo IV" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/diabloiv/${index}.png`}
                                    alt={`Diablo IV Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/diabloiv/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/Ro26B394ZBM/0.jpg"
                                alt="Diablo IV Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Diablo IV" é um jogo de ação e RPG desenvolvido pela Blizzard Entertainment. Continuando a lendária série, o jogo leva os jogadores a um mundo sombrio e vasto, repleto de criaturas infernais e desafios épicos. Com gráficos impressionantes e uma jogabilidade envolvente, "Diablo IV" promete entregar uma experiência memorável para os fãs do gênero. Os jogadores podem escolher entre diversas classes, cada uma com habilidades únicas, e embarcar em uma jornada para derrotar o mal e restaurar a paz no reino.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
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

export default Page;
