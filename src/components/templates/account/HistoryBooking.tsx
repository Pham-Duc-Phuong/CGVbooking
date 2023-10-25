import { useAppSelector } from "store"

export const HistoryBooking = () => {
  const { infoUser } = useAppSelector(state => state.quanLyNguoiDung)
  return (
    <div>
             <div className="relative w-full overflow-x-auto shadow-md rounded-md sm:rounded-lg mt-[15px] lg:ml-3 h-[400px] lg:h-[650px] overflow-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-100">
                        <thead className="text-xs sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
                            <tr>
                                <th scope="col" className="px-4 py-3 w-[70px] sm:w-[100px]">

                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Phim
                                </th>
                                <th scope="col" className="px-5 sm:px-8 py-3 w-[140px] sm:w-[200px]">
                                    <i className="fa-solid fa-ticket mr-3"></i>Mua vé
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                infoUser?.thongTinDatVe?.map((a, index) => (
                                    <tr key={index} className="bg-white dark:bg-gray-800 border-b">
                                        <th scope="row" className="py-2 font-medium  whitespace-nowrap ">
                                            <img className='w-full sm:w-[100px]' src={a.hinhAnh} alt="" />
                                        </th>
                                        <th className="px-4 py-2 text-[13px] sm:text-[18px] text-gray-900 dark:text-white">
                                            {a.tenPhim}
                                        </th>
                                        <td className="px-3 py-2">
                                            <button className='btn-reset flex items-center px-[10px] sm:px-[20px] xl:px-[30px] py-[5px] sm:py-[10px] xl:py-[10px] sm:w-auto' onClick={() => {
                                                showModal()
                                                setChonMaPhim(a.maPhim)
                                            }}><i className="fa-solid fa-ticket mr-3"></i>Mua vé</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
    </div>
  )
}
