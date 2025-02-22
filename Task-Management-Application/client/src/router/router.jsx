import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/HOme";
import MainRoute from "./MainRoute";
import { SimpleLoginForm } from "../auth/page/Login";
import { SimpleRegisterForm } from "../auth/page/Register";

const router = createBrowserRouter([
  { path: "/", element: <MainRoute />, children: [
    { path: "/", element: <Home />},
    { path: "/login", element: <SimpleLoginForm />},
    { path: "/register", element: <SimpleRegisterForm />},
  ]},
]);

export default router;