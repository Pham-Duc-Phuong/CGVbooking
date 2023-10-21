import { RouteObject } from "react-router-dom";
import { AuthLayout } from 'components'
import { Register, Login, Home, LichChieu } from "pages";
import { PATH } from "constant/config";
import { MainLayout } from "components";

export const router: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: PATH.movieList,
                element: <LichChieu />
            }
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: PATH.register,
                element: <Register />,
            },
            {
                path: PATH.login,
                element: <Login />,
            },
        ],
    },
]