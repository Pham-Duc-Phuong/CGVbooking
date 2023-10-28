import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect, useState } from 'react';
import { LayDanhSachPhimThunk } from 'store/quanLyPhim';
import { useNavigate, generatePath } from 'react-router-dom';
import { PATH } from 'constant';
import { LayThongTinLichChieuPhimThunk } from 'store/quanLyRap';

export const HomeTemplate = () => {
  const dispatch = useAppDispatch()
  const [chonMaNhom, setChonMaNhom] = useState('GP09')
  const [locPhimTheoTen, setLocPhimTheoTen] = useState('')
  const navigate = useNavigate()
  const [maPhim, setMaPhim] = useState<number>()
  const [chonMaHeThongRap, setChonMaHeThongRap] = useState<string>()
  const [chonMaCumRap, setChonMaCumRap] = useState<string>()
  useEffect(() => {
    dispatch(LayDanhSachPhimThunk(chonMaNhom))
    dispatch(LayThongTinLichChieuPhimThunk(maPhim))
  }, [dispatch, chonMaNhom, maPhim])
  const { LayDanhSachPhim } = useAppSelector(state => state.QuanLyPhim)
  const { LayThongTinLichChieuPhim } = useAppSelector(state => state.QuanLyRap)
  const { accessToken } = useAppSelector(state => state.quanLyNguoiDung)
  const locLayDanhSachPhim = LayDanhSachPhim?.filter(a => a.tenPhim.toLowerCase().includes(locPhimTheoTen.toLowerCase()))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenCumRap, setIsOpenCumRap] = useState(false)
  const [isOpenLichChieu, setIsOpenLichChieu] = useState(false)
  const cumRapChieuPhim = LayThongTinLichChieuPhim?.heThongRapChieu?.find(a => a.maHeThongRap === chonMaHeThongRap)
  const lichChieuPhin = cumRapChieuPhim?.cumRapChieu?.find(a => a.maCumRap === chonMaCumRap)
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log()}
        onSwiper={(swiper) => console.log()}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        className="mySwiper"
      >
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[680px] lg:h-[520px] md:h-[375px] sm:h-[300px] w-full' src="/images/dat-rung-phuong-nam.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[680px] lg:h-[520px] md:h-[375px] sm:h-[300px] w-full' src="/images/doraemon.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[680px] lg:h-[520px] md:h-[375px] sm:h-[300px] w-full' src="/images/Mission-Impossible-7.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[680px] lg:h-[520px] md:h-[375px] sm:h-[300px] w-full' src="/images/moving.jpg" alt="" /></SwiperSlide>
      </Swiper>
      <div className='max-w-screen-2xl m-auto px-[20px] sm:py-[20px] sm:px-[40px]'>
        <div className='flex justify-between gap-[10px] sm:gap-[30px]'>
          <form className='my-[15px] w-[40%]'>
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
          <form className='my-[15px] w-full'>
            <label htmlFor="search" className={cn("label", { "text-black": 'bg-white' })}>Tìm kiếm</label>
            <div className='flex'>
              <input type="text" id='search' className='input w-full !rounded-r-none !rounded-l-lg' onChange={(e) => { setLocPhimTheoTen(e.target.value) }} />
              <button className='btn-reset !rounded-l-none px-[10px] !rounded-r-lg sm:!px-[20px]'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </form>
        </div>
        <div className='grid grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-[10px] sm:gap-[30px]'>
          {
            (locLayDanhSachPhim ? locLayDanhSachPhim : LayDanhSachPhim)?.map((a, index) => (
              <div key={index} className="max-w-sm flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p>
                  <img className="rounded-t-lg w-full h-full" src={a.hinhAnh} alt='' />
                </p>
                <div className="p-2 sm:p-3 xl:p-5">
                  <h5 className="mb-2 text-[10px] sm:text-base font-bold tracking-tight text-gray-900 dark:text-white">{a.tenPhim}</h5>
                  <div className='flex flex-col lg:flex-row justify-between gap-1'>
                    <p className="inline-flex justify-center items-center px-2 py-1 xl:px-3 xl:py-2 text-[13px] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { const path = generatePath(PATH.detailMovie, { movieID: a.maPhim }); navigate(path) }}>
                      <img className='w-[20px] sm:w-[30px] mr-1' src='/images/popcorn-svgrepo-com.svg'></img>Chi tiết
                    </p>
                    <p className="inline-flex justify-center items-center px-2 py-1 xl:px-3 xl:py-2 text-[13px] font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800" onClick={() => {
                      if (!accessToken) {
                        navigate(PATH.login)
                      } else {
                        setIsModalOpen(true)
                        setMaPhim(a.maPhim)
                      }
                    }}>
                      <img className='w-[20px] sm:w-[30px] mr-1' src='/images/tickets-ticket-svgrepo-com.svg'></img>Đặt vé
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className={cn({ 'hidden': !isModalOpen })}>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" onClick={() => { setIsModalOpen(false) }}></div>
        <ul className="overflow-auto h-fit w-[325px] sm:w-[600px] rounded-lg font-medium text-center text-gray-500 p-2 sm:py-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 dark:text-gray-100">
          <h1 className="text-2xl dark:text-white">Hệ thống rạp</h1>
          <div className="flex flex-wrap justify-center items-center gap-[30px]">
            {
              !LayThongTinLichChieuPhim?.heThongRapChieu.length ? <div className="inline-flex items-center justify-center w-full"><hr className="w-[500px] h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" /><div className="fixed font-[600] text-xl px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-800 dark:text-gray-400">Không có lịch chiếu</div>
              </div> : LayThongTinLichChieuPhim?.heThongRapChieu?.map((a, index) => {
                return (
                  <li key={index} className="heThongRap flex flex-col items-center p-5" onClick={() => {
                    setChonMaHeThongRap(a.maHeThongRap)
                    setIsOpenCumRap(true)
                    setIsModalOpen(false)
                  }}>
                    <img className='w-[40px] sm:w-[60px] mb-2' src={a.logo} alt="" />
                    <p className='uppercase tracking-widest text-[13px] sm:text-[16px] hover:text-blue-700 dark:hover:text-blue-700 font-semibold'>{a.tenHeThongRap}</p>
                  </li>
                )
              })
            }
          </div>
        </ul>
      </div>
      <div className={cn({ 'hidden': !isOpenCumRap })}>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" onClick={() => { setIsOpenCumRap(false) }}></div>
        <ul className="overflow-auto h-fit w-[325px] sm:w-[500px] rounded-lg font-medium text-center text-gray-500 p-2 sm:py-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 dark:text-gray-100">
          <h1 className="text-2xl mb-3 dark:text-white">Cụm rạp</h1>
          <div className="flex flex-wrap justify-center items-center gap-[30px]">
            {
              cumRapChieuPhim?.cumRapChieu?.map((a, index) => {
                return (
                  <li key={index} className="heThongRap flex flex-col items-center " onClick={() => {
                    setChonMaCumRap(a.maCumRap)
                    setIsOpenLichChieu(true)
                    setIsOpenCumRap(false)
                  }}>
                    <img className='w-[40px] sm:w-[60px] mb-2' src={cumRapChieuPhim?.logo} alt="" />
                    <p className='uppercase tracking-widest text-[13px] sm:text-[16px] hover:text-blue-700 dark:hover:text-blue-700 font-semibold'>{a.tenCumRap}</p>
                  </li>
                )
              })
            }
          </div>
        </ul>
      </div>
      <div className={cn({ 'hidden': !isOpenLichChieu })}>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" onClick={() => { setIsOpenLichChieu(false) }}></div>
        <ul className="overflow-auto w-[325px] sm:w-[500px] rounded-lg font-medium text-center text-gray-500 p-2 sm:py-4flex flex-wrap justify-center items-center gap-[30px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 dark:text-gray-100">
          <h1 className="text-2xl mb-3 dark:text-white">Lịch Chiếu</h1>
          <div className="flex flex-wrap justify-center items-center gap-[30px]">
            {
              lichChieuPhin?.lichChieuPhim?.map((b, index) => {
                return (
                  <p key={index} onClick={() => {
                    const path = generatePath(PATH.booking, { bookingID: b.maLichChieu })
                    navigate(path)
                  }} className='border h-fit text-[11px] sm:text-[16px] px-1 py-1 rounded-md cursor-pointer dark:text-white hover:!text-cyan-400 hover:border-cyan-400 focus:!text-white focus:!bg-cyan-400'><span>{("0" + new Date(b.ngayChieuGioChieu).getHours()).slice(-2)}:{("0" + new Date(b.ngayChieuGioChieu).getMinutes()).slice(-2)}</span><span className="ml-1 sm:ml-2">{("0" + new Date(b.ngayChieuGioChieu).getDate()).slice(-2)}/{("0" + new Date(b.ngayChieuGioChieu).getMonth()).slice(-2)}</span></p>
                )
              })
            }
          </div>
        </ul>
      </div>
    </div>
  )
}
