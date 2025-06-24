import "./App.css";

import Footer from "./footer/footer";
import Navigation from "./navbar/navbar";
import { CartProvider } from "./context/cartContext";
import { ProductsProvider, useProducts } from "./context/productsContext";
import { Route, Routes } from "react-router-dom";
import ProductList from "./products/productsList";
import ProductDetail from "./products/productDetail";

function AppContent() {
  const { fetchProducts } = useProducts();

  return (
    <CartProvider onCheckoutSuccess={fetchProducts}>
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
    </CartProvider>
  );
}

function App() {
  return (
    <ProductsProvider>
      <AppContent />
    </ProductsProvider>
  );
}

export default App;
