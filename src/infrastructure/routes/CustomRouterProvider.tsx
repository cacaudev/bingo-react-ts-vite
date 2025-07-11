import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigurationTable } from "../../presentation/components/configuration/ConfigurationTable";
import { Game } from "../../presentation/components/game/Game";
import { Home } from "../../presentation/components/home/Home";
import { Table } from "../../presentation/components/table/Table";
import { Layout } from "../../presentation/shared/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/config",
        element: <ConfigurationTable />,
      },
      {
        path: "/table",
        element: <Table />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
]);

function CustomRouterProvider() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default CustomRouterProvider;
