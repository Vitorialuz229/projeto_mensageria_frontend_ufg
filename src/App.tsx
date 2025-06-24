import './App.css'
import Footer from './footer/footer';
import Navigation from './navbar/navbar';
import ProductList from './products/productsList';

function App() {
  return (
    <div className="pt-16"> 
      <Navigation />
      <main>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App
