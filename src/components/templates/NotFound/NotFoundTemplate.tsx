
export const NotFoundTemplate = () => {
    return (
        <div className="max-w-screen-2xl m-auto p-[30px] flex flex-col items-center">
            <div className="relative">
                <h1 className="text-6xl font-extrabold absolute top-[10%] right-1/2 translate-x-1/2">404</h1>
                <img src="/images/dribbble_1.gif" alt="" />
                <button className="btn-reset px-4 py-2 text-2xl font-bold absolute bottom-[10%] right-1/2 translate-x-1/2">Back to home</button>
            </div>
        </div>
    )
}
