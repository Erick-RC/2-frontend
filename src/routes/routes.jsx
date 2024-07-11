import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx"
import Dashboard from "../pages/Dashboard.jsx";
import HomeVideos from "../pages/videos/HomeVideos.jsx";
import Edit from "../pages/videos/Edit.jsx"
import Detail from "../pages/videos/Detail.jsx"
import Create from "../pages/videos/Create.jsx"

export const router = createBrowserRouter([
  {
    path: "/", element: <Login />,
  },
  {
    path: "/dashboard", element: <Dashboard />,
  },
  {
    path: "/videos", element: <HomeVideos />, 
  },
  {
    path: "/videos/:id", element: <Detail />,
  },
  {
    path: "/videos/edit/:id", element: <Edit />,
  },
  {
    path: "/videos/create", element: <Create />, 
  },
]);