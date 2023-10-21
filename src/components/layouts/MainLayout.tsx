import { Footer, Header } from "components"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <div className="m-auto">
            <Header />
            <div className="dark:bg-[#111827] pt-[75px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
