import React from "react";

const Button = ({ children, type, stretch }) => {
  return (
    <button
      type={type}
      className={`text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${stretch ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
};
export { Button };
