import Link from "next/link";
import Image from "next/image";
// import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Container } from "./Container";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-20 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-background shadow-sm flex items-center justify-center p-1">
                <Image
                  src="/images/logo.png"
                  alt="ChefMind Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Chef<span className="text-primary">Mind</span>
              </span>
            </Link>
            <p className="text-foreground/70 text-sm leading-relaxed mt-2">
              Your smart cooking companion. Discover, save, and cook modern recipes curated just for you.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <BsTwitterX size={20} />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <BsInstagram size={20} />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <BsYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Popular
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/faq" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-foreground/70 text-sm">
                123 Cooking Lane
                <br />
                Food City, FC 12345
              </li>
              <li className="text-foreground/70 text-sm">
                hello@chefmind.com
              </li>
              <li className="text-foreground/70 text-sm">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/50 text-sm">
            © {currentYear} ChefMind. All rights reserved.
          </p>
          <p className="text-foreground/50 text-sm">
            Designed with <span className="text-red-500">♥</span> for food lovers.
          </p>
        </div>
      </Container>
    </footer>
  );
}
