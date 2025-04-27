import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
