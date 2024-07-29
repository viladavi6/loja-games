"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/evildead/1.jpg");
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/LiZqKiamYSs");
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

        setIsAddingWishlist(true); // Disable button

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Evil Dead",
                    img: '/img/games/evildead.jpg',
                    link: '/evildead',
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
                    title: "Evil Dead",
                    img: '/img/games/evildead.jpg',
                    link: '/evildead',
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
                    <h1>Evil Dead</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Evil Dead Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Evil Dead" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/evildead/${index}.jpg`}
                                    alt={`Evil Dead Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/evildead/${index}.jpg`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/LiZqKiamYSs/0.jpg"
                                alt="Evil Dead Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Evil Dead: The Game" é um jogo de ação e terror multiplayer desenvolvido pela Saber Interactive. Baseado na icônica franquia de filmes de terror "Evil Dead", o jogo permite que os jogadores assumam o papel de personagens clássicos como Ash Williams e seus amigos, ou do vilão Kandarian Demon. Em partidas cooperativas e competitivas, os jogadores enfrentam hordas de Deadites em locais emblemáticos da série. Com gráficos detalhados, uma atmosfera aterrorizante e uma jogabilidade intensa, "Evil Dead: The Game" oferece uma experiência emocionante para os fãs de terror e da série Evil Dead.</p>
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
