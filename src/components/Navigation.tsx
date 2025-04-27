import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navigation() {
  const { authState, signOut } = useAuth();
  const { user, isLoading } = authState;

  return (
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

        {!isLoading && (
          <>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="text-sm hover:underline">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm hover:underline"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm hover:underline">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
