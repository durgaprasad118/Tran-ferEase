import { useRecoilState } from "recoil";
import { filterAtom } from "../store/atoms";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchInput = () => {
  const [fil, setFil] = useRecoilState(filterAtom);
  const [val, setVal] = useState("");
  const debouncedValue = useDebounce(val);
  useEffect(() => {
    setFil(debouncedValue.toLowerCase());
  }, [debouncedValue, setFil]);
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-md  md:text-2xl text-black font-semibold ml-2 ">
        Users
      </h1>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className=" text-lg border-2 md:p-2.5 p-2 focus:ring focus:ring-offset-2 focus:outline-none focus:shadow-sm focus:border-none  border-gray-300 rounded-lg w-full"
        placeholder="Search Users ..."
        type="text"
      />
    </div>
  );
};

export { SearchInput };
