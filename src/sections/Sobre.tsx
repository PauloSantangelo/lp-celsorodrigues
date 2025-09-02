"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Hook reveal (igual) */
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
    <section id="sobre" className="relative bg-white" aria-label="Sobre o consultor">
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
                  src="/otavio1.webp"
                  alt="Otavio Silva — Consultor VD Negócios Londrina"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 320px"
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
              Conheça Otavio Silva
            </h2>

            {/* wrapper para padronizar largura/line-height dos textos */}
            <div className="mx-auto md:mx-0 max-w-[65ch] leading-relaxed tracking-normal">
              <p
                ref={p1Rev.ref}
                className={[
                  "mt-4 text-lg text-slate-700",
                  "text-justify hyphens-auto", // <-- AJUSTADO AQUI
                  "transition-all duration-700 ease-out delay-100",
                  p1Rev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
              >
                <strong>Otavio Silva</strong> é empreendedor, consultor e mentor, especialista em{" "}
                <strong>expansão</strong> e <strong>franchising</strong>, com atuação em marcas
                nacionais e internacionais.
              </p>

              <p
                ref={p2Rev.ref}
                className={[
                  "mt-3 text-lg text-slate-700",
                  "text-justify hyphens-auto", // <-- AJUSTADO AQUI
                  "transition-all duration-700 ease-out delay-150",
                  p2Rev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
              >
                Na <strong>VD Negócios Londrina</strong>, lidera a unidade local com foco em apoiar
                empresários na construção de{" "}
                <strong>ativos mais lucrativos, organizados e preparados para crescer</strong>,
                unindo estratégia, gestão e inovação.
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
                  <span className="text-justify"> {/* <-- AJUSTADO AQUI */}
                    Especialista em formatação, expansão e gestão de redes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span className="text-justify"> {/* <-- AJUSTADO AQUI */}
                    Experiência com marcas no Brasil e no exterior
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span className="text-justify"> {/* <-- AJUSTADO AQUI */}
                    Foco em resultados: governança, previsibilidade e escala
                  </span>
                </li>
              </ul>
            </div>

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
                aria-label="Falar com Otavio no contato"
              >
                Vamos conversar
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