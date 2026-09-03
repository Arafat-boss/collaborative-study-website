import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight, FaCode, FaPalette, FaBriefcase, FaBookReader, FaFlask, FaGlobe } from 'react-icons/fa';
import { LuCheck, LuSparkles } from 'react-icons/lu';

const categories = [
  { title: 'Web & Software Development', courses: '45+ Live Tracks', icon: FaCode, color: 'from-violet-600 via-fuchsia-600 to-pink-500' },
  { title: 'Data Science & Machine Learning', courses: '28+ Live Tracks', icon: FaFlask, color: 'from-cyan-500 via-blue-600 to-indigo-600' },
  { title: 'UI/UX Design & Creative Arts', courses: '20+ Live Tracks', icon: FaPalette, color: 'from-pink-500 via-rose-500 to-amber-500' },
  { title: 'Career, Interview & Resume Prep', courses: '25+ Live Tracks', icon: FaBriefcase, color: 'from-amber-500 via-orange-500 to-red-500' },
  { title: 'Languages & Global Communication', courses: '22+ Live Tracks', icon: FaGlobe, color: 'from-emerald-500 via-teal-600 to-cyan-600' },
  { title: 'Higher Academics & Exam Coaching', courses: '35+ Live Tracks', icon: FaBookReader, color: 'from-fuchsia-500 via-purple-600 to-indigo-600' }
];

export default function SkillsPlatform() {
  return (
    <section className="py-6 sm:py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-slate-800/90 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-violet-500/10 dark:bg-violet-600/15 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-fuchsia-500/10 dark:bg-fuchsia-600/15 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-extrabold border border-cyan-200 dark:border-cyan-500/30 backdrop-blur-md">
            <LuSparkles className="text-cyan-600 dark:text-cyan-400" />
            <span>Curated Interactive Study Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Explore Diverse Learning Fields
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-300 dark:to-cyan-300">
              Tailored For Your Ambition
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400 max-w-2xl mx-auto px-1">
            Choose from comprehensive live interactive domains and collaborate with peers worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-1 sm:pt-2 text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gray-50 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 shadow-sm text-xs">
              <LuCheck className="text-cyan-600 dark:text-cyan-400" /> Verified Top Tutors
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gray-50 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 shadow-sm text-xs">
              <LuCheck className="text-violet-600 dark:text-violet-400" /> Live Interactive Rooms
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gray-50 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 shadow-sm text-xs">
              <LuCheck className="text-fuchsia-600 dark:text-fuchsia-400" /> Downloadable Invoices & PDFs
            </span>
          </div>
        </div>

        {/* Categories Swiper Carousel */}
        <div className="relative mt-8 sm:mt-10 px-1 sm:px-6 z-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={14}
            slidesPerView={1.15}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1.35, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 18 },
              768: { slidesPerView: 2.3, spaceBetween: 20 },
              1024: { slidesPerView: 3.1, spaceBetween: 22 }
            }}
            navigation={{
              nextEl: '.skills-swiper-next',
              prevEl: '.skills-swiper-prev'
            }}
          >
            {categories.map((item, index) => {
              const Icon = item.icon;
              return (
                <SwiperSlide key={index}>
                  <div className="bg-slate-50 dark:bg-[#111827]/90 hover:bg-white dark:hover:bg-[#151e33] border border-gray-200 dark:border-slate-800 hover:border-violet-500/50 p-6 sm:p-7 rounded-3xl transition-all duration-300 group flex flex-col justify-between h-56 sm:h-60 shadow-sm hover:shadow-lg hover:-translate-y-1">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 font-semibold flex items-center gap-1">
                        <span className="text-cyan-600 dark:text-cyan-400">{item.courses}</span> available
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Controls */}
          <button
            className="skills-swiper-prev hidden sm:flex absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-slate-900/95 hover:bg-violet-600 text-gray-800 dark:text-white hover:text-white items-center justify-center border border-gray-200 dark:border-slate-700 shadow-xl transition-all"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            className="skills-swiper-next hidden sm:flex absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-slate-900/95 hover:bg-violet-600 text-gray-800 dark:text-white hover:text-white items-center justify-center border border-gray-200 dark:border-slate-700 shadow-xl transition-all"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>

      </div>
    </section>
  );
}
