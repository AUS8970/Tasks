import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/HOme";
import MainRoute from "./MainRoute";
import { SimpleLoginForm } from "../auth/page/Login";

const router = createBrowserRouter([
  { path: "/", element: <MainRoute />, children: [
    { path: "/", element: <Home />},
    { path: "/login", element: <SimpleLoginForm />},
    { path: "/register", element: <Home />},
  ]},
]);

export default router;