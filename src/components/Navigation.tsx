import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const { authState, signOut } = useAuth();
  const { user, isLoading } = authState;

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logotype.png"
            alt="AURA"
            width={100}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/store" className="text-sm font-medium hover:underline">
            Store
          </Link>

          {!isLoading && (
            <>
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-sm font-medium hover:underline"
                    >
                      Admin
                    </Link>
                  )}
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    className="text-sm font-medium"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:underline"
                  >
                    Login
                  </Link>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 pt-10">
              <Link
                href="/store"
                className="text-sm font-medium hover:underline"
              >
                Store
              </Link>

              {!isLoading && (
                <>
                  {user ? (
                    <>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="text-sm font-medium hover:underline"
                        >
                          Admin
                        </Link>
                      )}
                      <Button
                        onClick={() => signOut()}
                        variant="ghost"
                        className="justify-start text-sm font-medium p-0 h-auto"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-sm font-medium hover:underline"
                      >
                        Login
                      </Link>
                      <Button asChild className="w-full mt-2">
                        <Link href="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
