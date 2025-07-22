import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import useFetchData from '../../../customHooks/useFetchData';

export default function Categories() {
  const { data, loading, error } = useFetchData(`https://mytshop.runasp.net/api/categories`);

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 rounded bg-warning-subtle text-danger fw-bold">
        Failed to load categories.
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      spaceBetween={40}
      slidesPerView={3}
    >
      {data.map((category) => (
        <SwiperSlide
          key={category.id}
          className="p-5 bg-success-subtle text-success-emphasis border rounded"
        >
          <Link className='text-success-emphasis' to={`/categoryDetails/${category.id}`}>
            <div className='category'>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
