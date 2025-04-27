import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/store/product/${product.id}`}
      className="group block overflow-hidden rounded-lg transition hover:shadow-md"
    >
      <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image_url || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
