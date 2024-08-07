"use client";

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/baldursgate3/1.png");
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const checkIfInCart = async () => {
            try {
                const response = await fetch('/api/gameonlibrary', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: "Baldur's Gate 3" }),
                });
                const data = await response.json();
                setIsInCart(data.exists);
            } catch (error) {
                console.error('Erro ao verificar o carrinho:', error);
            }
        };

        const checkIfInWishlist = async () => {
            try {
                const response = await fetch('/api/checkwishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: "Baldur's Gate 3" }),
                });
                const data = await response.json();
                setIsInWishlist(data.exists);
            } catch (error) {
                console.error('Erro ao verificar a lista de desejos:', error);
            }
        };

        checkIfInCart();
        checkIfInWishlist();
    }, []);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/OcP0WdH7rTs");
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

        if (isInWishlist) {
            alert('Jogo já está na lista de desejos!');
            return;
        }

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Baldur's Gate 3",
                    img: '/img/games/baldursgate3.jpg',
                    link: '/baldursgate3',
                }),
            });

            if (response.ok) {
                alert('Adicionado à lista de desejos');
                setIsInWishlist(true);
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

        if (isInCart) {
            alert('Você já possui este jogo na sua biblioteca.');
            return;
        }

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Baldur's Gate 3",
                    img: '/img/games/baldursgate3.jpg',
                    link: '/baldursgate3',
                    price: 250, // Preço do jogo
                }),
            });

            if (response.ok) {
                alert('Adicionado ao carrinho');
                setIsInCart(true);
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
                    <h1>Baldur's Gate 3</h1>
                </header>
                <main>
                    <section className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Baldur's Gate 3 Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Baldur's Gate 3" className={styles.mainImage} />
                        )}
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/baldursgate3/${index}.png`}
                                    alt={`Baldur's Gate 3 Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/baldursgate3/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/OcP0WdH7rTs/0.jpg"
                                alt="Baldur's Gate 3 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Baldur's Gate 3" é um RPG de fantasia desenvolvido pela Larian Studios, que dá continuidade à lendária série de jogos Baldur's Gate. Ambientado no universo de Dungeons & Dragons, o jogo oferece uma rica narrativa com escolhas impactantes, um mundo aberto expansivo e um combate tático baseado em turnos. Explore um vasto mundo repleto de perigos, alianças e mistérios enquanto você forma uma equipe de heróis e enfrenta uma ameaça sobrenatural.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                        <Button 
                            className={styles.cartButton} 
                            onClick={handleAddToCart}
                            disabled={isInCart}
                        >
                            {isInCart ? 'VOCÊ JÁ COMPROU ESTE JOGO' : 'ADICIONAR AO CARRINHO'}
                        </Button>
                        <Button 
                            className={styles.cartButton} 
                            onClick={handleAddToWishlist}
                            disabled={isInWishlist}
                        >
                            {isInWishlist ? 'ADICIONADO À LISTA DE DESEJOS' : 'ADICIONAR À LISTA DE DESEJOS'}
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Page;
