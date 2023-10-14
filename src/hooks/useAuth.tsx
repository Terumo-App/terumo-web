import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

const useAuth = () => {
  const context = useContext<any>(AuthContext as any);
  return context;
};

export default useAuth;