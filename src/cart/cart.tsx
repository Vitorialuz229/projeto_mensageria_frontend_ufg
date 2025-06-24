import { useCart } from "../context/cartContext";

export default function Cart() {
  const { cartItems } = useCart();
  return (
    <>
      {cartItems.length > 0 && (
        <div className="mb-6 border p-4 rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Itens no carrinho:</h3>
          <ul className="list-disc ml-5 space-y-1">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} – {item.quantity}x (${item.price})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}