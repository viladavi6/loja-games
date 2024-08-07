"use client";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/theevilwithin2/1.png");
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/fyA_l5SU1io?autoplay=1&mute=1");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    const checkIfInCart = async () => {
        try {
            const response = await fetch('/api/gameonlibrary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: "The Evil Within 2" }),
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
                body: JSON.stringify({ title: "The Evil Within 2" }),
            });
            const data = await response.json();
            setIsInWishlist(data.exists);
        } catch (error) {
            console.error('Erro ao verificar a lista de desejos:', error);
        }
    };

    useEffect(() => {
        checkIfInCart();
        checkIfInWishlist();
    }, []);

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

        setIsAddingWishlist(true);

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "The Evil Within 2",
                    img: '/img/games/theevilwithin2.jpg',
                    link: '/theevilwithin2',
                }),
            });

            if (response.ok) {
                alert('Adicionado à lista de desejos');
                setIsInWishlist(true);
            } else {
                const errorText = await response.text();
                console.error('Failed to add to wishlist:', errorText);
                alert('Não foi possível adicionar à lista de desejos. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert('Erro ao adicionar à lista de desejos. Tente novamente mais tarde.');
        } finally {
            setIsAddingWishlist(false);
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

        setIsAddingCart(true);

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "The Evil Within 2",
                    img: '/img/games/theevilwithin2.jpg',
                    link: '/theevilwithin2',
                    price: 250, // Preço do jogo
                }),
            });

            if (response.ok) {
                alert('Adicionado ao carrinho');
                setIsInCart(true);
            } else {
                const errorText = await response.text();
                console.error('Failed to add to cart:', errorText);
                alert('Não foi possível adicionar ao carrinho. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Erro ao adicionar ao carrinho. Tente novamente mais tarde.');
        } finally {
            setIsAddingCart(false);
        }
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>The Evil Within 2</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="The Evil Within 2 Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="The Evil Within 2" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/theevilwithin2/${index}.png`}
                                    alt={`The Evil Within 2 Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/theevilwithin2/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/fyA_l5SU1io/0.jpg"
                                alt="The Evil Within 2 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"The Evil Within 2" é um jogo de survival horror desenvolvido pela Tango Gameworks e publicado pela Bethesda Softworks. Neste segundo capítulo, o detetive Sebastian Castellanos deve enfrentar horrores inimagináveis enquanto busca por sua filha desaparecida. Com uma narrativa intensa e aterrorizante, "The Evil Within 2" combina exploração, combate tenso e momentos de pura tensão, oferecendo uma experiência de horror inesquecível.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                        <Button
                            className={styles.buyButton}
                            onClick={handleAddToCart}
                            disabled={isInCart || isAddingCart}
                        >
                            {isInCart ? 'VOCÊ JÁ TEM ESTE JOGO' : 'ADICIONAR AO CARRINHO'}
                        </Button>
                        <Button
                            className={styles.cartButton}
                            onClick={handleAddToWishlist}
                            disabled={isInWishlist || isAddingWishlist}
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
