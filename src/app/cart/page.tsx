"use client";
import { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import styles from "../style/Cart.module.css";
import Link from "next/link";

interface CartItem {
  title: string;
  img: string;
  link: string;
  price: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  const fetchCartData = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
        calculateTotalCost(data.cartItems);
        setBalance(data.balance);
      } else {
        const errorData = await response.json();
        alert(`Falha ao buscar dados do carrinho: ${errorData.error || 'Erro desconhecido.'}`);
      }
    } catch {
      alert('Erro ao buscar dados do carrinho.');
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const calculateTotalCost = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalCost(total);
  };

  const handleRemoveFromCart = async (title: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const updatedItems = cartItems.filter((item) => item.title !== title);
        setCartItems(updatedItems);
        calculateTotalCost(updatedItems);
        alert("Item removido do carrinho!");
      } else {
        const errorData = await response.json();
        alert(`Falha ao remover o item do carrinho: ${errorData.error || 'Erro desconhecido.'}`);
      }
    } catch {
      alert('Erro ao remover item do carrinho.');
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("O carrinho está vazio.");
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checkout: true }),
      });

      if (balance >= totalCost) {
        alert("Obrigado pela compra.");
        return;
      }
  
      if (balance < totalCost) {
        alert("Saldo insuficiente.");
        return;
      }

    } catch {
      alert('Erro ao processar a compra.');
    }
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.cartTitle}>Meu Carrinho</h1>
      <ListGroup className={styles.listGroup}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <ListGroup.Item key={index} className={styles.cartItem}>
              <div className={styles.gameInfo}>
                <img
                  src={item.img}
                  alt={item.title}
                  className={styles.gameImage}
                />
                <div className={styles.gameTitle}>{item.title}</div>
                <div className={styles.gamePrice}>
                  R$ {item.price.toFixed(2).replace(".", ",")}
                </div>
                <Button
                  onClick={() => handleRemoveFromCart(item.title)}
                  className={styles.removeButton}
                >
                  Remover
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>O carrinho está vazio.</ListGroup.Item>
        )}
      </ListGroup>
      <div className={styles.totalSection}>
        <p>Saldo Atual: R$ {balance.toFixed(2).replace(".", ",")}</p>
        <p>Total do Carrinho: R$ {totalCost.toFixed(2).replace(".", ",")}</p>
        <Link href='/library'>
          <Button onClick={handleCheckout} className={styles.checkoutButton}>
            Finalizar Compra
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Cart;
