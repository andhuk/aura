import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navigation />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="mb-8">
          <Image
            src="/logotype.png"
            alt="Aura logotype"
            width={300}
            height={150}
            priority
          />
        </div>

        <p className="text-xl font-medium mt-4 mb-8">Premium Clothing Brand</p>

        <Link
          href="/store"
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Explore Collection
        </Link>
      </main>
    </div>
  );
}
