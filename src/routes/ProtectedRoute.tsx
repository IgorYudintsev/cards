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
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  return <Navigate to="/sign-in" />;

  //return logined ? <Outlet /> : <Navigate to="sign-in" />;
  // if (!logined) {
  //   return <Navigate to="/sign-in" />;
  // }
  // return children;
};

// import { Navigate, Outlet } from 'react-router-dom'
//
// import { useAppSelector } from '../../hooks/reduxHooks'
// import { PATH } from '../../utils/path'
//
// export const PrivateRoutes = () => {
//   const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
//
//   return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
//}
