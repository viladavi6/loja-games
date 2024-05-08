import styles from "../../style/Navbar.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src={"/img/logo.png"} width={50} height={50} alt="logo" />
            </div>
            <ul className={styles.link_items}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">Sobre</Link>
                </li>
            </ul>
        </nav>
    )
}


