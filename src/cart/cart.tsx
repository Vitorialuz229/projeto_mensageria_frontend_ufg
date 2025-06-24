import { useState } from "react";
import { useCart } from "../context/cartContext";
import StatusModal from "../modal/StatusModal";
import { useProducts } from "../context/productsContext";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function Cart({ onClose }: { onClose?: () => void }) {
  const { cartItems, checkout, updateQuantity } = useCart();
  const { fetchProducts } = useProducts();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleCheckout() {
    setStatus("loading");
    const result = await checkout();
    setStatus(result);

    if (result === "success") {
      await fetchProducts();
    }
  }

  function closeModal() {
    setStatus("idle");
  }

  function increaseQuantity(id: string, currentQty: number, stock: number) {
    if (currentQty >= stock) {
      toast.error("Quantidade máxima em estoque atingida.");
      return;
    }
    updateQuantity(id, currentQty + 1);
  }

  function decreaseQuantity(id: string, currentQty: number) {
    updateQuantity(id, currentQty - 1);
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="relative p-6 max-w-3xl mx-auto bg-white">
      <h2 className="text-2xl font-semibold mb-4">Seu Carrinho</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full"
          aria-label="Fechar carrinho"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-gray-600">
                      Preço: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                      className="w-8 h-8 bg-gray-200 text-lg rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.quantity, item.stock)
                      }
                      className="w-8 h-8 bg-gray-200 text-lg rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-600">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={status === "loading"}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {status === "loading" ? "Processando..." : "Finalizar Compra"}
          </button>
        </>
      ) : (
        <p className="text-gray-600 text-center">Seu carrinho está vazio.</p>
      )}

      {(status === "success" || status === "error") && (
        <StatusModal status={status} onClose={closeModal} />
      )}
    </div>
  );
}
