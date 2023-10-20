import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
    return (
        <div className="AuthLayout h-full">
            <div className="h-screen w-screen relative ">
                <div className="absolute top-0 left-0 w-full h-full">
                    <img
                        className="w-full h-full object-cover object-left-bottom"
                        src="/images/1.jpg"
                    />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black z-10 opacity-30 "></div>
                <div className="absolute w-[330px] sm:w-[450px] p-[30px] top-1/2 left-1/2 bg-[rgba(0,0,0,.75)] z-20 -translate-x-1/2 -translate-y-1/2 rounded-md">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
