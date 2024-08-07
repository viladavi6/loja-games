"use client";

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/awayout/1.png");
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
                    body: JSON.stringify({ title: 'A Way Out' }),
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
                    body: JSON.stringify({ title: 'A Way Out' }),
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
        setSelectedImage("https://www.youtube.com/embed/yGZGSdgJVPM");
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
                    title: 'A Way Out',
                    img: '/img/games/awayout.jpg',
                    link: '/awayout',
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
                    title: 'A Way Out',
                    img: '/img/games/awayout.jpg',
                    link: '/awayout',
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
                    <h1>A Way Out</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="A Way Out Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="A Way Out" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/awayout/${index}.png`}
                                    alt={`A Way Out Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/awayout/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/yGZGSdgJVPM/0.jpg"
                                alt="A Way Out Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"A Way Out" é um jogo de ação e aventura desenvolvido pela Hazelight Studios e publicado pela Electronic Arts. O jogo é exclusivo para dois jogadores, que devem cooperar para escapar da prisão e seguir em frente, enfrentando desafios e resolvendo quebra-cabeças. Os jogadores controlam Leo e Vincent, dois prisioneiros que formam uma aliança improvável para alcançar a liberdade. Com uma narrativa envolvente e um gameplay único, "A Way Out" oferece uma experiência cooperativa inesquecível.</p>
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
