import { useAppSelector } from "store"

export const HistoryBooking = () => {
    const { infoUser } = useAppSelector(state => state.quanLyNguoiDung)
    console.log('infoUser', infoUser)
    return (
        <div>
            <div className="relative w-full overflow-x-auto shadow-md rounded-md sm:rounded-lg mt-[15px] lg:ml-3 h-[400px] lg:h-[650px] overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-100">
                    <thead className="text-[11px] sm:text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
                        <tr>
                            <th scope="col" className="px-1 py-3 w-[30px]">

                            </th>
                            <th scope="col" className="px-1 py-3">
                                Phim
                            </th>
                            <th scope="col" className="px-1 py-3 text-center w-[50px] sm:w-auto">
                                Giờ đặt
                            </th>
                            <th scope="col" className="px-1 py-3 text-center w-[60px] sm:w-auto">
                                Ngày đặt
                            </th>
                            <th scope="col" className="px-1 py-3 text-center">
                                Mã vé
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            infoUser?.thongTinDatVe?.map(a => (
                                a.danhSachGhe?.map((b, index) => (
                                    <tr key={index} className="bg-white dark:bg-gray-800 border-b">
                                        <th scope="row" className="py-2">
                                            <img className='w-full' src={a.hinhAnh} alt="" />
                                        </th>
                                        <td className="px-1 py-2 text-[11px] sm:text-[18px] text-gray-900 dark:text-white">
                                            {a.tenPhim}
                                        </td>
                                        <td className="px-1 py-2 text-[11px] sm:text-[18px] text-gray-900 text-center dark:text-white">
                                            <p>{("0" + new Date(a.ngayDat).getHours()).slice(-2)}:{("0" + new Date(a.ngayDat).getMinutes()).slice(-2)}</p>
                                        </td>
                                        <td className="px-1 py-2 text-[11px] sm:text-[18px] text-gray-900 text-center dark:text-white">
                                            <p>{("0" + new Date(a.ngayDat).getDate()).slice(-2)}/{("0" + new Date(a.ngayDat).getMonth()).slice(-2)}/{("0" + new Date(a.ngayDat).getFullYear()).slice(-2)}</p>
                                        </td>
                                        <td className="px-1 py-2 text-[11px] sm:text-[18px] text-gray-900 text-center dark:text-white">
                                            <p>{b.maGhe}</p>
                                        </td>
                                    </tr>
                                ))
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
