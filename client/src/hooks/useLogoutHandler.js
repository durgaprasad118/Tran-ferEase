import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/atoms";
const useLogOut = () => {
  const setToken = useSetRecoilState(tokenAtom);
  const logOutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return logOutHandler;
};

export { useLogOut };
