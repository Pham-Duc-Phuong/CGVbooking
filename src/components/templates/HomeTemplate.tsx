import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const HomeTemplate = () => {
  return (
    <div className='pt-[75px] '>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log()}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false  
        }}
        className="mySwiper"
      >
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[720px] lg:h-[520px] md:h-[375px] sm:h-[300px]  w-full' src="/public/images/dat-rung-phuong-nam.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[720px] lg:h-[520px] md:h-[375px] sm:h-[300px]  w-full' src="/public/images/doraemon.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[720px] lg:h-[520px] md:h-[375px] sm:h-[300px]  w-full' src="/public/images/Mission-Impossible-7.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-[175px] 2xl:h-[880px] xl:h-[720px] lg:h-[520px] md:h-[375px] sm:h-[300px]  w-full' src="/public/images/moving.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </div>
  )
}
