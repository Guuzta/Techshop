import Image from "next/image";

export default function ProductCard({
  isAvailable,
  name,
  description,
  price,
  imageUrl,
}) {
  return (
    <div className="max-w-xs bg-gray-800 border-2 border-gray-300/10 lg:max-w-xs mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
      <div className="relative">
        <Image
          width={300}
          height={200}
          style={{ height: "200px" }}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
          alt="Product Image"
          unoptimized
        />
        <div
          className={`absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium ${isAvailable ? "" : "bg-red-500"}`}
        >
          {isAvailable ? "DISPONÍVEL" : "INDISPONÍVEL"}
        </div>
      </div>
      <div className="p-4 bg-gray-800/50 ">
        <h3 className="text-lg font-medium mb-2 text-indigo-500">{name}</h3>
        <p className="break-words min-h-12 text-gray-600 text-sm text-white">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between">
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
