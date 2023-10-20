import { Footer, Header } from "components"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <div>
            <Header />
            <div className="dark:bg-[#111827]">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
