import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";

function Star_product() {
  const sliderRef = useRef(null);

  const { data, isLoading, isError } = useGet(
    ["UserSideLatestImages"],
    API.UserSideLatestImages
  );

  const latestImages = Array.isArray(data)
    ? data
    : data?.LatestImages || [];

  // Auto Slide
  useEffect(() => {
    if (latestImages.length <= 1) return;

    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const nextPosition = slider.scrollLeft + slider.clientWidth;

      if (
        nextPosition >=
        slider.scrollWidth - slider.clientWidth
      ) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({
          left: slider.clientWidth,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [latestImages.length]);

  const handleSlide = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading images...</div>;
  }

  if (isError) {
    return <div className="text-center py-10">Failed to load images</div>;
  }

  if (!latestImages.length) return null;

  return (
    <div className="relative w-full group">

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {latestImages.map((item) => (
          <div
            key={item._id}
            className="min-w-full w-full shrink-0 snap-center"
          >
            <div className="w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] bg-gray-100 flex items-center justify-center">
              <img
                src={item.images}
                alt="Latest collection"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={() => handleSlide(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => handleSlide(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10"
      >
        <ChevronRight size={28} />
      </button>

    </div>
  );
}

export default Star_product;