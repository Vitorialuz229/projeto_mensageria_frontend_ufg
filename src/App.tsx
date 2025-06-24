import './App.css';
import { Routes, Route } from 'react-router-dom';

import Footer from './footer/footer';
import Navigation from './navbar/navbar';
import ProductList from './products/productsList';
import ProductDetail from './products/productDetail';

function App() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
