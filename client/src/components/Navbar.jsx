import { useRecoilValueLoadable } from "recoil";
import { Rounded } from "./Rounded";
import { userdetailsAtom } from "../store/atoms";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    state,
    contents: { user },
  } = useRecoilValueLoadable(userdetailsAtom);
  let name;
  if (state === "loading") {
    name = "";
  }
  if (state == "hasValue") {
    name = user.firstName + " " + user.lastName;
  }
  return (
    <div className=" shadow-sm flex mb-8 md:px-20 px-6 md:h-20 h-12 border-b-2 border-b-gray-300 items-center justify-between">
      <div
        onClick={() => {
          navigate("/dash");
        }}
        className="text-md cursor-pointer  md:text-2xl text-lg leading-snug tracking-tight  text-black font-semibold "
      >
        {" Tran$ferEase "}
      </div>
      <div className="flex items-center md:gap-4 gap-2">
        <h1 className="text-md md:text-xl text-black font-medium">
          Hello, {name}
        </h1>
        <Rounded
          onClick={() => {
            navigate("/profile");
          }}
          letter={name ? name[0] : "x"}
        />
      </div>
    </div>
  );
};

export { Navbar };
