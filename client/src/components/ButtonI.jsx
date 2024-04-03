const ButtonI = ({ children, stretch, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white  bg-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${stretch ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
};
export { ButtonI };
