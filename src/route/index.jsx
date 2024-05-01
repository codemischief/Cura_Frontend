import { Suspense, lazy } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { PATH_DASHBOARD } from "./path";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import AuthGuard from "../guards/AuthGuard.jsx";
import Dashboard from "../Screens/Dashboard/Dashboard.jsx";

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
          {/* <LoadingScreen
            sx={{
              ...(!isDashboard && {
                top: 0,
                left: 0,
                width: 1,
                zIndex: 9999,
                position: "fixed",
              }),
            }}
          /> */}
          ...loading
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

// Components

// 404 -
const NotFound = Loadable(
  lazy(() => import("../Screens/NotFound/notFound.jsx"))
);

// ---admin
const ManageUser = Loadable(
  lazy(() => import("../Screens/Manage/ManageUser/ManageUser"))
);
const ManageEmployees = Loadable(
  lazy(() => import("../Screens/Manage/ManageEmployee/ManageEmployees"))
);
const ManageBuilder = Loadable(
  lazy(() => import("../Screens/Manage/ManageEmployee/ManageEmployees"))
);
const ManageProjectInfo = Loadable(
  lazy(() => import("../Screens/Manage/ManageProjectInfo/ManageProjectInfo"))
);
const ManageOrder = Loadable(
  lazy(() => import("../Screens/Manage/ManageOrder/ManageOrder"))
);
const Country = Loadable(lazy(() => import("../Screens/Admin/Country")));
const State = Loadable(lazy(() => import("../Screens/Admin/State")));
const Locality = Loadable(lazy(() => import("../Screens/Admin/Locality")));
const LOB = Loadable(lazy(() => import("../Screens/Admin/LOB")));
const Service = Loadable(lazy(() => import("../Screens/Admin/Service")));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin",
        children: [
          { path: "manageuser", element: <ManageUser />, index: true },

          { path: "manageemployees", element: <ManageEmployees /> },
          { path: "managebuilder", element: <ManageBuilder /> },
          { path: "manageprojectinfo", element: <ManageProjectInfo /> },
          { path: "manageOrder", element: <ManageOrder /> },
          { path: "country", element: <Country /> },
          { path: "state", element: <State /> },
          { path: "locality", element: <Locality /> },
          { path: "LOB", element: <LOB /> },
          { path: "service", element: <Service /> },
        ],
      },
    ],
  },
]);
