import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect, useState } from 'react';
import { LayDanhSachPhimThunk } from 'store/quanLyPhim';

export const HomeTemplate = () => {
  const dispatch = useAppDispatch()
  const [chonMaNhom, setChonMaNhom] = useState('GP09')
  const [locPhimTheoTen, setLocPhimTheoTen] = useState('')
  useEffect(() => {
    dispatch(LayDanhSachPhimThunk(chonMaNhom))
  }, [dispatch, chonMaNhom])
  const { LayDanhSachPhim } = useAppSelector(state => state.QuanLyPhim)
  const locLayDanhSachPhim = LayDanhSachPhim?.filter(a => a.tenPhim.toLowerCase().includes(locPhimTheoTen.toLowerCase()))
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
      <div className='max-w-screen-2xl m-auto p-[20px] sm:py-[20px] sm:px-[40px]'>
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
                  <p className="mb-3 text-[9px] sm:text-sm font-normal text-gray-700 dark:text-gray-400">{a.moTa.substring(0, 39)}...</p>
                  <div className='flex flex-col lg:flex-row justify-between gap-1'>
                    <p className="inline-flex justify-center items-center px-2 py-1 xl:px-3 xl:py-2 text-[13px] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <img className='w-[20px] sm:w-[30px] mr-1' src='/src/assets/popcorn-svgrepo-com.svg'></img>Chi tiết
                    </p>
                    <p className="inline-flex justify-center items-center px-2 py-1 xl:px-3 xl:py-2 text-[13px] font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    <img className='w-[20px] sm:w-[30px] mr-1' src='/src/assets/tickets-ticket-svgrepo-com.svg'></img>Đặt vé
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
