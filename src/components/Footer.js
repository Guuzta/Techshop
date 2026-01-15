"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 text-gray-300 py-6 border-t border-gray-300/10">
      <div className="text-center">
        <span className="block text-center text-sm tetx-0">
          ©2025{" "}
          <a
            href="https://github.com/Guuzta"
            target="_blank"
            className="text-indigo-500 hover:text-indigo-400 hover:cursor-pointer hover:underline"
          >
            Gustavo Bodziak
          </a>
          , Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
