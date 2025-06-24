import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  checkout: () => Promise<"success" | "error">;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}

export function CartProvider({
  children,
  onCheckoutSuccess,
}: {
  children: ReactNode;
  onCheckoutSuccess?: () => void;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product: CartItem) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id: string, quantity: number) {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  async function checkout() {
    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          produtoId: item.id,
          quantity: item.quantity,
        })),
      };

      const outOfStock = cartItems.find((item) => item.quantity > item.stock);
      if (outOfStock) {
        toast.error(`Produto ${outOfStock.title} não tem estoque suficiente.`);
        return "error";
      }

      const response = await fetch("http://localhost:8081/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) throw new Error("Erro ao finalizar pedido");

      setCartItems([]);
      localStorage.removeItem("cart");
      if (onCheckoutSuccess) onCheckoutSuccess();
      return "success";
    } catch {
      return "error";
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}
