"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/dmc5/1.png");
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/KMSGj9Y2T9Q");
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
                    title: "Devil May Cry 5",
                    img: '/img/games/dmc5.jpg',
                    link: '/dmc5',
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
                    title: "Devil May Cry 5",
                    img: '/img/games/dmc5.jpg',
                    link: '/dmc5',
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
                    <h1>Devil May Cry 5</h1>
                </header>
                <main>
                    <section className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Devil May Cry 5 Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Devil May Cry 5" className={styles.mainImage} />
                        )}
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/dmc5/${index}.png`}
                                    alt={`Devil May Cry 5 Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/dmc5/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/KMSGj9Y2T9Q/0.jpg"
                                alt="Devil May Cry 5 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Devil May Cry 5" é um jogo de ação desenvolvido pela Capcom, continuando a renomada série de hack-and-slash. O jogo segue a história de Dante, Nero e V, três caçadores de demônios, enquanto eles enfrentam uma invasão demoníaca em Red Grave City. Com um combate estilizado e uma narrativa envolvente, "Devil May Cry 5" oferece uma experiência intensa e visualmente impressionante para os fãs de ação.</p>
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
