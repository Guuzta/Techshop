import Image from "next/image";

export default function ProductCard({ isAvailable, name, description, price }) {
  return (
    <div className="border-2 border-gray-300/10 max-w-xs mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
      <div className="relative">
        <Image
          className="w-full"
          width={500}
          height={500}
          src="/notebook.png"
          alt="Product Image"
        />
        <div
          className={`absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium ${isAvailable ? "" : "bg-red-500"}`}
        >
          {isAvailable ? "DISPONÍVEL" : "INDISPONÍVEL"}
        </div>
      </div>
      <div className="p-4  bg-gray-800/50">
        <h3 className="text-lg font-medium mb-2 text-indigo-500">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 text-white">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-white">{price}</span>
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
              isAvailable
                ? ""
                : "opacity-50 bg-gray-500 cursor-not-allowed hover:bg-gray-500"
            }`}
          >
            Comprar agora
          </button>
        </div>
      </div>
    </div>
  );
}
