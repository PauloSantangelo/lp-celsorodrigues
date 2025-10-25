"use client";

import { useEffect, useState } from "react";

export default function FormularioFranquia() {
  const [status, setStatus] = useState<"idle" | "enviando" | "sucesso" | "erro">("idle");
  const [utms, setUtms] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  // Coleta UTMs da URL para enviar junto ao RD Station
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    });
  }, []);

  // Simula feedback visual após envio
  useEffect(() => {
    if (status === "enviando") {
      const t = setTimeout(() => setStatus("sucesso"), 1500);
      return () => clearTimeout(t);
    }
  }, [status]);

  return (
    <div
      id="formulario"
      className="w-full max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200"
    >
      <form
        className="space-y-5"
        action="https://www.rdstation.com.br/api/1.3/conversions"
        method="POST"
        onSubmit={() => setStatus("enviando")}
      >
        {/* TOKEN DO RD STATION (substituir abaixo pelo seu real) */}
        <input
          type="hidden"
          name="token_rdstation"
          value="SEU_TOKEN_RD_HTML_AQUI"
        />
        <input
          type="hidden"
          name="identificador"
          value="formulario_vd_negocios"
        />

        {/* UTMs opcionais */}
        <input type="hidden" name="utm_source" value={utms.utm_source} />
        <input type="hidden" name="utm_medium" value={utms.utm_medium} />
        <input type="hidden" name="utm_campaign" value={utms.utm_campaign} />
        <input type="hidden" name="utm_term" value={utms.utm_term} />
        <input type="hidden" name="utm_content" value={utms.utm_content} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              placeholder="Digite seu nome"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-orange-500 placeholder:text-slate-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Email Profissional
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="seuemail@empresa.com"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-orange-500 placeholder:text-slate-600"
            />
          </div>

          <div>
            <label
              htmlFor="telefone"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Telefone / WhatsApp
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              required
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-orange-500 placeholder:text-slate-600"
            />
          </div>

          <div>
            <label
              htmlFor="empresa"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Nome da Empresa
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              required
              placeholder="Ex: VD Negócios"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-orange-500 placeholder:text-slate-600"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="cf_segmento"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Segmento de Atuação
          </label>
          <input
            type="text"
            id="cf_segmento"
            name="cf_segmento"
            required
            placeholder="Ex: Alimentação, moda, serviços, etc."
            className="w-full px-4 py-2.5 border border-slate-300 rounded-md shadow-sm 
                       focus:ring-2 focus:ring-orange-500 placeholder:text-slate-600"
          />
        </div>

        <div className="text-center pt-3">
          <button
            type="submit"
            disabled={status === "enviando"}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-full 
                       bg-orange-500 hover:bg-orange-600 px-10 py-3 text-base font-semibold text-white 
                       shadow-lg transition-transform duration-300 hover:scale-[1.03] disabled:bg-slate-400"
          >
            {status === "enviando" ? "Enviando Análise..." : "Fale com um Especialista"}
          </button>
        </div>
      </form>

      {status === "sucesso" && (
        <p className="text-center mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          Dados enviados com sucesso! Em breve entraremos em contato.
        </p>
      )}
      {status === "erro" && (
        <p className="text-center mt-4 p-3 bg-red-100 text-red-800 rounded-md">
          Ocorreu um erro. Por favor, tente novamente.
        </p>
      )}
    </div>
  );
}
