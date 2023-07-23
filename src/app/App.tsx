import React, { useEffect, useState } from "react";
import "app/App.css";
import { Header } from "features/appBar/Header/Header";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

import LinearProgressVariants from "utils/LinearProgressVariants";
import { GlobalError } from "reusableComponents/GlobalError";
import { authThunks } from "features/auth/auth.slice";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const logined = useAppSelector((state) => state.auth.profile);
  const currentPath = sessionStorage.getItem("cardsPATH"); //из sessionStorage получаем путь где мы до этого были, чтобы вернуться сюда же при перезагрузке страницы

  useEffect(() => {
    if (!logined) {
      dispatch(authThunks.authMe())
        .unwrap()
        .catch(() => {
          navigate("/sign-in");
        });
    }
    if (logined) {
      navigate(`${currentPath}`);
    }
  }, [logined]);

  return (
    <div className="App">
      <Header disabled={false} />
      {isLoading && <LinearProgressVariants />}
      <div>
        <Outlet />
      </div>
      <GlobalError />
    </div>
  );
}

export default App;
