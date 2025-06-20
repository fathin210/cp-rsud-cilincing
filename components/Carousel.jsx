"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  { id: 1, src: "/banner/1.webp", alt: "Banner 1" },
  { id: 2, src: "/banner/2.webp", alt: "Banner 2" },
  { id: 3, src: "/banner/3.webp", alt: "Banner 3" },
  { id: 4, src: "/banner/4.webp", alt: "Banner 4" },
  { id: 5, src: "/banner/5.webp", alt: "Banner 5" },
  { id: 6, src: "/banner/6.webp", alt: "Banner 6" },
];

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = React.useRef(null);

  return (
    <div className="flex flex-col md:flex-row-reverse gap-6 max-w-7xl mx-auto my-12 px-2">
      {/* Thumbnail */}
      <div
        className={`
          hidden md:flex md:flex-col gap-3 
          overflow-x-auto md:overflow-y-auto 
          px-1 md:px-2 md:pr-1
          md:w-1/4 w-full
          md:max-h-[500px] 
          bg-gray-50 rounded-2xl shadow-inner relative
        `}
      >
        {/* Mobile doesn't need overlays */}
        <div className="hidden md:block absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-gray-200 to-transparent pointer-events-none z-10 rounded-t-2xl" />
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none z-10 rounded-b-2xl" />

        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => {
              setActiveIndex(index);
              swiperRef.current?.slideTo(index);
            }}
            className={`cursor-pointer transition rounded-xl flex-shrink-0
              w-32 md:w-full h-20 md:h-24 border-2
              ${
                activeIndex === index
                  ? "border-[#4aac90]"
                  : "border-transparent"
              } 
              hover:border-[#4aac90]`}
          >
            <Image
              src={slide.src}
              alt={`Thumbnail ${slide.alt}`}
              width={200}
              height={100}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Carousel */}
      <div className="w-full md:w-3/4 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-2xl"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[250px] md:h-[500px]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={slide.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerCarousel;
