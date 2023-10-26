
import { Button, Modal } from 'antd';
import cn from 'classnames'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { LayThongTinLichChieuHeThongRapThunk, LayThongTinLichChieuPhimThunk } from 'store/quanLyRap';
import { generatePath, useNavigate } from 'react-router-dom'
import { PATH, xIconSVG } from 'constant';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaoLichChieu } from 'types';
import { TaoLichChieuSchema, TaoLichChieuSchemaType } from 'schema/TaoLichChieuSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'components';
import { QuanLyDatVeServices } from 'services';
import { toast } from 'react-toastify';
import { getToday } from 'utils';

export const AdminLichChieu = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<TaoLichChieuSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(TaoLichChieuSchema)
    })
    const [chonMaNhom, setChonMaNhom] = useState('GP09')
    const [chonMaHeThongRap, setChonMaHeThongRap] = useState('BHDStar')
    const [chonRap, setChonRap] = useState(1)
    const [chonMaCumRap, setChonMaCumRap] = useState('bhd-star-cineplex-pham-hung')
    const [chonMaPhim, setChonMaPhim] = useState<number>()
    const [maPhimlayThongTinLichChieuPhim, setMaPhimLayThongTinLichChieuPhim] = useState<number>(1337)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [taoLichChieu, setTaoLichChieu] = useState(false);
    const showTaoLichChieu = () => {
        setTaoLichChieu(true);
    };
    const handleCancelTaoLichChieu = () => {
        setTaoLichChieu(false);
    };
    useEffect(() => {
        dispatch(LayThongTinLichChieuHeThongRapThunk(chonMaNhom))
        dispatch(LayThongTinLichChieuPhimThunk(maPhimlayThongTinLichChieuPhim))
    }, [dispatch, chonMaNhom, maPhimlayThongTinLichChieuPhim])
    const { ThongTinLichChieuHeThongRap, LayThongTinLichChieuPhim } = useAppSelector(state => state.QuanLyRap)
    const listCumRap = ThongTinLichChieuHeThongRap?.find(a => a?.maHeThongRap === chonMaHeThongRap)
    const listDanhSach = listCumRap?.lstCumRap.find(a => a.maCumRap === chonMaCumRap)
    const listLichChieu = listDanhSach?.danhSachPhim?.find(a => a.maPhim === chonMaPhim)
    const LayThongTinLichChieuPhimTheoMaHeThongChieu = LayThongTinLichChieuPhim?.heThongRapChieu?.find(a => a.maHeThongRap === chonMaHeThongRap)
    const LayThongTinLichChieuPhimTheoMaCumRap = LayThongTinLichChieuPhimTheoMaHeThongChieu?.cumRapChieu?.find(a => a.maCumRap === chonMaCumRap)
    useEffect(() => {
        reset({ ...listLichChieu, maPhim: String(listLichChieu?.maPhim), maRap: listDanhSach?.maCumRap })
    }, [listLichChieu, reset, listDanhSach])
    const setSubmit: SubmitHandler<TaoLichChieu> = async (values) => {
        const valuesLichChieu = { ...values, maPhim: Number(values.maPhim), giaVe: Number(values.giaVe) }
        console.log('valuesLichChieu', valuesLichChieu)
        try {
            await QuanLyDatVeServices.TaoLichChieu(valuesLichChieu)
            dispatch(LayThongTinLichChieuHeThongRapThunk(chonMaNhom))
            toast.success('Tạo lịch chiếu thành công')
        } catch (error) {
            toast.error(error.response.data.content)
        }
    }
    return (
        <div className='max-w-screen-2xl m-auto'>
            <div className='flex justify-between gap-[10px] sm:gap-[30px]'>
                <form className='my-[15px] w-full'>
                    <label htmlFor="setMaNhom" className={cn("label", { "text-black": 'bg-white' })}>Mã nhóm</label>
                    <select id="setMaNhom" className='input' defaultValue={"GP09"} onChange={(event) => { setChonMaNhom(event.target.value) }}>
                        <option value="GP01">GP01</option>
                        <option value="GP02">GP02</option>
                        <option value="GP03">GP03</option>
                        <option value="GP04">GP04</option>
                        <option value="GP05">GP05</option>
                        <option value="GP06">GP06</option>
                        <option value="GP07">GP07</option>
                        <option value="GP08">GP08</option>
                        <option value="GP09">GP09</option>
                        <option value="GP10">GP10</option>
                        <option value="GP11">GP11</option>
                        <option value="GP12">GP12</option>
                        <option value="GP13">GP13</option>
                    </select>
                </form>
            </div>
            <div className='border-b'>
                <ul className="grid grid-cols-3 overflow-auto h gap-[10px] font-medium text-center text-gray-500 p-2 justify-center sm:py-4 lg:flex lg:flex-wrap lg:gap-[50px] sm:gap-[20px] dark:text-gray-100">
                    {
                        ThongTinLichChieuHeThongRap?.map((a, index) => {
                            return (
                                <li key={index} className="flex flex-col items-center" onClick={() => {
                                    setChonMaHeThongRap(a.maHeThongRap)
                                    setChonRap(1)
                                    const maCumRapDauTien = a.lstCumRap?.find(b => b.maCumRap[0])
                                    setChonMaCumRap(maCumRapDauTien?.maCumRap)
                                }}>
                                    <img className='w-[30px] sm:w-[60px]' src={a.logo} alt="" />
                                    <p className={chonMaHeThongRap === a.maHeThongRap ? 'tabs-active' : 'tabs'}>{a.tenHeThongRap}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='flex flex-col lg:flex-row'>
                <div className='h-[200px] md:h-[260px] lg:h-[650px] overflow-auto'>
                    <ul className="grid grid-cols-2 gap-[10px] font-medium text-center text-gray-500 p-2 sm:py-4 sm:grid-cols-3 sm:gap-[20px] lg:flex lg:flex-col dark:text-gray-100">
                        {
                            listCumRap?.lstCumRap.map((a, index) => (
                                <li key={index} className="flex flex-row items-center" onClick={() => { setChonRap(index + 1), setChonMaCumRap(a.maCumRap) }}>
                                    <img className='w-[15px] sm:w-[30px] lg:w-[60px]' src={listCumRap.logo} alt="" />
                                    <div className={chonRap === index + 1 ? 'tabs-active-LichChieu flex flex-col items-start' : 'tabs-LichChieu flex flex-col items-start'}>
                                        <p>{a.tenCumRap}</p>
                                        <p className='phone:hidden lg:block'>{a.diaChi}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="relative w-full overflow-x-auto shadow-md rounded-md sm:rounded-lg mt-[15px] lg:ml-3 h-[400px] lg:h-[650px] overflow-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-100">
                        <thead className="text-[11px] sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
                            <tr>
                                <th scope="col" className="px-1 py-3 w-[60px] sm:w-[100px]">

                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Phim
                                </th>
                                <th scope="col" className="px-1 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listDanhSach?.danhSachPhim?.map((a, index) => (
                                    <tr key={index} className="bg-white dark:bg-gray-800 border-b">
                                        <th scope="row" className="py-2 font-medium  whitespace-nowrap ">
                                            <img className='w-full sm:w-[100px]' src={a.hinhAnh} alt="" />
                                        </th>
                                        <td className="px-2 py-2 text-[13px] sm:text-[18px] font-[400px] sm:font-medium text-gray-900 dark:text-white">
                                            {a.tenPhim}
                                        </td>
                                        <td className="px-1 py-2">
                                            <button className='btn-reset flex items-center justify-center !w-[120px] sm:!w-[200px] text-[11px] sm:text-[16px] py-[5px] sm:py-[10px] xl:py-[10px]' onClick={() => {
                                                showTaoLichChieu()
                                                setChonMaPhim(a.maPhim)
                                            }}><i className="fa-regular fa-calendar-plus mr-3"></i>Tạo lịch chiếu</button>
                                            <button className='btn-reset from-orange-400 to-red-600 flex items-center justify-center !w-[120px] sm:!w-[200px] text-[11px] sm:text-[16px] py-[5px] sm:py-[10px] xl:py-[10px] mt-[6px] sm:mt-2 ' onClick={() => {
                                                showModal()
                                                setChonMaPhim(a.maPhim)
                                                setMaPhimLayThongTinLichChieuPhim(a.maPhim)
                                            }}><i className="fa-regular fa-calendar-days mr-3"></i>Xem lịch chiếu</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <Modal footer={false} open={isModalOpen} onCancel={handleCancel} closeIcon={false}>
                    <div className='flex justify-between mb-2'>
                        <div className='flex'>
                            <img className='w-[60px]' src={listLichChieu?.hinhAnh} alt="" />
                            <p className='text-[20px] font-[500] mx-2 text-white'>{listLichChieu?.tenPhim}</p>
                        </div>
                        <button className='btn-reset h-fit !from-orange-400 !to-red-600 p-2' onClick={() => { handleCancel() }}>{xIconSVG()}</button>
                    </div>
                    <div className='flex flex-wrap gap-[10px]'>
                        {
                            listLichChieu?.lstLichChieuTheoPhim?.map((b, index) => (
                                <a href='#' key={index} onClick={() => {
                                    const path = generatePath(PATH.booking, { bookingID: b.maLichChieu })
                                    navigate(path)
                                }} className='border h-fit text-[12px] sm:text-[16px] px-1 py-1 rounded-md cursor-pointer !text-white dark:text-white hover:!text-cyan-400 hover:border-cyan-400 focus:!text-white focus:!bg-cyan-400'>{("0" + new Date(b.ngayChieuGioChieu).getHours()).slice(-2)} : {("0" + new Date(b.ngayChieuGioChieu).getMinutes()).slice(-2)}</a>
                            ))
                        }
                        {
                            LayThongTinLichChieuPhimTheoMaCumRap?.lichChieuPhim?.map((b, index) => (
                                <a href='#' key={index} onClick={() => {
                                    const path = generatePath(PATH.booking, { bookingID: b.maLichChieu })
                                    navigate(path)
                                }} className='border h-fit text-[12px] sm:text-[16px] px-1 py-1 rounded-md cursor-pointer !text-white dark:text-white hover:!text-cyan-400 hover:border-cyan-400 focus:!text-white focus:!bg-cyan-400'>{("0" + new Date(b.ngayChieuGioChieu).getHours()).slice(-2)} : {("0" + new Date(b.ngayChieuGioChieu).getMinutes()).slice(-2)}</a>
                            ))
                        }
                    </div>
                </Modal>
                <Modal footer={false} open={taoLichChieu} onCancel={handleCancelTaoLichChieu} closeIcon={false}>
                    <form action="" onSubmit={handleSubmit(setSubmit)}>
                        <div className='flex justify-between border-b pb-2 mb-2'>
                            <h1 className='text-[20px] font-medium text-white'><i className="fa-regular fa-calendar-plus mr-3"></i>Tạo lịch chiếu</h1>
                            <button type="button" className="absolute top-3 right-2.5 btn-reset p-2 sm:p-3 from-orange-400 to-red-600" onClick={() => { handleCancelTaoLichChieu() }}>
                                {xIconSVG()}
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <Input className="input" label="Mã phim" placeholder="Mã phim" id="maPhim" error={errors?.maPhim?.message} register={register} />
                        <Input defaultValue={getToday} className="input" label="Lịch chiếu (DD/MM/YYYY hh/mm/ss)" placeholder="Lịch chiếu (DD/MM/YYYY hh/mm/ss)" id="ngayChieuGioChieu" error={errors?.ngayChieuGioChieu?.message} register={register} />
                        <Input className="input" label="Mã cụm rạp" placeholder="Mã cụm rạp" id="maRap" error={errors?.maRap?.message} register={register} />
                        <Input className="input" label="Giá vé" placeholder="Giá vé" id="giaVe" error={errors?.giaVe?.message} register={register} />
                        <Button htmlType='submit' className='btn-register'>Tạo lịch chiếu</Button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}

