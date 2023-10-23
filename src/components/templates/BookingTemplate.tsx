import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store"
import { LayDanhSachPhongVeThunk, QuanLyDatVeActions } from "store/quanLyDatVe"
import cn from 'classnames'

export const BookingTemplate = () => {
    const dispatch = useAppDispatch()
    const { bookingID } = useParams()
    useEffect(() => {
        dispatch(LayDanhSachPhongVeThunk(bookingID))
    }, [dispatch, bookingID])
    const { LayDanhSachPhongVe, bookingChair } = useAppSelector(state => state.QuanLyDatVe)
    console.log('bookingChair', bookingChair)
    const thongTinPhim = LayDanhSachPhongVe?.thongTinPhim
    return (
        <div className="max-w-screen-2xl m-auto px-[10px] md:px-[30px] py-[30px] sm:py-[60px] flex flex-col lg:grid lg:grid-cols-booking lg:gap-[10px]">
            <div className="border w-full h-full rounded-md sm:rounded-lg mb-[20px] lg:mb-0 shadow-lg flex items-center justify-center dark:shadow-darkMode">
                <div className="grid grid-cols-16 gap-[3px] sm:gap-[8px] lg:gap-[10px] 2xl:gap-[15px] p-[4px] sm:p-[6px] lg:p-[10px] xl:p-[20px]">
                    {
                        LayDanhSachPhongVe?.danhSachGhe?.map((a, index) => (
                            <p key={index} className={cn('border cursor-pointer text-[7px] h-[18px] w-[18px] 2xl:text-[18px] xl:text-[16px] lg:text-[13px] md:text-[16px] sm:text-[13px] 2xl:w-[45px] 2xl:h-[45px] xl:w-[40px] xl:h-[40px] lg:w-[30px] lg:h-[30px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] rounded sm:rounded-md text-center flex items-center justify-center dark:text-white', { 'text-white bg-red-500': bookingChair?.find(b => b.tenGhe === a.tenGhe) })} onClick={() => {
                                dispatch(QuanLyDatVeActions.booking(a))
                            }}>{a.tenGhe}</p>
                        ))
                    }
                </div>
            </div>
            <div className="border w-full rounded-md sm:rounded-lg shadow-lg dark:shadow-darkMode">
                <div className="p-2 sm:p-[20px] flex flex-col sm:flex-row sm:justify-between sm:items-start lg:flex-col">
                    <div className="flex h-fit">
                        <img className="w-[70px] sm:w-[100px] h-fit" src={thongTinPhim?.hinhAnh} alt="" />
                        <div className="ml-3 w-full text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[14px] dark:text-white">
                            <p className="border-b xl:pb-2 pb-1">{thongTinPhim?.tenPhim}</p>
                            <p className="border-b xl:py-2 py-1">{thongTinPhim?.tenCumRap}</p>
                            <p className="border-b xl:py-2 py-1"><span>{thongTinPhim?.gioChieu}</span><span className="ml-3">{thongTinPhim?.ngayChieu}</span></p>
                            <p className="xl:pt-2 pt-1">{thongTinPhim?.tenRap}</p>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto h-[341px] shadow-md rounded-md mt-[10px] sm:mt-0 sm:w-[60%] lg:w-full lg:mt-[20px] sm:ml-[20px] lg:ml-0 ">
                        <table className="w-full text-center text-gray-500 dark:text-gray-400">
                            <thead className="text-[14px] lg:text-[10px] xl:text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-2">
                                        Số ghế
                                    </th>
                                    <th scope="col" className="px-6 py-2">
                                        Giá vé
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-right text-red-500 text-[14px]">
                                        <i className="fa-regular fa-trash-can"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookingChair?.map(a => (
                                        <tr key={a.stt} className="text-[14px] lg:text-[9px] xl:text-[14px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {a.tenGhe}
                                            </th>
                                            <td className="px-6 py-2">
                                                {a.giaVe}
                                            </td>
                                            <td className="px-6 py-2 text-right text-red-500 cursor-pointer">
                                                <i className="fa-regular fa-trash-can"></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
