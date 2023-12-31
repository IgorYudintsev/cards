import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "components/404/ErrorPage";
import { SignIn } from "components/SignIn/SignIn";
import { SignUp } from "components/SignUp/SignUp";
import { CheckEmail } from "components/CheckEmail/CheckEmail";
import { SetNewPassword } from "components/SetNewPassword/SetNewPassword";
import { ForgotPassword } from "components/ForgotPassword/ForgotPassword";
import { Profile } from "components/Profile/Profile";
import { Packs } from "components/Packs/Packs";
import { Cards } from "components/Cards/Cards";
import { Learn } from "components/Learn/Learn";
import App from "app/App";
import { ProtectedRoute } from "routes/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "sign-up",
        element: <SignUp />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "check-email",
        element: <CheckEmail />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "set-new-password/:token",
        element: <SetNewPassword />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),

        // ErrorBoundary: ErrorPage,
      },

      {
        path: "packs",
        element: (
          <ProtectedRoute>
            <Packs />
          </ProtectedRoute>
        ),
        // ErrorBoundary: ErrorPage,
      },

      {
        path: "cards/:userID/:id",
        element: (
          <ProtectedRoute>
            <Cards />
          </ProtectedRoute>
        ),

        // ErrorBoundary: ErrorPage,
      },

      {
        path: "learn/:cardId",
        element: (
          <ProtectedRoute>
            <Learn />
          </ProtectedRoute>
        ),
        // ErrorBoundary: ErrorPage,
      },
    ],
  },
]);
