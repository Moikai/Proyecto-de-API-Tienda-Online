import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Styles from './Header.module.css';

function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <Link to="/" className={Styles.brand} aria-label="Inicio">
          <h2>Mi Tienda</h2>
        </Link>

        <nav className={Styles.nav} aria-label="Navegación principal">
          <Link to="/" className={Styles.btn}>Productos</Link>
          <a className={Styles.btn} href="https://github.com/Moikai/Proyecto-de-API-Tienda-Online" target="_blank" rel="noopener noreferrer">Repo</a>

          <button
            onClick={toggleTheme}
            className={`${Styles.btn} ${Styles.themeToggle}`}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Desactivar modo gris' : 'Activar modo gris'}
            title={theme === 'dark' ? 'Modo gris activado' : 'Activar modo gris'}
          >
            {theme === 'dark' ? '🌙 Gris' : '☀️ Claro'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
