import React from "react";

const MainHeading = ({ text }) => {
  return (
    <h1 className=" text-center mb-3 text-4xl font-semibold md:font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
      {text}
    </h1>
  );
};
export { MainHeading };
