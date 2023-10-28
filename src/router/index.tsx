import { RouteObject } from "react-router-dom";
import { AuthLayout } from 'components'
import { Register, Login, Home, LichChieu, Booking, Account, Admin } from "pages";
import { PATH } from "constant/config";
import { MainLayout } from "components";
import { DetailMovie } from "pages/DetailMovie";

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
                path: PATH.lichchieu,
                element: <LichChieu />
            },
            {
                path: PATH.booking,
                element: <Booking />
            },
            {
                path: PATH.account,
                element: <Account />
            },
            {
                path: PATH.admin,
                element: <Admin />
            },
            {
                path: PATH.detailMovie,
                element: <DetailMovie />
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