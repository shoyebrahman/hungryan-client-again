import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { FreeMode, Pagination } from "swiper/modules";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Testimonial = () => {
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    fetch("https://hungryan-server.vercel.app/review")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);
  // import required modules

  return (
    <div>
      <section className="my-20">
        <SectionTitle
          subHeading={"What Our client say"}
          heading={"Testimonials"}
        ></SectionTitle>
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col items-center mx-24 my-16">
                  <Rating
                    style={{ maxWidth: 250 }}
                    value={review.rating}
                    readOnly
                  />
                  <p>{review.details}</p>
                  <h3 className="text-2xl text-orange-400">{review.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
