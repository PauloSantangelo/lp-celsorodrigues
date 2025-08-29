"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

/** Hook leve de reveal on scroll */
function useReveal<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12, ...opts }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, visible };
}

type ContatoProps = {
  whatsappLink: string;   // ex: "https://wa.me/55XXXXXXXXXXX?text=Quero%20falar%20com%20a%20VD"
  instagramLink: string;  // ex: "https://instagram.com/seuusuario"
  photoSrc: string;       // ex: "/consultor1.png"
};

export default function Contato({
  whatsappLink,
  instagramLink,
  photoSrc,
}: ContatoProps) {
  // Reveals do topo
  const head = useReveal<HTMLDivElement>();
  const topCta = useReveal<HTMLDivElement>();

  // Reveals da faixa roxa
  const photoRev = useReveal<HTMLDivElement>();
  const infoRev = useReveal<HTMLDivElement>();

  return (
    <section id="contato" className="bg-slate-50" aria-label="Contato e canais">
      {/* Topo: título + parágrafo + CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div
          ref={head.ref}
          className={[
            "transition-all duration-700 ease-out motion-reduce:transition-none",
            head.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
            Quer entrar em contato?
          </h2>
          <p className="mt-2 text-slate-600">
            Clique no botão abaixo e fale diretamente com Paulo Santangelo ou conecte-se pelo Instagram.
          </p>
        </div>

        <div
          ref={topCta.ref}
          className={[
            "mt-6 transition-all duration-700 ease-out delay-150 motion-reduce:transition-none",
            topCta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 justify-center rounded-full bg-green-500 hover:bg-green-600 text-white px-7 py-3 md:px-9 md:py-4 text-base md:text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
            aria-label="Conversar via WhatsApp"
          >
            <FaWhatsapp className="text-lg md:text-xl" />
            Clique aqui para falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Faixa roxa: foto + canais */}
      <div className="relative w-full bg-purple-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="relative mx-auto grid md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12">
            {/* Decor + Foto (entra da esquerda no desktop) */}
            <div
              ref={photoRev.ref}
              className={[
                "relative flex items-center justify-center",
                "transition-all duration-700 ease-out motion-reduce:transition-none",
                photoRev.visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6",
              ].join(" ")}
            >
              {/* efeitos de fundo */}
              <div className="absolute -z-10 h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-purple-700 blur-2xl opacity-60" aria-hidden="true" />
              <div className="absolute -z-10 h-80 w-80 sm:h-96 sm:w-96 rounded-full ring-2 ring-white/10" aria-hidden="true" />
              <div className="absolute -z-10 h-[22rem] w-[22rem] rounded-full ring-2 ring-white/10 translate-x-6 translate-y-6" aria-hidden="true" />

              {/* foto */}
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full overflow-hidden ring-4 ring-white/80 shadow-2xl">
                <Image
                  src={photoSrc}
                  alt="Foto de Paulo Santangelo"
                  fill
                  className="object-cover"
                  priority={false}
                  sizes="(max-width: 640px) 12rem, (max-width: 768px) 14rem, 16rem"
                />
              </div>
            </div>

            {/* Info + canais (entra da direita no desktop) */}
            <div
              ref={infoRev.ref}
              className={[
                "text-center md:text-left",
                "transition-all duration-700 ease-out delay-150 motion-reduce:transition-none",
                infoRev.visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-6",
              ].join(" ")}
            >
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold">Paulo Santangelo</h3>
                <p className="mt-1 text-white/80">Consultor Franqueado VD Negócios</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
                  aria-label="Falar no WhatsApp"
                >
                  <FaWhatsapp className="text-lg" />
                  Falar no WhatsApp
                </a>

                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center rounded-full bg-white text-purple-900 hover:bg-purple-50 px-6 py-3 font-semibold shadow-md transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
                  aria-label="Abrir Instagram"
                >
                  <FaInstagram className="text-xl" />
                  Instagram
                </a>
              </div>

              <p className="mt-3 text-sm text-white/70">
                Atendimento personalizado e próximo do empreendedor.
              </p>
            </div>
          </div>
        </div>

        {/* borda inferior sutil */}
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
