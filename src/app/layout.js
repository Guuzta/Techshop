import "../styles/globals.css";

export const metadata = {
  title: "Techshop",
  description: "Configuração inicial do projeto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="bg-gray-900">
      <body className="h-full">{children}</body>
    </html>
  );
}
