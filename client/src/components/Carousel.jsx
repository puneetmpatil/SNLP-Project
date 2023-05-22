import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

function Carousel(props) {
    const { features } = props;
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
            }}
            autoplay={{
                delay: 2800,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {features.map((feature) => {
                    return (
                        <SwiperSlide key={feature.id}>
                            <img src={feature.imgURL} alt={feature.title} className="h-72"/>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    )
}

export default Carousel