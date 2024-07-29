"use client"
import { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import styles from '../style/Cart.module.css';

interface CartItem {
  title: string;
  img: string;
  link: string;
  price: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [balance, setBalance] = useState<number>(0);

  // Função para obter itens do carrinho
  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Função para obter o saldo do usuário
  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/user/balance');
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        console.error('Failed to fetch balance');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  // Atualizar carrinho e saldo ao carregar a página
  useEffect(() => {
    fetchCartItems();
    fetchBalance();
  }, []);

  // Função para remover um item do carrinho
  const handleRemoveFromCart = async (title: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item.title !== title));
        alert('Item removed from cart!');
      } else {
        const errorData = await response.json();
        console.error('Error removing from cart:', errorData.error);
        alert(`Failed to remove from cart: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during remove from cart:', error);
      alert('Error removing item from cart.');
    }
  };

  // Função para finalizar a compra
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('The cart is empty.');
      return;
    }

    try {
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error during checkout:', errorText);
        alert('Error during checkout.');
        return;
      }

      const result = await response.json();
      alert('Checkout successful!');
      setCartItems([]); // Clear the cart after successful checkout
      fetchBalance(); // Refresh balance after successful purchase
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error processing checkout.');
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
                <img src={item.img} alt={item.title} className={styles.gameImage} />
                <div className={styles.gameTitle}>{item.title}</div>
                <div className={styles.gamePrice}>R$ {item.price.toFixed(2).replace('.', ',')}</div>
                <Button onClick={() => handleRemoveFromCart(item.title)} className={styles.removeButton}>
                  &times;
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
      </ListGroup>
      <div className={styles.totalSection}>
        <p>Saldo: R$ {balance.toFixed(2).replace('.', ',')}</p>
        <Button onClick={handleCheckout} className={styles.checkoutButton}>
          Finalizar Compra
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
