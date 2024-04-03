import { useRecoilValue } from "recoil";
import { tokenAtom } from "../store/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenAtom);
  useEffect(() => {
    if (token === null) {
      navigate("/signin", { replace: true });
    }
  }, [token, navigate]);
  return children;
};
export default ProtectedRoute;
