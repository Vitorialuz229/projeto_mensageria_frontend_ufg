import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8081/product/${id}`);
        if (!res.ok) throw new Error("Produto não encontrado");
        const data: Product = await res.json();
        setProduct(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erro ao carregar o produto");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-600">Erro: {error}</div>;
  if (!product) return <div>Produto não encontrado</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Miniatura ${index + 1}`}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="relative w-96 h-96">
          <button
            onClick={() => {
              const currentIndex = product.images?.indexOf(mainImage || "") ?? 0;
              const prevIndex =
                currentIndex > 0
                  ? currentIndex - 1
                  : (product.images?.length ?? 1) - 1;
              setMainImage(product.images?.[prevIndex] || null);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={mainImage ?? "https://via.placeholder.com/400"}
            alt={product.title}
            className="w-full h-full object-cover rounded-md border"
          />

          <button
            onClick={() => {
              const currentIndex = product.images?.indexOf(mainImage || "") ?? 0;
              const nextIndex =
                currentIndex < (product.images?.length ?? 1) - 1 ? currentIndex + 1 : 0;
              setMainImage(product.images?.[nextIndex] || null);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Detalhes do produto */}
        <div className="flex-1">
          <p className="mb-2 text-gray-700">{product.description}</p>
          <p className="mb-4 font-semibold text-xl">${product.price}</p>
          <p className="mb-4 text-gray-500">Categoria: {product.category}</p>
          <p className="mb-4 text-gray-500">Em estoque: {product.stock}</p>
          {product.tags && product.tags.length > 0 && (
            <div className="text-sm text-gray-600">Tags: {product.tags.join(", ")}</div>
          )}
        </div>
      </div>

      {/* Avaliações */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
        {product.reviews.length === 0 ? (
          <p>Nenhuma avaliação disponível para este produto.</p>
        ) : (
          product.reviews.map((review) => (
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
