import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8">
      <div className="mb-8">
        <Image
          src="/logotype.png"
          alt="Aura logotype"
          width={150}
          height={75}
          priority
        />
      </div>

      <p className="text-xl font-medium mt-4">Coming Soon</p>
    </div>
  );
}
