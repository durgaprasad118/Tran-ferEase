import { useNavigate } from "react-router-dom";
import { Rounded } from "./Rounded";
const UserList = ({ name, _id }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/send/${_id}`);
  }
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-4">
        <Rounded letter="X" />
        <h1 className="text-md  md:text-xl text-black font-semibold ml-2">
          {name}
        </h1>
      </div>

      <button
        onClick={handleClick}
        className={`text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      >
        Send Money
      </button>
    </div>
  );
};
export { UserList };
