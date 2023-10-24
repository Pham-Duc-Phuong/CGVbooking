import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store"
import { LayDanhSachPhongVeThunk, QuanLyDatVeActions } from "store/quanLyDatVe"
import cn from 'classnames'
import { SubmitHandler } from "react-hook-form"
import { DatVe } from "types"
import { QuanLyDatVeServices } from "services"
import { toast } from "react-toastify"
import { Modal } from "antd"

export const BookingTemplate = () => {
    const dispatch = useAppDispatch()
    const { bookingID } = useParams()
    useEffect(() => {
        dispatch(LayDanhSachPhongVeThunk(bookingID))
    }, [dispatch, bookingID])
    // const { userLogin } = useAppSelector(state => state.quanLyNguoiDung)
    const { LayDanhSachPhongVe, bookingChair } = useAppSelector(state => state.QuanLyDatVe)
    const thongTinPhim = LayDanhSachPhongVe?.thongTinPhim
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [khuyenMai, setKhuyenMai] = useState<number>(0)
    const [payBankType, setPayBankType] = useState(false)
    const showPayBankType = () => {
        setPayBankType(true);
    };
    const handleCancelPayBankType = () => {
        setPayBankType(false);
    };
    const [chonGhe, setChonGhe] = useState(false)
    const showChonGhe = () => {
        setChonGhe(true);
    };
    const handleCancelChonGhe = () => {
        setChonGhe(false);
    };
    const [payType, setPayType] = useState(false)
    const showPayType = () => {
        setPayType(true);
    };
    const handleCancelPayType = () => {
        setPayType(false);
    };
    const DatVe: SubmitHandler<DatVe> = async (values) => {
        try {
            await QuanLyDatVeServices.DatVe(values)
            toast.success('Đặt vé thành công')
            dispatch(QuanLyDatVeActions.booked())
            dispatch(LayDanhSachPhongVeThunk(bookingID))
        } catch (error) {
            toast.error(error?.response?.data?.content)
        }
        // className={cn('absolute w-[300px] z-[1000] right-1/2 top-1/2 translate-x-1/2', { 'hidden': payBankType === true })}
    }
    return (
        <div className="max-w-screen-2xl m-auto px-[10px] md:px-[30px] py-[30px] sm:py-[60px] flex flex-col lg:grid lg:grid-cols-booking lg:gap-[10px]">
            <div className="border w-full h-full rounded-md sm:rounded-lg mb-[20px] lg:mb-0 shadow-lg flex items-center justify-center dark:shadow-darkMode">
                <div className="grid grid-cols-16 gap-[3px] sm:gap-[8px] lg:gap-[10px] 2xl:gap-[15px] p-[4px] sm:p-[6px] lg:p-[10px] xl:p-[20px]">
                    {
                        LayDanhSachPhongVe?.danhSachGhe?.map((a, index) => (
                            <p key={index} className={cn('border cursor-pointer text-[7px] h-[18px] w-[18px] xl:text-[16px] lg:text-[13px] md:text-[16px] sm:text-[13px] xl:w-[40px] xl:h-[40px] lg:w-[30px] lg:h-[30px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] rounded sm:rounded-md text-center flex items-center justify-center dark:text-white', { 'text-white bg-red-500': bookingChair?.find(b => b.tenGhe === a.tenGhe), 'text-white bg-gray-400 pointer-events-none line-through': a.daDat })} onClick={() => {
                                dispatch(QuanLyDatVeActions.booking(a))
                            }}>{a.tenGhe}</p>
                        ))
                    }
                </div>
            </div>
            <div className="border w-full rounded-lg shadow-lg dark:shadow-darkMode">
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
                    <div className="relative h-[327px] sm:h-[381px] xl:h-[381px] lg:h-[320px] overflow-x-auto shadow-md rounded-md border mt-[10px] sm:mt-0 sm:w-[60%] lg:w-full lg:mt-[20px] sm:ml-[20px] lg:ml-0 ">
                        <table className="w-full text-center text-gray-500 dark:text-gray-400 ">
                            <thead className="text-[10px] sm:text-[14px] lg:text-[10px] xl:text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-2">
                                        Số ghế
                                    </th>
                                    <th scope="col" className="px-6 py-2">
                                        Giá vé
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-red-500 text-[10px] sm:text-[14px] xl:text-[14px] lg:text-[10px]">
                                        <i className="fa-regular fa-trash-can"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookingChair?.map(a => (
                                        <tr key={a.stt} className="text-[10px] sm:text-[14px] lg:text-[10px] xl:text-[14px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {a.tenGhe}
                                            </th>
                                            <td className="px-6 py-2">
                                                {a.giaVe}
                                            </td>
                                            <td className="px-6 py-2 text-center text-red-500 cursor-pointer" onClick={() => { dispatch(QuanLyDatVeActions.booking(a)) }}>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="absolute bottom-0 right-0 left-0">
                            <div className="grid grid-cols-3 text-center text-[14px] lg:text-[9px] xl:text-[14px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <p className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Tổng tiền
                                </p>
                                <p className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {
                                        bookingChair?.reduce((total, a) => total += a.giaVe, 0)
                                    }
                                </p>
                                <div className="px-1 py-2 text-white bg-gradient-to-r from-blue-700 to-purple-700 cursor-pointer font-[500]">
                                    <p onClick={() => {
                                        const total = bookingChair?.reduce((total, a) => total += a.giaVe, 0)
                                        if (total === 0) {
                                            handleCancel()
                                            showChonGhe()
                                        } else {
                                            showModal()
                                        }
                                    }}><i className="fa-solid fa-money-check-dollar mr-1"></i><span>Thanh toán</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal footer={false} closeIcon={false} open={payBankType} onCancel={handleCancelPayBankType}>
                <button type="button" className="absolute top-[25px] right-[30px] btn-reset p-2 sm:p-3" onClick={() => { handleCancelPayBankType() }}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <img src="/images/TCB-QR-PHAM DUC PHUONG-2023924214542.jpg" alt="" />
            </Modal>
            <Modal footer={false} closeIcon={false} open={chonGhe} onCancel={handleCancelChonGhe}>
                <div className="p-6 text-center">
                    <svg className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-white dark:text-white">Hiện tại chưa có vị trí ngồi</h3>
                    <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={() => { handleCancelChonGhe() }}>
                        Chọn vị trí ngồi
                    </button>
                </div>
            </Modal>
            <Modal footer={false} closeIcon={false} open={payType} onCancel={handleCancelPayType}>
                <div className="p-6 text-center">
                    <svg className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-2xl font-normal text-white dark:text-white">Vui lòng chọn phương thức thanh toán</h3>
                </div>
                <button className="btn-cancel" onClick={() => { handleCancelPayType() }}>Chọn phương thức thanh toán</button>
            </Modal>
            <Modal footer={false} closeIcon={false} open={isModalOpen} onCancel={handleCancel}>
                <button type="button" className="absolute top-3 right-2.5 btn-reset p-2 sm:p-3 from-orange-400 to-red-600" onClick={() => { handleCancel() }}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                {/* Modal header */}
                <div className="px-0 sm:px-6 py-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-base text-white font-semibold lg:text-xl dark:text-white">
                        Phương thức thanh toán
                    </h3>
                </div>
                {/* Modal body */}
                <div className="px-0 py-2 sm:p-6 ">
                    <p className="text-[11px] sm:text-sm font-normal text-gray-500 dark:text-gray-400">Chọn một trong các phương thức thanh toán dưới đây</p>
                    <ul className="my-2 sm:my-4 space-y-3 ">
                        <li>
                            <button className="payType" onClick={() => { setKhuyenMai(1), showPayBankType() }}>
                                <i className="fa-solid fa-building-columns text-[15px] sm:text-[22px] w-[20px] sm:w-[30px]"></i>
                                <span className="spanPayType">Thẻ ngân hàng</span>
                            </button>
                        </li>
                        <li>
                            <button className="payType" onClick={() => { setKhuyenMai(0.8) }}>
                                <i className="fa-brands fa-cc-visa text-[15px] sm:text-[22px] w-[20px] sm:w-[30px]"></i>
                                <span className="spanPayType">Visa</span><span className="text-[9px] sm:text-[11px] font-[400] dark:text-white">&#40; giảm 20% khi sử dụng Visa &#41;</span>
                            </button>
                        </li>
                        <li>
                            <button className="payType" onClick={() => { setKhuyenMai(0.8) }}>
                                <i className="fa-brands fa-cc-mastercard text-[15px] sm:text-[22px] w-[20px] sm:w-[30px]"></i>
                                <span className="spanPayType">Mastercard</span><span className="text-[9px] sm:text-[11px] font-[400] dark:text-white">&#40; giảm 20% khi sử dụng Mastercard &#41;</span>
                            </button>
                        </li>
                        <li>
                            <button className="payType" onClick={() => { setKhuyenMai(0.9) }}>
                                <i className="fa-brands fa-google-pay text-[15px] sm:text-[22px] w-[20px] sm:w-[30px]"></i>
                                <span className="spanPayType">Google Pay</span><span className="text-[9px] sm:text-[11px] font-[400] dark:text-white">&#40; giảm 10% khi sử dụng Google Pay &#41;</span>
                            </button>
                        </li>
                        <li>
                            <button className="payType" onClick={() => { setKhuyenMai(0.9) }}>
                                <i className="fa-brands fa-paypal text-[15px] sm:text-[22px] w-[20px] sm:w-[30px]"></i>
                                <span className="spanPayType">PayPal</span><span className="text-[9px] sm:text-[11px] font-[400] dark:text-white">&#40; giảm 10% khi sử dụng PayPal &#41;</span>
                            </button>
                        </li>
                        <li>
                            <button className="payType" onClick={() => { setKhuyenMai(0.9) }}>
                                <i className="fa-brands fa-apple-pay text-[15px] sm:text-[22px] w-[20px] sm:w-[30px]"></i>
                                <span className="spanPayType">Apple Pay</span><span className="text-[9px] sm:text-[11px] font-[400] dark:text-white">&#40; giảm 10% khi sử dụng Apple Pay &#41;</span>
                            </button>
                        </li>
                    </ul>
                    <div className="mb-1 sm:mb-3">
                        <p className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                            <svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Why do I need to connect with my wallet?</p>
                    </div>
                    <p className={cn('input', { 'hidden': !khuyenMai })}>{"Tổng tiền:" + " " + bookingChair.reduce((total, a) => total = (total + a.giaVe) * khuyenMai, 0)}</p>
                    <div className="flex p-2 sm:p-4">
                        <button className="btn-register !m-0 !mx-4" onClick={() => {
                            if (!khuyenMai) {
                                showPayType()
                            } else {
                                const values: DatVe = {
                                    maLichChieu: LayDanhSachPhongVe?.thongTinPhim?.maLichChieu,
                                    danhSachVe: bookingChair?.map(a => {
                                        return ({
                                            maGhe: a.maGhe,
                                            giaVe: a.giaVe,
                                        })
                                    })
                                }
                                DatVe(values)
                                handleCancel()
                            }
                        }}>Hoàn tất</button>
                        <button className="btn-cancel !m-0 !mx-4" onClick={() => { handleCancel() }}>Thoát</button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}
