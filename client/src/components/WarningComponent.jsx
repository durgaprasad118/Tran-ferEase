import { Link } from "react-router-dom";

const WarningComponent = ({ to, buttonText, label }) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <h1 className=" text-gray-700 text-start">
        {label}
        <Link className="underline text-gray-500" to={to}>
          {buttonText}
        </Link>
      </h1>
    </div>
  );
};

export { WarningComponent };
