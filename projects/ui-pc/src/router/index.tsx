import { createBrowserRouter } from "react-router-dom";
import MainFrame from "@/components/MainFrame/index.tsx";
import menu from "@/data/menu.ts";
import Home from "@/pages/home/index";
import Link from "@/pages/link/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainFrame menus={menu} />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "link",
        element: <Link />,
      },
    ],
  },
]);

export default router;
