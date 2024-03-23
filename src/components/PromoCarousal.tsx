import React from "react";

const PromoCarousal = () => {
  return (
    <div id="controls-carousel" className="relative w-full bg-zinc-100 py-2 dark:bg-gray-700" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-6 overflow-hidden">
        <div className="w-full duration-700 ease-in-out" data-carousel-item="active">
          <div className="absolute block w-full text-center text-sm font-semibold text-gray-800  dark:text-white">
            <span>Get 10% off on business sign up</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none md:start-1/4"
        data-carousel-prev
      >
        <svg
          className="h-4 w-4 text-gray-800 dark:text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 1 1 5l4 4" />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none md:end-1/4"
        data-carousel-next
      >
        <svg
          className="h-4 w-4 text-gray-800 dark:text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 9 4-4-4-4" />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default PromoCarousal;
