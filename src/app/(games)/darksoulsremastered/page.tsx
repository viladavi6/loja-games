"use client";
import { useState, useEffect } from 'react'; // Adicione useEffect aqui
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/darksoulsremastered/1.png");
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/N6zrakuxY_s");
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
                body: JSON.stringify({ title: "Dark Souls Remastered" }),
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
                body: JSON.stringify({ title: "Dark Souls Remastered" }),
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
                    title: "Dark Souls Remastered",
                    img: '/img/games/darksoulsremastered.jpg',
                    link: '/darksoulsremastered',
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
                    title: "Dark Souls Remastered",
                    img: '/img/games/darksouls.jpg',
                    link: '/darksoulsremastered',
                    price: 250,
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
                    <h1>Dark Souls Remastered</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Dark Souls Remastered Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Dark Souls Remastered" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/darksoulsremastered/${index}.png`}
                                    alt={`Dark Souls Remastered Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/darksoulsremastered/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/N6zrakuxY_s/0.jpg"
                                alt="Dark Souls Remastered Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Dark Souls Remastered" é uma versão atualizada do aclamado RPG de ação "Dark Souls". Esta edição remasterizada oferece gráficos melhorados e um desempenho otimizado, preservando a experiência desafiadora e envolvente que tornou o jogo famoso. Os jogadores exploram um mundo sombrio e interconectado, enfrentando inimigos formidáveis e desvendando mistérios profundos enquanto enfrentam o caos de Lordran. Prepare-se para uma aventura intensa e imersiva no mundo de Dark Souls.</p>
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
