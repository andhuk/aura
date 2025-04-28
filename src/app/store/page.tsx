"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";

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
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Our Collection</h1>
          <p className="text-muted-foreground">
            Discover the latest styles in our curated collection
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-[300px] w-full overflow-hidden bg-muted">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.category}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
