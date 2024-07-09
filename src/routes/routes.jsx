import { createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx"
import Dashboard from "../pages/Dashboard.jsx";
import { MyInfo } from "../components/Dashboard/MyInfo.jsx";

export const router = createBrowserRouter([
    {
      path: "/", element: <Login/>,
    },
    {
      path: "/dashboard", element: <Dashboard/>,
    },
  ]);