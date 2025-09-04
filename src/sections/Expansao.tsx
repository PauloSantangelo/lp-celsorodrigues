"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Hook de reveal on scroll */
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15, ...opts }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, visible };
}

export default function Expansao() {
  const head = useReveal<HTMLElement>();
  const franquiaTxt = useReveal<HTMLDivElement>();
  const franquiaImg = useReveal<HTMLDivElement>();
  const aceleraImg = useReveal<HTMLDivElement>();
  const aceleraTxt = useReveal<HTMLDivElement>();

  return (
    <section id="expansao" className="relative bg-slate-50" aria-label="Expansão e Acelera+">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Título da seção */}
        <header
          ref={head.ref}
          className={[
            "mb-10 md:mb-14 transition-all duration-700 ease-out motion-reduce:transition-none",
            head.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 leading-tight">
            Estruture sua Franquia, Acelere seu Negócio
          </h2>
          <p className="mt-3 text-lg text-slate-700 max-w-3xl">
            Soluções completas para transformar seu negócio em uma rede de sucesso ou para impulsionar o crescimento da sua PME.
          </p>
        </header>

        {/* Bloco Franquias (Texto + Imagem) */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Coluna de Texto */}
          <div
            ref={franquiaTxt.ref}
            className={[
              "order-1 transition-all duration-700 ease-out motion-reduce:transition-none",
              franquiaTxt.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
            ].join(" ")}
          >
            <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm h-full">
              {/* Removido o quadrado com a letra F */}
              <h3 className="text-2xl font-semibold text-slate-900">
                Formatação de Franquias
              </h3>
              <p className="mt-2 text-slate-700">
                Estruturamos seu negócio para se tornar uma rede de franquias sólida, com segurança jurídica e pronta para escalar.
              </p>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  Modelo de negócio e plano de negócio
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  ⁠Contrato, COF e Manuais Operacionais
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  ⁠Plano de expansão e Comercial
                </li>
              </ul>
              <a
                href="https://wa.me/5514982326732?text=Ol%C3%A1%20Ot%C3%A1vio%2C%20quero%20formatar%20minha%20Franquia!"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Falar com especialista
              </a>
            </div>
          </div>

          {/* Coluna de Imagem */}
          <div
            ref={franquiaImg.ref}
            className={[
              "relative order-2 aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5",
              "transition-all duration-700 ease-out delay-100 motion-reduce:transition-none",
              franquiaImg.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6",
            ].join(" ")}
          >
            <Image
              src="/franquia.png"
              alt="Diagrama do processo de formatação de franquias"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Linha divisória */}
        <div className="mt-10 md:mt-14 h-px w-full bg-slate-200" />

        {/* Bloco Acelera+ (Imagem + Texto) */}
        <div
          id="acelera"
          className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div
            ref={aceleraImg.ref}
            className={[
              "relative order-2 md:order-1 aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5",
              "transition-all duration-700 ease-out motion-reduce:transition-none",
              aceleraImg.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
            ].join(" ")}
          >
            <Image
              src="/acelera+.png"
              alt="Metodologia Acelera+ em ação"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div
            ref={aceleraTxt.ref}
            className={[
              "order-1 md:order-2 transition-all duration-700 ease-out delay-100 motion-reduce:transition-none",
              aceleraTxt.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6",
            ].join(" ")}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-700">
              Metodologia
            </span>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-purple-900">
              Acelera+ para PMEs
            </h3>
            <p className="mt-3 text-lg text-slate-700">
              Programa prático para <strong>pequenas e médias empresas</strong> que precisam crescer com <strong>previsibilidade e caixa</strong>. Unimos estratégia e execução em <strong>sprints quinzenais</strong>, com rituais e gestão por indicadores.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-purple-700 mr-2 mt-1">•</span>
                Diagnóstico 360° e plano de 90 dias com metas claras
              </li>
              <li className="flex items-start">
                <span className="text-purple-700 mr-2 mt-1">•</span>
                Funil de marketing e vendas orientado a resultados
              </li>
              <li className="flex items-start">
                <span className="text-purple-700 mr-2 mt-1">•</span>
                Padronização de operações, governança e KPIs
              </li>
            </ul>
            <a
              href="https://wa.me/5514982326732?text=Ol%C3%A1%20Ot%C3%A1vio%2C%20quero%20acelerar%20meu%20neg%C3%B3cio!"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.03]"
            >
              Fazer Diagnóstico Gratuito
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
