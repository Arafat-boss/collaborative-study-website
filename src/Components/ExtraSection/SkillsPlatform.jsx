import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  { title: 'Skills and IT', courses: 21 },
  { title: 'Design and Creativity', courses: 9 },
  { title: 'Career Readiness', courses: 9 },
  { title: 'Kids Courses', courses: 2 },
  { title: 'Professional Courses', courses: 9 },
  { title: 'Free Courses', courses: 30 }
];

export default function SkillsPlatform() {
  return (
    <div className="bg-black text-white py-12 text-center">
      <h2 className="text-3xl font-bold">Country's Best Skill Development Platform</h2>
      <div className="flex justify-center space-x-4 my-4">
        <span className="px-3 py-1 bg-blue-600 rounded">✅ Best Teachers</span>
        <span className="px-3 py-1 bg-blue-600 rounded">✅ 500K+ Students</span>
        <span className="px-3 py-1 bg-blue-600 rounded">✅ 70+ Online Courses</span>
      </div>
      
      <div className="relative w-11/12 mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4.5 }
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-900 text-white p-4 rounded-xl text-center">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.courses} Courses</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full">
          <FaChevronLeft className="text-white" />
        </button>
        <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full">
          <FaChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
}
