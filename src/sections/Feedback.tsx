"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/** Hook para revelar ao rolar */
function useReveal<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px", ...opts }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, visible };
}

/** Extrai ID do YouTube (aceita links com/sem protocolo) */
function parseYouTube(url: string): string | null {
  try {
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    const u = new URL(normalized);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname;

    if (host === "youtu.be") return path.split("/")[1] || null;
    if (host.endsWith("youtube.com") && path.startsWith("/shorts/"))
      return path.split("/")[2] || null;
    if (host.endsWith("youtube.com") && path === "/watch")
      return u.searchParams.get("v");

    const parts = path.split("/").filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  } catch {}
  return null;
}

type VideoItem = {
  url: string;
  author?: string;
  caption?: string;
};

const VIDEOS: VideoItem[] = [
  // Novo vídeo pedido (shorts 9:16) — Leni Muraki
  {
    url: "https://www.youtube.com/shorts/AvVZw0jhSic",
    author: "Leni Muraki • Flor do Sol",
    caption: "Depoimento — Cliente VD Negócios",
  },
  // Já existentes
  {
    url: "https://www.youtube.com/watch?v=9MHjlXD46ZU",
    author: "Clínica Pró-Mulher | Clientes VD Negócios",
    caption: "Depoimento",
  },
  {
    url: "youtube.com/shorts/R65cQSr4FIQ?feature=share",
    author: "Clientes VD Negócios",
    caption: "Depoimento - Formatação de franquia",
  },
  {
    url: "https://www.youtube.com/shorts/2eB98enwNEc",
    author: "Michelli Lopes",
    caption: "Depoimento – resultados com a VD",
  },
  {
    url: "https://www.youtube.com/watch?v=lKfPxjJqZ18",
    author: "Clube do Alicate",
    caption: "Formatação de franquia na prática",
  },
  {
    url: "https://www.youtube.com/watch?v=za3vpc0mGjw",
    author: "Eduardo Torres",
    caption: "Depoimento – governança e escala",
  },
  {
    url: "https://www.youtube.com/watch?v=BxdoW154kvs&t=77s",
    author: "Lucas",
    caption: "Depoimento – Acelera+ em ação",
  },
];

export default function Feedback() {
  const head = useReveal<HTMLDivElement>();
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const step = rail.clientWidth * 0.9;
    rail.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section id="feedbacks" className="relative bg-[#faf7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Cabeçalho */}
        <div
          ref={head.ref}
          className={[
            "text-center max-w-3xl mx-auto",
            "transition-all duration-700 ease-out",
            head.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
            Histórias que impulsionam resultados
          </h2>
          <p className="mt-3 text-lg text-slate-700 text-center">
            Depoimentos reais de quem aplicou nossa metodologia, formatou sua rede
            com segurança e abriu caminhos para novos mercados.
          </p>
        </div>

        {/* Trilho dos vídeos */}
        <div className="relative mt-10 max-w-6xl mx-auto">
          {/* Setas (desktop) */}
          <button
            onClick={() => scrollByAmount("left")}
            aria-label="Anterior"
            className="hidden lg:flex items-center justify-center absolute -left-6 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 text-purple-900 shadow-md hover:bg-white transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            aria-label="Próximo"
            className="hidden lg:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 text-purple-900 shadow-md hover:bg-white transition"
          >
            <FaChevronRight />
          </button>

          {/* Rail com snap — 1 no mobile, 2 no desktop */}
          <div
            ref={railRef}
            className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {VIDEOS.map((v, i) => (
              <Slide key={i} item={v} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03]"
          >
            Quero escalar meu negócio
          </a>
        </div>
      </div>
    </section>
  );
}

/** Slide — 1 no mobile e 2 no desktop */
function Slide({ item }: { item: VideoItem }) {
  const rev = useReveal<HTMLDivElement>();
  const id = parseYouTube(item.url);
  if (!id) return null;

  // Detecta Shorts (9:16). Para watch/normal usa 16:9.
  const isShort = item.url.includes("/shorts/");

  return (
    <div
      ref={rev.ref}
      className={[
        "snap-center shrink-0",
        "min-w-[90%] sm:min-w-[75%] lg:min-w-[48%]",
        "transition-all duration-700 ease-out",
        rev.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      <div className="relative bg-white rounded-xl border border-purple-100 shadow-md p-3 hover:shadow-lg transition-shadow">
        {/* Wrapper do vídeo */}
        <div className={isShort ? "mx-auto w-[220px]" : "w-full"}>
          <div className={isShort ? "relative aspect-[9/16] h-[320px]" : "relative aspect-video w-full"}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
              title={item.caption || "Depoimento de cliente"}
              className="absolute inset-0 h-full w-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {(item.author || item.caption) && (
          <div className="pt-3 text-center">
            {item.author && <p className="text-sm font-semibold text-purple-900">{item.author}</p>}
            {item.caption && <p className="text-sm text-slate-600">{item.caption}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
