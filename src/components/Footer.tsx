export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm mb-2">
          &copy; {currentYear} VD Negócios. Todos os direitos reservados.
        </p>
        <p className="text-xs text-gray-400">
          Página desenvolvida por <span className="font-bold">Agência VIBE</span>
        </p>
      </div>
    </footer>
  );
};