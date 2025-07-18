import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "../../presentation/components/pages/game/Game";
import { Home } from "../../presentation/components/pages/home/Home";
import { GameProvider } from "../state/context/GameContex";
import { Table } from "../../presentation/components/pages/table/Table";
import { ConfigurationTable } from "../../presentation/components/pages/configuration/ConfigurationTable";
import { Page } from "../../presentation/layout/page/Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
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
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </>
  );
}

export default CustomRouterProvider;
