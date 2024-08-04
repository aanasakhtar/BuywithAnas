import { createBrowserRouter, Navigate } from "react-router-dom";

import Shop from "./shop.jsx";
import ErrorPage from "./errorpage.jsx";
import Games from "./games.jsx";
import Game from "./game.jsx";
import MainShop from "./mainshop.jsx";
import Home from "./homepage.jsx";

const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'shop',
    element: <Shop />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to='games' />
      },
      {
        path: 'games',
        element: <MainShop />,
        children: [
          {
            index: true,
            element: <Navigate to='p' />,
          },
          {
            path: ':gamesId',
            element: <Games />
          }
        ]
      },
      {
        path: 'game/:gameId',
        element: <Game />
      }
    ]
  }
];

const router = createBrowserRouter(routes, {
  basename: '/buyWithAnas',
});

export default router;