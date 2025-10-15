"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Hook simples de “reveal on scroll” */
function useReveal<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1, ...opts }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, visible };
}

export const Hero = () => {
  const title = useReveal<HTMLHeadingElement>();
  const paragraph = useReveal<HTMLParagraphElement>();
  const cta = useReveal<HTMLDivElement>();
  const photo = useReveal<HTMLDivElement>();

  return (
    <section
      id="topo"
      className="relative w-full bg-gradient-to-b from-purple-700 to-purple-800 text-white overflow-hidden"
      aria-label="Seção principal: VD Negócios"
    >
      {/* efeitos de fundo */}
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-purple-500 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-600 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 md:gap-12">
          {/* Texto */}
          <div className="w-full md:max-w-2xl text-center md:text-left">
            <h1
              ref={title.ref}
              className={[
                "font-bold leading-[1.1] tracking-[-0.02em]",
                "text-4xl md:text-5xl lg:text-[52px] text-balance",
                "transition-all duration-700 ease-out",
                title.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              Transforme seu negócio
            </h1>

            <p
              ref={paragraph.ref}
              className={[
                "mt-5 text-base sm:text-lg md:text-xl font-normal text-white/90",
                "transition-all duration-700 ease-out delay-100",
                "text-justify",
                paragraph.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              Na <strong>VD Negócios</strong>, apoiamos empresas a crescer com segurança e
              previsibilidade. Nossa metodologia <strong>Acelera+</strong> impulsiona pequenas e
              médias empresas, enquanto a <strong>formatação de franquias</strong> garante uma
              rede estruturada e lucrativa. Para quem busca novos mercados, conduzimos a{" "}
              <strong>internacionalização para a Europa</strong>, unindo estratégia, gestão e
              inovação em cada etapa da jornada.
            </p>

            <div
              ref={cta.ref}
              className={[
                "mt-8 flex items-center justify-center md:justify-start gap-3",
                "transition-all duration-700 ease-out delay-200",
                cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <a
                href="https://wa.me/0000000000000"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg transition-transform duration-300 px-7 py-3 text-base md:px-10 md:py-4 md:text-lg hover:scale-[1.03]"
              >
                Falar com especialista
              </a>
            </div>
          </div>

          {/* Imagem com moldura + shapes */}
          <div
            ref={photo.ref}
            className={[
              "relative w-[15rem] h-[19rem] sm:w-[18rem] sm:h-[22rem] md:w-[22rem] md:h-[26rem] lg:w-[24rem] lg:h-[28rem] flex-shrink-0",
              "transition-all duration-700 ease-out",
              photo.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <div className="absolute -inset-4 rounded-[48px] bg-purple-900/30 blur-2xl" />
            <div className="relative h-full w-full rounded-[42px] shadow-2xl">
              <div className="absolute -inset-[6px] rounded-[48px] bg-white/60" />
              <div className="relative h-full w-full overflow-hidden rounded-[42px] ring-1 ring-white/40">
                <Image
                  src="/hero.jpeg"
                  alt="Consultoria VD Negócios"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 18rem, (max-width: 1024px) 22rem, 24rem"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent" />
              </div>
            </div>

            {/* shapes decorativos */}
            <svg
              className="pointer-events-none absolute -left-6 top-10 w-16 h-16 text-white/70"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="6" />
            </svg>
            <svg
              className="pointer-events-none absolute -right-5 md:-right-8 top-6 w-12 h-12 text-white/70"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="6" />
            </svg>

            {/* removido o selo "VD Negócios" */}

            <div className="pointer-events-none absolute -bottom-6 -left-6 rotate-12">
              <div className="h-1 w-24 bg-white/70 mb-1" />
              <div className="h-1 w-20 bg-white/60 mb-1" />
              <div className="h-1 w-28 bg-white/70 mb-1" />
              <div className="h-1 w-16 bg-white/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
