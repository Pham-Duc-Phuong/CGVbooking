import { useEffect, useState } from "react"
import { generatePath, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store"
import { LayThongTinPhimThunk } from "store/quanLyPhim"
import cn from 'classnames'
import ReactPlayer from "react-player"
import { LayThongTinLichChieuPhimThunk } from "store/quanLyRap"
import { PATH } from "constant"

export const DetailMovieTemplate = () => {
  const { movieID } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isOpenTrailer, setIsOpenTrailer] = useState(false)
  useEffect(() => {
    dispatch(LayThongTinPhimThunk(movieID))
    dispatch(LayThongTinLichChieuPhimThunk(Number(movieID)))
  }, [dispatch, movieID])
  const { ThongTinPhim } = useAppSelector(state => state.QuanLyPhim)
  const { LayThongTinLichChieuPhim } = useAppSelector(state => state.QuanLyRap)
  const { accessToken } = useAppSelector(state => state.quanLyNguoiDung)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenCumRap, setIsOpenCumRap] = useState(false);
  const [isOpenLichChieu, setIsOpenLichChieu] = useState(false);
  const [chonMaHeThongRap, setChonMaHeThongRap] = useState<string>()
  const [chonMaCumRap, setChonMaCumRap] = useState<string>()
  const cumRapChieuPhim = LayThongTinLichChieuPhim?.heThongRapChieu?.find(a => a.maHeThongRap === chonMaHeThongRap)
  const lichChieuPhin = cumRapChieuPhim?.cumRapChieu?.find(a => a.maCumRap === chonMaCumRap)
  const [IsScreen, setIsScreen] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setIsScreen(window.innerWidth)
  }
  window.addEventListener('resize', handleResize);
  let widthTrailer = 0
  if (IsScreen < 640) {
    widthTrailer = 325
  } else {
    widthTrailer = 640
  }
  return (
    <div className="max-w-screen-xl h-auto sm:h-screen m-auto px-5 py-6 sm:p-[30px]">
      <div className="max-w-screen-md w-full m-auto flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row items-center">
          <img className="object-cover p-2 w-[200px] h-full" src={ThongTinPhim?.hinhAnh} alt='' />
          <div className="flex flex-col justify-between p-3 leading-normal">
            <h5 className="mb-2 text-sm sm:text-2xl font-bold tracking-normal text-gray-900 dark:text-white">{ThongTinPhim?.tenPhim}</h5>
            <p className="detailMovie">Đạo diễn: Christopher Nolan</p>
            <p className="detailMovie">Diễn viên: Leonardo DiCaprio, Robert De Niro, Lily Gladstone, ...</p>
            <p className="detailMovie">Ngày công chiếu: {("0" + new Date(ThongTinPhim?.ngayKhoiChieu).getDate()).slice(-2)}/{("0" + new Date(ThongTinPhim?.ngayKhoiChieu).getMonth()).slice(-2)}/{("0" + new Date(ThongTinPhim?.ngayKhoiChieu).getFullYear()).slice(-4)}</p>
            <p className="detailMovie">Thời lượng: 120p</p>
            <p className="detailMovie">Ngôn ngữ: Tiếng Anh - Tiếng Việt</p>
            <p className="detailMovie">Đánh giá: {ThongTinPhim?.danhGia}/10</p>
          </div>
        </div>
        <div className="flex flex-col w-full justify-start gap-2 p-2">
          <button className="btn-register !text-[11px] sm:!text-[17px] !m-0 w-full flex items-center justify-center dark:text-white" onClick={() => { setIsOpenTrailer(true) }}><img className="w-[20px] sm:w-[30px] mr-1" src="/images/cinema-film-movie-svgrepo-com.svg"></img>Trailer</button>
          <button className="btn-cancel !text-[11px] sm:!text-[17px] !m-0 w-full flex items-center justify-center dark:text-white" onClick={() => {
            if (!accessToken) {
              navigate(PATH.login)
            } else {
              setIsModalOpen(true)
            }
          }}><img className="w-[20px] sm:w-[30px] mr-1" src="/images/tickets-ticket-svgrepo-com.svg"></img>Đặt vé</button>
          <button className="btn-add !m-0 !h-[35px] sm:!h-[40px] w-full flex items-center justify-center dark:text-white" onClick={() => { window.history.back() }}><img className="w-[20px] sm:w-[30px] mr-1" src="/images/popcorn-svgrepo-com.svg"></img>Quay lại</button>
        </div>
      </div>
      <div className={cn({ 'hidden': !isOpenTrailer })}>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" onClick={() => { setIsOpenTrailer(false) }}></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"><ReactPlayer width={widthTrailer} controls={true} playing={isOpenTrailer} url={ThongTinPhim?.trailer} /></div>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-[500px] h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <div className="absolute font-[600] text-xl px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900 dark:text-gray-400">
          Nội dung phim
        </div>
      </div>
      <p className="max-w-screen-lg m-auto detailMovie">{ThongTinPhim?.moTa}</p>
      {/* Modal */}
      <div className={cn({ 'hidden': !isModalOpen })}>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" onClick={() => { setIsModalOpen(false) }}></div>
        <ul className="overflow-auto h-fit w-[325px] sm:w-[600px] rounded-lg font-medium text-center text-gray-500 p-2 sm:py-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 dark:text-gray-100">
          <h1 className="text-2xl dark:text-white">Hệ thống rạp</h1>
          <div className="flex flex-wrap justify-center items-center gap-[30px]">
            {
              !LayThongTinLichChieuPhim?.heThongRapChieu.length ? <div className="inline-flex items-center justify-center w-full"><hr className="w-[500px] h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" /><div className="absolute font-[600] text-xl px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-800 dark:text-gray-400">Không có lịch chiếu</div>
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
