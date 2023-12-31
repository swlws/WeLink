import { createHashRouter } from "react-router-dom";
import MainFrame from "@/components/MainFrame/index.tsx";
import menu from "@/data/menu.ts";
import Dashboard from "@/pages/dashboard/index";
import Link from "@/pages/link/index";
import Setting from "@/pages/setting/index";

const router = createHashRouter([
  {
    path: "/",
    element: <MainFrame menus={menu} />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "link",
        element: <Link />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);

export default router;
