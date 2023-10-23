import { RouteObject } from "react-router-dom";
import { AuthLayout } from 'components'
import { Register, Login, Home, LichChieu, Booking } from "pages";
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
            },
            {
                path: PATH.booking,
                element: <Booking />
            },
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