// src/app/page.tsx
import { Header } from "@/components/Header";
import { Hero } from "@/sections/Hero";
import Services from "@/sections/Services";
import Sobre from "@/sections/Sobre";
import Feedback from "@/sections/Feedback";
import Expansao from "@/sections/Expansao";
import Contato from "@/sections/Contato";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Sobre />
      <Feedback />
      <Expansao />
      <Contato
        whatsappLink="https://wa.me/55XXXXXXXXXXX?text=Quero%20falar%20com%20a%20VD"
        instagramLink="https://instagram.com/seuusuario"
        photoSrc="/otavio1.webp"
      />
      <Footer />
    </main>
  );
}
