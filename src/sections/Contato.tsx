"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import FormularioFranquia from "./FormularioFranquia";

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
  instagramLink: string;
  photoSrc: string;
};

export default function Contato({ instagramLink, photoSrc }: ContatoProps) {
  const head = useReveal<HTMLDivElement>();
  const formRev = useReveal<HTMLDivElement>();
  const photoRev = useReveal<HTMLDivElement>();
  const infoRev = useReveal<HTMLDivElement>();

  return (
    <section id="contato" className="bg-slate-50" aria-label="Contato e canais">
      {/* Topo: título + formulário de franquia */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div
          ref={head.ref}
          className={[
            "transition-all duration-700 ease-out motion-reduce:transition-none",
            head.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
            Pronto para Transformar seu Negócio em Franquia?
          </h2>
          <p className="mt-3 text-lg text-slate-700 max-w-3xl mx-auto">
            Preencha os dados abaixo para receber um diagnóstico inicial de franqueabilidade.
            É o primeiro passo para escalar seu negócio com segurança.
          </p>
        </div>

        {/* Formulário de Franquia */}
        <div
          ref={formRev.ref}
          className={[
            "mt-10 md:mt-12 transition-all duration-700 ease-out delay-150 motion-reduce:transition-none",
            formRev.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95",
          ].join(" ")}
        >
          <FormularioFranquia />
        </div>
      </div>

      {/* Faixa roxa: foto + canais */}
      <div className="relative w-full bg-purple-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="relative mx-auto grid md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12">
            {/* Foto */}
            <div
              ref={photoRev.ref}
              className={[
                "relative flex items-center justify-center",
                "transition-all duration-700 ease-out",
                photoRev.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
              ].join(" ")}
            >
              <div
                className="absolute -z-10 h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-purple-700 blur-2xl opacity-60"
                aria-hidden="true"
              />
              <div
                className="absolute -z-10 h-80 w-80 sm:h-96 sm:w-96 rounded-full ring-2 ring-white/10"
                aria-hidden="true"
              />
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full overflow-hidden ring-4 ring-white/80 shadow-2xl">
                <Image
                  src={photoSrc}
                  alt="Foto de Karine Canabrava"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 12rem, (max-width: 768px) 14rem, 16rem"
                />
              </div>
            </div>

            {/* Info + botões */}
            <div
              ref={infoRev.ref}
              className={[
                "text-center md:text-left",
                "transition-all duration-700 ease-out delay-150",
                infoRev.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6",
              ].join(" ")}
            >
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold">Karine Canabrava</h3>
                <p className="mt-1 text-white/80">Consultora Franqueada VD Negócios</p>
                <p className="mt-4 text-white/90">
                  Prefere um contato direto? <br className="sm:hidden" />
                  Fale comigo pelo WhatsApp ou Instagram.
                </p>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                {/* Botão fixo WhatsApp */}
                <a
                  href="https://wa.me/0000000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.03]"
                >
                  <FaWhatsapp className="text-lg" /> Falar no WhatsApp
                </a>

                {/* Botão Instagram */}
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center rounded-full bg-white text-purple-900 hover:bg-purple-50 px-6 py-3 font-semibold shadow-md transition-transform duration-300 hover:scale-[1.03]"
                >
                  <FaInstagram className="text-xl" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
