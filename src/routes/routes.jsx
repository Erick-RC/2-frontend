import { createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx"
import Dashboard from "../pages/Dashboard.jsx";

export const router = createBrowserRouter([
    {
      path: "/", element: <Login/>,
    },
    {
      path: "/dashboard", element: <Dashboard/>,
    },
  ]);