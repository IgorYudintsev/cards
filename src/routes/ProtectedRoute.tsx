import { Navigate } from "react-router-dom";
import { ReactComponentElement } from "react";
import { useAppSelector } from "app/hooks";

type PropsType = {
  children: ReactComponentElement<any>;
};

export const ProtectedRoute: React.FC<PropsType> = ({ children }) => {
  const logined = useAppSelector((state) => state.auth.profile);
  if (!logined) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};
