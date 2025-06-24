import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";

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

interface ProductDetailProps {
  product?: Product;
  refreshProducts?: () => void;
}

export default function ProductDetail({
  product: propProduct,
  refreshProducts,
}: ProductDetailProps) {
  const location = useLocation();
  const stateProduct = location.state?.product as Product | undefined;
  const { addToCart } = useCart();

const resolvedProduct = useMemo<Product | null>(() => {
  return propProduct || stateProduct || null;
}, [propProduct, stateProduct]);

const [mainImage, setMainImage] = useState<string>(
  resolvedProduct?.images?.[0] ?? "https://via.placeholder.com/400"
);

  const handleAddToCart = () => {
    if (!resolvedProduct) return;
    if (resolvedProduct.stock <= 0) {
      toast.error("Produto sem estoque disponível.");
      return;
    }

    addToCart({
      id: resolvedProduct.id,
      title: resolvedProduct.title,
      price: resolvedProduct.price,
      stock: resolvedProduct.stock,
      quantity: 1,
    });
    console.log("Produto adicionado ao carrinho:", resolvedProduct);
    toast.success("Produto adicionado ao carrinho!");
    if (refreshProducts) refreshProducts();
  };

  const prevImage = () => {
    if (!resolvedProduct?.images?.length) return;
    const currentIndex = resolvedProduct.images.indexOf(mainImage);
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : resolvedProduct.images.length - 1;
    setMainImage(resolvedProduct.images[prevIndex]);
  };

  const nextImage = () => {
    if (!resolvedProduct?.images?.length) return;
    const currentIndex = resolvedProduct.images.indexOf(mainImage);
    const nextIndex =
      currentIndex < resolvedProduct.images.length - 1 ? currentIndex + 1 : 0;
    setMainImage(resolvedProduct.images[nextIndex]);
  };

  if (!resolvedProduct)
    return <div className="text-red-500">Produto não encontrado</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{resolvedProduct.title}</h1>

      <div className="flex gap-6">
        {/* Miniaturas */}
        <div className="flex flex-col gap-2">
          {resolvedProduct.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${resolvedProduct.title} - Miniatura ${i + 1}`}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Imagem principal */}
        <div className="relative w-96 h-96">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md z-10"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={mainImage}
            alt={resolvedProduct.title}
            className="w-full h-full object-cover rounded-md border"
          />

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md z-10"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Detalhes */}
        <div className="flex-1">
          <p className="mb-2 text-gray-700">{resolvedProduct.description}</p>
          <p className="mb-4 font-semibold text-xl">${resolvedProduct.price}</p>
          <p className="mb-4 text-gray-500">Categoria: {resolvedProduct.category}</p>
          <p className="mb-4 text-gray-500">Em estoque: {resolvedProduct.stock}</p>

          {resolvedProduct.tags && resolvedProduct.tags.length > 0 && (
            <div className="text-sm text-gray-600">
              Tags: {resolvedProduct.tags.join(", ")}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md transition disabled:opacity-50"
            disabled={resolvedProduct.stock <= 0}
          >
            {resolvedProduct.stock <= 0 ? "Indisponível" : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>

      {/* Avaliações */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
        {resolvedProduct.reviews.length === 0 ? (
          <p>Nenhuma avaliação disponível para este produto.</p>
        ) : (
          resolvedProduct.reviews.map((review) => (
            <div key={review.id} className="mb-4 border-b pb-2">
              <p className="font-semibold">
                {review.reviewerName} ({review.reviewerEmail})
              </p>
              <p className="text-yellow-600">Nota: {review.rating} / 5</p>
              <p className="text-gray-800">{review.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
