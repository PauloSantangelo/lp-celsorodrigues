"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardCheck,
  Layers,
  LineChart,
  Users,
  Globe2,
  Wrench,
} from "lucide-react";

/** Hook leve para revelar ao rolar */
function useReveal<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respeita prefers-reduced-motion
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

export default function Services() {
  const head = useReveal<HTMLDivElement>();
  const gridRef = useRef<HTMLDivElement | null>(null); // só pra referência, não precisa de visibilidade aqui

  const items = [
    {
      title: "Análise de Franqueabilidade",
      desc: "Primeiro passo: avaliamos se o seu modelo tem fit para franquias e o que precisa para escalar com segurança.",
      icon: ClipboardCheck,
    },
    {
      title: "Formatação de Franquias",
      desc: "COF, contratos, manuais, unit economics e governança para operar como rede com previsibilidade.",
      icon: Layers,
    },
    {
      title: "Expansão & Comercial",
      desc: "Funil de expansão, SDR/Closer, critérios de seleção e territorialização orientada por dados.",
      icon: Users,
    },
    {
      title: "Assessoria para Franquias",
      desc: "Gestão da rede: padronização, suporte de campo, rotinas, indicadores e melhoria contínua.",
      icon: Wrench,
    },
    {
      title: "Internacionalização",
      desc: "Europa: fit regulatório, adaptação de oferta, operação piloto e parceiros locais para reduzir riscos.",
      icon: Globe2,
    },
    {
      title: "Metodologia Acelera+",
      desc: "Sprints, rituais e metas integrando produto, marketing, vendas e operações para crescer com previsibilidade.",
      icon: LineChart,
    },
  ];

  return (
    <section id="servicos" className="bg-white" aria-label="Soluções da VD Negócios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Cabeçalho com reveal */}
        <div
          ref={head.ref}
          className={[
            "text-center max-w-3xl mx-auto",
            "transition-all duration-700 ease-out motion-reduce:transition-none",
            head.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-purple-900">
            Soluções para Escalar seu Negócio
          </h2>
          <p className="mt-4 text-lg text-slate-700 justify-around">
            Atuação ponta a ponta — do diagnóstico à expansão — com método próprio,
            personalização e foco em resultados.
          </p>
        </div>

        {/* Grid de cards com stagger */}
        <div
          ref={gridRef}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ title, desc, icon: Icon }, i) => (
            <Card
              key={title}
              Icon={Icon}
              title={title}
              desc={desc}
              delay={80 * i} // 0ms, 80ms, 160ms...
            />
          ))}
        </div>

        {/* CTA final com leve reveal também */}
        <FooterCta />
      </div>
    </section>
  );
}

/** Card com seu próprio hook de reveal + delay */
function Card({
  Icon,
  title,
  desc,
  delay = 0,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin: "0px 0px -8% 0px" });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md",
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-700">{desc}</p>
      <div className="mt-4">
        <a
          href="#contato"
          className="text-purple-800 font-medium hover:underline"
          aria-label={`Falar com especialista sobre ${title}`}
        >
          Falar com especialista →
        </a>
      </div>
    </div>
  );
}

function FooterCta() {
  const wrap = useReveal<HTMLDivElement>({ rootMargin: "0px 0px -6% 0px" });
  return (
    <div
      ref={wrap.ref}
      className={[
        "mt-12 flex justify-center",
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        wrap.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      ].join(" ")}
    >
      <a
        href="#contato"
        className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
      >
        Solicitar Diagnóstico
      </a>
    </div>
  );
}
