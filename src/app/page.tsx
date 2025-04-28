"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("свободи");
  const words = ["свободи", "комфорту", "смаку"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const currentIndex = words.indexOf(prev);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logotype.png"
            alt="AURA"
            width={100}
            height={50}
            priority
            style={{ filter: "invert(1)" }}
          />
        </Link>

        <a
          href="https://www.instagram.com/wearaura.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white"
        >
          <Instagram className="h-6 w-6" />
          <span className="text-sm font-medium">
            Підпишись, щоб бути першим
          </span>
        </a>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          <span style={{ fontFamily: "serif", fontStyle: "italic" }}>
            Форма
          </span>{" "}
          {currentWord}
        </h1>
      </main>

      <div className="fixed bottom-6 w-full text-center">
        <p className="text-xl font-medium text-white">скоро</p>
      </div>
    </div>
  );
}
