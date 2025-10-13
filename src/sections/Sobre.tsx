"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Hook reveal (igual ao seu) */
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12, ...opts }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, visible };
}

export default function Sobre() {
  const imgRev = useReveal<HTMLDivElement>();
  const titleRev = useReveal<HTMLHeadingElement>();
  const p1Rev = useReveal<HTMLParagraphElement>();
  const p2Rev = useReveal<HTMLParagraphElement>();
  const listRev = useReveal<HTMLUListElement>();
  const ctasRev = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="relative bg-white" aria-label="Sobre Karine Canabrava">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 md:items-center">
          {/* IMAGEM */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div
              ref={imgRev.ref}
              className={[
                "relative rounded-[22px] overflow-hidden shadow-2xl ring-4 ring-white",
                "w-full max-w-[200px] sm:max-w-[240px] md:max-w-[320px]",
                "transition-all duration-700 ease-out",
                imgRev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src="/karine2.webp" // sua imagem
                  alt="Karine Canabrava — VD Negócios Londrina"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 320px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* TEXTO */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2
              ref={titleRev.ref}
              className={[
                "text-3xl md:text-4xl font-bold leading-tight text-purple-900",
                "transition-all duration-700 ease-out",
                titleRev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              Conheça Karine Canabrava
            </h2>

            {/* Conteúdo */}
            <div className="mx-auto md:mx-0 max-w-[65ch] leading-relaxed tracking-normal">
              <p
                ref={p1Rev.ref}
                className={[
                  "mt-4 text-lg text-slate-700",
                  "text-justify hyphens-auto",
                  "transition-all duration-700 ease-out delay-100",
                  p1Rev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
              >
                <strong>Karine Canabrava</strong> é empresária, sócia de 4 empresas em segmentos
                distintos que faturam milhões. Atua como consultora e conselheira empresarial que
                direciona empresários a transformar negócios em empresas lucrativas e sustentáveis
                que crescem com organização.
              </p>

              <p
                ref={p2Rev.ref}
                className={[
                  "mt-3 text-lg text-slate-700",
                  "text-justify hyphens-auto",
                  "transition-all duration-700 ease-out delay-150",
                  p2Rev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
              >
                Com método, dados e decisões estratégicas, já ajudou centenas de empresas a
                conquistarem clareza, organização e autonomia. Criadora do método{" "}
                <strong>Empresa nos Trilhos</strong>, desenvolveu soluções práticas que tiram
                empresários do improviso e colocam o dono no comando — com lucro no bolso e visão de
                futuro.
              </p>

              <ul
                ref={listRev.ref}
                className={[
                  "mt-6 space-y-3 text-slate-700",
                  "transition-all duration-700 ease-out delay-200",
                  listRev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
              >
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span className="text-justify">
                    Foco em empresas <strong>lucrativas, sustentáveis e organizadas</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span className="text-justify">
                    Decisões com <strong>método, dados e estratégia</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span className="text-justify">
                    Método <strong>Empresa nos Trilhos</strong> — do improviso à gestão com lucro
                    e visão de futuro
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span className="text-justify">
                    Experiência aplicada em <strong>centenas de empresas</strong> de diferentes
                    segmentos
                  </span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div
              ref={ctasRev.ref}
              className={[
                "mt-8 flex flex-wrap gap-3 justify-center md:justify-start",
                "transition-all duration-700 ease-out delay-300",
                ctasRev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <a
                href="#contato"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03]"
                aria-label="Falar com a equipe pelo WhatsApp"
              >
                Falar no WhatsApp
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center rounded-full border border-purple-200 bg-white px-7 py-3 text-base font-semibold text-purple-800 hover:bg-purple-50 transition"
                aria-label="Conhecer soluções da VD Negócios"
              >
                Conhecer soluções
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
