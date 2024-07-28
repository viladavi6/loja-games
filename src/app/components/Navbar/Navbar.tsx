"use client";

import styles from "../../style/Navbar.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie';

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sessionCookie = Cookies.get('session');
    if (sessionCookie) {
      const sessionData = JSON.parse(sessionCookie);
      setUsername(sessionData.username);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove('session');
    setUsername(null);
    window.location.href = '/login'; // Redireciona para a página de login
  };

  const handleDropdownToggle = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <img src="/img/logo.png" width={30} height={55} alt="logo" />
        <img className={styles.bar} src="/img/bar.png" alt="bar" />
        <img className={styles.store} src="/img/store.png" width={35} height={35} alt="store" />
      </Link>
      {username ? (
        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <button
            className={styles.userButton}
            onClick={handleDropdownToggle}
          >
            {username}
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <button
                className={styles.dropdownItem}
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className={styles.login}>
          <img src="/img/user.png" width={30} height={35} alt="login" />
        </Link>
      )}
    </nav>
  );
}
