import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Review {
  id: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images?: string[];
  tags?: string[];
  reviews: Review[];
}

interface ProductsContextType {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts deve ser usado dentro de ProductsProvider");
  return context;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:8081/product/");
      if (!res.ok) throw new Error("Erro na resposta da API");
      const data = await res.json();
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch {
        localStorage.removeItem("products");
        fetchProducts();
      }
    } else {
      fetchProducts();
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
