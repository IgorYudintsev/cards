import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { authThunks } from "features/auth/auth.slice";

export const Main = () => {
  //const authMe = useAppSelector((state) => state.auth.profile);
  //const xxxx = useSelector<RootState>((state) => state.auth.profile);
  //console.log(xxxx);

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   console.log("uihuihnujh");
  //   dispatch(authThunks.authMe());
  // }, []);

  return (
    <div>
      <header>
        <h1>LOGO</h1>
      </header>
      <div>
        {/* Место, где будет отображаться содержимое текущего маршрута */}
        <Outlet />
      </div>
    </div>
  );
};
