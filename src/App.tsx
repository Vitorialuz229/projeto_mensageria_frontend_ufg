import './App.css';
import Footer from './footer/footer';
import Navigation from './navbar/navbar';
import ProductList from './products/productsList';

function App() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Navigation />
      <main className="flex-grow">
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
