import React, { useEffect } from "react";
import "app/App.css";
import { Header } from "features/appBar/Header/Header";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { LinearProgressVariants } from "utils";
import { GlobalError } from "reusableComponents/GlobalError";
import { authThunks } from "features/auth/auth.slice";
import { isLoadingSelector } from "app/app.selectors";
import { loginedSelector } from "features/auth/auth.selectors";
import { BasicModal } from "reusableModal/BasicModal";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(isLoadingSelector);
  const logined = useAppSelector(loginedSelector);
  const location = useLocation();
  const currentPath = sessionStorage.getItem("cardsPATH");
  //из sessionStorage получаем путь где мы до этого были, чтобы вернуться сюда же при перезагрузке страницы

  useEffect(() => {
    if (!logined) {
      dispatch(authThunks.authMe())
        .unwrap()
        .catch(() => {
          navigate("/sign-in");
        });
    }

    if (location.pathname !== "/profile") {
      if (logined && currentPath) {
        navigate(`${currentPath}`);
      } else {
        navigate("/packs");
      }
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
