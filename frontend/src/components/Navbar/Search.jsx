import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [input, setInput] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios
        .get("http://localhost:8000/api/productos")
        .then((response) => response.data);

      const filteredProducts = response.filter((product) =>
        product.nombre.toLowerCase().includes(input.toLowerCase())
      );

      console.log(filteredProducts);
    };

    getProducts();
  }, [input]);

  return (
    <div className="relative flex flex-col justify-center overflow-hidden p-6 sm:py-12">
      <div /*class="relative px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10"*/
      >
        <div className="mx-auto max-w-md">
          <form className="relative mx-auto w-max">
            <input
              type="search"
              onChange={(e) => setInput(e.target.value)}
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:ring focus:pl-16 focus:pr-4"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-8 w-12 border-transparent px-3.5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>
      </div>
    </div>
  );
}
