import styles from "../../style/Navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import { Dropdown } from "react-bootstrap"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <img src={"/img/logo.png"} width={30} height={55} alt="logo" />
            </Link>
            <Link href="/login" className={styles.login}>
                <img src={"/img/user.png"} width={30} height={35} alt="login" />
            </Link>
        </nav>
    )
}


