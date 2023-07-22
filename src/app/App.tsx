import React, { useEffect, useState } from "react";
import "app/App.css";
import { Header } from "features/appBar/Header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

import LinearProgressVariants from "utils/LinearProgressVariants";
import { GlobalError } from "reusableComponents/GlobalError";
import { authThunks } from "features/auth/auth.slice";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const cardsPack_id = sessionStorage.getItem("cardsPack_id");
  const logined = useAppSelector((state) => state.auth.profile);
  const currentPath = sessionStorage.getItem("cardsPATH"); //из sessionStorage получаем путь где мы до этого были, чтобы вернуться сюда же при перезагрузке страницы

  useEffect(() => {
    if (!logined) {
      dispatch(authThunks.authMe());
    }
    if (logined) {
      navigate(`${currentPath}`);
    }
  }, [logined]);

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate("/sign-in");
  //   }
  //   if (cardsPack_id === null) {
  //     sessionStorage.setItem("cardsPack_id", "goToPacks");
  //   }
  // }, []);

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

//-------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import "app/App.css";
// import { Header } from "features/appBar/Header/Header";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useAppSelector } from "app/hooks";
//
// import LinearProgressVariants from "utils/LinearProgressVariants";
// import { GlobalError } from "reusableComponents/GlobalError";
//
// function App() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const isLoading = useAppSelector((state) => state.app.isLoading);
//     const cardsPack_id = sessionStorage.getItem("cardsPack_id");
//
//     // useEffect(() => {
//     //   if (location.pathname === "/") {
//     //     navigate("/sign-in");
//     //   }
//     //   if (cardsPack_id === null) {
//     //     sessionStorage.setItem("cardsPack_id", "goToPacks");
//     //   }
//     // }, []);
//
//     return (
//         <div className="App">
//             <Header disabled={false} />
//             {isLoading && <LinearProgressVariants />}
//             <div>
//                 <Outlet />
//             </div>
//             <GlobalError />
//         </div>
//     );
// }
//
// export default App;
