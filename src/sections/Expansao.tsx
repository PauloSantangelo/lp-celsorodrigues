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
  const card1 = useReveal<HTMLDivElement>();
  const card2 = useReveal<HTMLDivElement>();
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
            Formatação, Expansão e Escala
          </h2>
          <p className="mt-3 text-lg text-slate-700 max-w-3xl">
            Dois caminhos para crescer com segurança — e um método para acelerar os resultados.
          </p>
        </header>

        {/* Blocos superiores (2 colunas) */}
        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="hidden md:block absolute left-1/2 top-3 bottom-3 w-px bg-slate-200" />

          {/* Card 1 — Formatação */}
          <div
            ref={card1.ref}
            className={[
              "relative transition-all duration-700 ease-out motion-reduce:transition-none",
              card1.visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95",
            ].join(" ")}
          >
            <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white text-lg font-bold">
                F
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                Formatação de Franquias
              </h3>
              <p className="mt-2 text-slate-700">
                Formatação completa para operar como rede, com segurança jurídica e
                previsibilidade financeira — pronta para expansão.
              </p>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>• COF, Contrato de Franquia e Manuais Operacionais</li>
                <li>• Modelagem financeira (unit economics, payback, CAPEX/OPEX)</li>
                <li>• Territórios, critérios de seleção e playbook de expansão</li>
              </ul>
              <a
                href="#contato"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold shadow-lg transition"
              >
                Ver proposta de formatação
              </a>
            </div>
          </div>

          {/* Card 2 — Internacionalização */}
          <div
            ref={card2.ref}
            className={[
              "relative transition-all duration-700 ease-out delay-150 motion-reduce:transition-none",
              card2.visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95",
            ].join(" ")}
          >
            <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-700 text-white text-lg font-bold">
                I
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                Internacionalização
              </h3>
              <p className="mt-2 text-slate-700">
                Expansão para a Europa com estudo regulatório, adaptação do modelo
                e operação piloto com parceiros locais para reduzir riscos.
              </p>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>• Fit regulatório, jurídico e benchmarking por país</li>
                <li>• Go-to-market, canais, territórios e proposta de valor</li>
                <li>• Implantação piloto e suporte local à operação</li>
              </ul>
              <a
                href="#contato"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 font-semibold shadow-lg transition"
              >
                Planejar a expansão internacional
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="mt-10 md:mt-14 h-px w-full bg-slate-200" />

        {/* Bloco inferior — Acelera+ */}
        <div
          id="acelera"
          className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div
            ref={aceleraImg.ref}
            className={[
              "relative order-2 md:order-1 aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5",
              "transition-all duration-700 ease-out delay-100 motion-reduce:transition-none",
              aceleraImg.visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-6",
            ].join(" ")}
          >
            <Image
              src="/acelera+.png"
              alt="Metodologia Acelera+ em ação"
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent" />
          </div>

          <div
            ref={aceleraTxt.ref}
            className={[
              "order-1 md:order-2 transition-all duration-700 ease-out delay-200 motion-reduce:transition-none",
              aceleraTxt.visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6",
            ].join(" ")}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-700">
              Metodologia
            </span>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-purple-900">
              Acelera+ para PMEs
            </h3>
            <p className="mt-3 text-lg text-slate-700">
              Programa prático para <strong>pequenas e médias empresas</strong> que precisam
              crescer com <strong>previsibilidade e caixa</strong>. Unimos estratégia e execução
              em <strong>sprints quinzenais</strong>, com priorização de oportunidades, rituais
              semanais e gestão por indicadores — conduzido pelo consultor VD junto ao seu time.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>• Diagnóstico 360° e plano de 90 dias com metas claras</li>
              <li>• Funil de marketing e vendas orientado a resultados</li>
              <li>• Padronização de operações, governança e KPIs em dashboard</li>
            </ul>
            <a
              href="#contato"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
            >
              Conhecer o Acelera+
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
