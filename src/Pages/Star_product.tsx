 


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Star_product() {
  return (
          <div className='container-fluit'>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      spaceBetween={20}
      slidesPerView={1}
    >
      <SwiperSlide>
          <div className="w-full h-[350px] overflow-hidden">

       <img
                  src="https://rukminim2.flixcart.com/image/612/612/xif0q/kids-apparel-combo/h/w/d/0-3-months-new-york-melanch-0-to-3-months-unishape-fashion-original-imahpbknbu59xuvm.jpeg?q=70"
      className="w-full h-full object-cover"


                />
                </div>
      </SwiperSlide>

      <SwiperSlide>
              <div className="w-full h-[350px] overflow-hidden">
          <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                className="w-full h-full object-cover"
                                />
                                </div>
      </SwiperSlide>

      <SwiperSlide>
                    <div className="w-full h-[350px] overflow-hidden"> 
       <img
                  src="https://rukminim1.flixcart.com/image/1600/2140/xif0q/sari/u/q/v/free-0009-darshansaree-unstitched-resized-original-imahm6c3w7eyvucu.jpeg?q=60"
             className="w-full h-full object-cover"
                />
                </div>
      </SwiperSlide>
    </Swiper>
    </div>
  );
}

export default Star_product;