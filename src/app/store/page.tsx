"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    description: "Soft, breathable cotton t-shirt for everyday comfort.",
    price: 29.99,
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    category: "T-Shirts",
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with stretch for maximum comfort.",
    price: 59.99,
    image_url:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80",
    category: "Pants",
  },
  {
    id: "3",
    name: "Oversized Hoodie",
    description: "Cozy oversized hoodie perfect for cooler days.",
    price: 49.99,
    image_url:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "Hoodies",
  },
];

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Example products for demonstration if no products exist yet
  const demoProducts: Product[] = [
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      description: "Soft, breathable cotton t-shirt for everyday comfort.",
      price: 29.99,
      image_url:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      category: "T-Shirts",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      description: "Modern slim fit jeans with stretch for maximum comfort.",
      price: 59.99,
      image_url:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80",
      category: "Pants",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Oversized Hoodie",
      description: "Cozy oversized hoodie perfect for cooler days.",
      price: 49.99,
      image_url:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      category: "Hoodies",
      created_at: new Date().toISOString(),
    },
  ];

  const displayProducts = products.length > 0 ? products : demoProducts;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <nav className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logotype.png"
            alt="AURA"
            width={100}
            height={50}
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/store" className="text-sm hover:underline">
            Store
          </Link>
          <Link href="/login" className="text-sm hover:underline">
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Register
          </Link>
        </div>
      </nav>

      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-2">Our Collection</h1>
        <p className="text-gray-600 mb-8">
          Discover the latest styles in our curated collection
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-800">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="group block overflow-hidden rounded-lg transition hover:shadow-md"
              >
                <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                  <p className="mt-2 font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
