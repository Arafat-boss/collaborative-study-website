import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight, FaCode, FaPalette, FaBriefcase, FaBookReader, FaFlask, FaGlobe } from 'react-icons/fa';
import { LuCheck, LuSparkles } from 'react-icons/lu';

const categories = [
  { title: 'Web & Software Development', courses: '45+ Live Tracks', icon: FaCode },
  { title: 'Data Science & Machine Learning', courses: '28+ Live Tracks', icon: FaFlask },
  { title: 'UI/UX Design & Creative Arts', courses: '20+ Live Tracks', icon: FaPalette },
  { title: 'Career, Interview & Resume Prep', courses: '25+ Live Tracks', icon: FaBriefcase },
  { title: 'Languages & Global Communication', courses: '22+ Live Tracks', icon: FaGlobe },
  { title: 'Higher Academics & Exam Coaching', courses: '35+ Live Tracks', icon: FaBookReader }
];

export default function SkillsPlatform() {
  return (
    <section className="py-6 sm:py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-slate-800 rounded-[5px] p-5 sm:p-8 lg:p-12 shadow-sm transition-colors duration-300">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-[5px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold border border-blue-200 dark:border-blue-900/50 shadow-sm">
            <LuSparkles className="text-blue-600 dark:text-blue-400" />
            <span>Curated Interactive Study Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Explore Diverse Learning Fields
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              Tailored For Your Ambition
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400 max-w-2xl mx-auto px-1">
            Choose from comprehensive live interactive domains and collaborate with peers worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-1 sm:pt-2 text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-[5px] bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 shadow-sm text-xs">
              <LuCheck className="text-blue-600 dark:text-blue-400" /> Verified Top Tutors
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-[5px] bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 shadow-sm text-xs">
              <LuCheck className="text-blue-600 dark:text-blue-400" /> Live Interactive Rooms
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-[5px] bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 shadow-sm text-xs">
              <LuCheck className="text-blue-600 dark:text-blue-400" /> Downloadable Invoices & PDFs
            </span>
          </div>
        </div>

        {/* Categories Swiper Carousel */}
        <div className="relative mt-8 sm:mt-10 z-10">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Left Prev Navigation Button */}
            <button
              className="skills-swiper-prev flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-[5px] bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-slate-200 flex items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm transition-all"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-xs sm:text-sm" />
            </button>

            {/* Slider Container with overflow-hidden and padding for hover clearance */}
            <div className="flex-1 overflow-hidden min-w-0 py-2">
              <Swiper
                className="w-full"
                modules={[Navigation, Autoplay]}
                spaceBetween={18}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 18 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                }}
                navigation={{
                  nextEl: '.skills-swiper-next',
                  prevEl: '.skills-swiper-prev',
                }}
              >
                {categories.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <SwiperSlide key={index} className="pt-2 pb-3 px-0.5">
                      <div className="bg-slate-50 dark:bg-[#111827] hover:bg-white dark:hover:bg-[#151e33] border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 p-6 rounded-[5px] transition-all duration-200 group flex flex-col justify-between h-56 sm:h-60 shadow-sm hover:shadow-md hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-[5px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-xl transition-transform group-hover:scale-105">
                          <Icon />
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                            <span className="text-blue-600 dark:text-blue-400">{item.courses}</span> available
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* Right Next Navigation Button */}
            <button
              className="skills-swiper-next flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-[5px] bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-slate-200 flex items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm transition-all"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-xs sm:text-sm" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
