import React, { useEffect } from "react";
import logo from "logo.svg";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Header } from "features/appBar/Header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

import LinearProgressVariants from "utils/LinearProgressVariants";
import { GlobalError } from "reusableComponents/GlobalError";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useAppSelector((state) => state.app.isLoading);

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/sign-in");
    }
  }, []);

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
