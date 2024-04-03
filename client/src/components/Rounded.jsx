const Rounded = ({ letter, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-200 cursor-pointer rounded-full md:h-8 md:w-8 h-6 w-6 font-medium flex items-center justify-center"
    >
      {letter}
    </div>
  );
};
export { Rounded };
