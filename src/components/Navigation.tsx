import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Instagram } from "lucide-react";

export default function Navigation() {
  return (
    <header className="border-b">
      <div className="container flex h-12 items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logotype.png"
            alt="AURA"
            width={70}
            height={35}
            priority
            style={{ filter: "invert(1)" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
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
              <a
                href="https://www.instagram.com/wearaura.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-6 w-6" />
                <span className="text-sm font-medium">
                  Підпишись, щоб бути першим
                </span>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
