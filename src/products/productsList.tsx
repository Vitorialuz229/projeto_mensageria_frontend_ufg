import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import ProductDetail from "./productDetail";
import { ShoppingCart } from "lucide-react";

interface Review {
  id: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
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

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      fetch("http://localhost:8081/product/")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        })
        .catch((error) => console.error("Erro ao buscar produtos:", error));
    }
  }, []);

  function openModal(product: Product) {
    setSelectedProduct(product);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedProduct(null);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Product List
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative cursor-pointer">
              <div>
                <img
                  alt={product.title}
                  src={product.images?.[0] || "https://via.placeholder.com/300"}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  {/* Link no título */}
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.id}`} state={{ product }}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
              <button
                onClick={() => openModal(product)}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                aria-label={`Adicionar ${product.title} ao carrinho`}
                type="button"
              >
                <ShoppingCart size={20} className="text-black" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedProduct && <ProductDetail product={selectedProduct} />}
      </Modal>
    </div>
  );
}
