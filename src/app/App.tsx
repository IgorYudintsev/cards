import React, { useEffect } from "react";
import logo from "logo.svg";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Header } from "features/appBar/Header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const email = useAppSelector((state) => state.auth.email);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/sign-in");
    }
    // navigate("/sign-in");
  }, []);

  return (
    <div className="App">
      <Header disabled={false} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
