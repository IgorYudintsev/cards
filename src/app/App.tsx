import React, { useEffect } from "react";
import logo from "logo.svg";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Header } from "features/appBar/Header/Header";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authThunks.authMe());
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
