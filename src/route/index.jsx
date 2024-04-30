import { Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import AuthGuard from "../guards/AuthGuard";

/* eslint-disable react/display-name */

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <div
          style={{
            top: "50%",
            transform: "translate(0, -50%)",
            zIndex: 9999,
            position: "absolute",
            left: "50%",
          }}
        >
          <LoadingScreen
            sx={{
              ...(!isDashboard && {
                top: 0,
                left: 0,
                width: 1,
                zIndex: 9999,
                position: "fixed",
              }),
            }}
          />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // {
    //   path: "auth",
    //   children: [
    //     {
    //       path: "login",
    //       element: (
    //         <GuestGuard>
    //           <Login />
    //         </GuestGuard>
    //       ),
    //     },
    //     {
    //       path: "register",
    //       element: (
    //         <GuestGuard>
    //           <Register />
    //         </GuestGuard>
    //       ),
    //     },
    //     { path: "login-unprotected", element: <Login /> },
    //     { path: "register-unprotected", element: <Register /> },
    //     { path: "reset-password", element: <ResetPassword /> },
    //     { path: "verify", element: <VerifyCode /> },
    //   ],
    // },
    // Dashboard Routes
    {
      path: "/",
      element: <AuthGuard>{/* <DashboardLayout /> */}</AuthGuard>,
      children: [],
    },
  ]);
}
