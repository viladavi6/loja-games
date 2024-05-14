import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../../style/Footer.module.css";
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row>
                    <Col className={styles.list}>
                        <li>
                            <Link href="/contacts">Contatos</Link>
                        </li>
                        <li>
                            <Link href="/terms">Termos de Uso</Link>
                        </li>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
