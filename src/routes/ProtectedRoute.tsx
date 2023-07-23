import { Navigate } from "react-router-dom";
import { ReactComponentElement } from "react";
import { useAppSelector } from "app/hooks";
import * as PATH from "path";
import { Outlet } from "@mui/icons-material";

type PropsType = {
  children: ReactComponentElement<any>;
};

export const ProtectedRoute: React.FC<PropsType> = ({ children }) => {
  const logined = useAppSelector((state) => state.auth.profile);

  return logined ? children : <Navigate to="/sign-in" />;
};
