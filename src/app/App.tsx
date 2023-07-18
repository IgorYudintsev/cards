import React, { useEffect, useState } from "react";
import "app/App.css";
import { Header } from "features/appBar/Header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "app/hooks";

import LinearProgressVariants from "utils/LinearProgressVariants";
import { GlobalError } from "reusableComponents/GlobalError";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const cardsPack_id = sessionStorage.getItem("cardsPack_id");

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/sign-in");
    }
    if (cardsPack_id === null) {
      sessionStorage.setItem("cardsPack_id", "goToPacks");
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
