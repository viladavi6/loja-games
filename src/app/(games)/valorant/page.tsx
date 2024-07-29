"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const ValorantPage = () => {
    const [selectedImage, setSelectedImage] = useState("/img/valorant/1.png");
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    // Handle image clicks to change the selected image
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    // Handle trailer click to show the trailer video
    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/lWr6dhTcu-E");
    };

    // Check if the URL is for a YouTube video
    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    // Handle adding/removing from wishlist
    const handleWishlistClick = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('/api/wishlist', {
                method: isInWishlist ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Valorant",
                    img: '/img/games/valorant.jpg',
                    link: '/valorant',
                }),
            });

            if (response.ok) {
                setIsInWishlist(!isInWishlist);
                alert(isInWishlist ? 'Removido da lista de desejos' : 'Adicionado à lista de desejos');
            } else {
                const errorText = await response.text();
                console.error('Failed to update wishlist:', errorText);
                alert('Não foi possível atualizar a lista de desejos');
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
            alert('Erro ao atualizar a lista de desejos');
        }
    };

    // Handle adding to cart
    const handleAddToCart = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('/api/cart', {
                method: isInCart ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Valorant",
                    img: '/img/games/valorant.jpg',
                    link: '/valorant',
                    price: 0, // Preço do jogo, no caso é gratuito
                }),
            });

            if (response.ok) {
                setIsInCart(!isInCart);
                alert(isInCart ? 'Removido do carrinho' : 'Adicionado ao carrinho');
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
                    <h1>Valorant</h1>
                </header>
                <main>
                    <section className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Valorant Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Valorant" className={styles.mainImage} />
                        )}
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/valorant/${index}.png`}
                                    alt={`Valorant Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/valorant/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/lWr6dhTcu-E/0.jpg"
                                alt="Valorant Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Valorant" é um jogo de tiro em primeira pessoa tático desenvolvido e publicado pela Riot Games. Lançado em 2020, o jogo apresenta partidas 5 contra 5 onde jogadores assumem o papel de agentes com habilidades únicas. "Valorant" combina elementos de jogos de tiro táticos com habilidades de personagens para oferecer uma experiência competitiva intensa e estratégica.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>Grátis</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button 
                            className={styles.cartButton}
                            onClick={handleAddToCart}
                        >
                            {isInCart ? 'REMOVER DO CARRINHO' : 'ADICIONAR AO CARRINHO'}
                        </Button>
                        <Button 
                            className={`${styles.cartButton} ${isInWishlist ? styles.inWishlist : ''}`} 
                            onClick={handleWishlistClick}
                        >
                            {isInWishlist ? 'REMOVER DA LISTA DE DESEJOS' : 'ADICIONAR À LISTA DE DESEJOS'}
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ValorantPage;
