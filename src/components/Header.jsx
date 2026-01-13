import { Link } from 'react-router-dom';
import Styles from './Header.module.css';

function Header() {
  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <Link to="/" className={Styles.brand} aria-label="Inicio">
          <h2>Mi Tienda</h2>
        </Link>

        <nav className={Styles.nav} aria-label="Navegación principal">
          <Link to="/" className={Styles.btn}>Productos</Link>
          <a className={Styles.btn} href="https://github.com/Moikai/Proyecto-de-API-Tienda-Online" target="_blank" rel="noopener noreferrer">Repo</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
