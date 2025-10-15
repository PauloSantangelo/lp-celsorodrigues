"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-slate-700 hover:text-purple-800 transition-colors"
  >
    {children}
  </Link>
);

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/#topo" className="flex items-center gap-2">
          <Image
            src="/vdlogo.png"
            alt="VD Negócios Logo"
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink href="/#topo">Início</NavLink>
          <NavLink href="/#servicos">Soluções</NavLink>
          <NavLink href="/#sobre">Sobre</NavLink>
          <NavLink href="/#expansao">Consultoria</NavLink>
          <NavLink href="/#acelera">Acelera+</NavLink>
          <NavLink href="/#contato">Contato</NavLink>
        </nav>

        {/* Botão WhatsApp (desktop) */}
        <a
          href="https://wa.me/0000000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 transition-colors shadow-sm"
        >
          <FaWhatsapp className="text-lg" />
          Fale no WhatsApp
        </a>

        {/* Botão mobile */}
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-slate-200"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-slate-700" />
            <span className="block h-0.5 w-5 bg-slate-700" />
            <span className="block h-0.5 w-5 bg-slate-700" />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-4 text-base">
            <NavLink href="/#topo" onClick={() => setOpen(false)}>
              Início
            </NavLink>
            <NavLink href="/#servicos" onClick={() => setOpen(false)}>
              Soluções
            </NavLink>
            <NavLink href="/#sobre" onClick={() => setOpen(false)}>
              Sobre
            </NavLink>
            <NavLink href="/#expansao" onClick={() => setOpen(false)}>
              Consultoria
            </NavLink>
            <NavLink href="/#acelera" onClick={() => setOpen(false)}>
              Acelera+
            </NavLink>
            <NavLink href="/#contato" onClick={() => setOpen(false)}>
              Contato
            </NavLink>

            <a
              href="https://wa.me/0000000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-5 transition-colors"
            >
              <FaWhatsapp className="text-lg" />
              Fale no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
