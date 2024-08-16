import App from "../../App";
import ErrorPage from "../Shered/ErrorPage/ErrorPage";
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from "../Shered/MainLayout";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <PrivateRoute><App></App></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ]
    }
])