import { createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx"

export const router = createBrowserRouter([
    {
      path: "/", element: <Login/>,
    },
  ]);