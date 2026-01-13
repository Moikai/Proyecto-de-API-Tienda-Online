import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductPage from './pages/ProductPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import Header from './components/Header';


function App() {
  return (
    <main>
      <Header />
      <h1>"Proyecto de APIs"</h1>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </main>
  );
}

export default App;
