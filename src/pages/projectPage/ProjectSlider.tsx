import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation, Pagination, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import style from './ProjectSlider.module.css'

type PropsType = {
    images: string[]
    alt: string
    siteUrl?: string
}

export const ProjectSlider = ({ images, alt, siteUrl }: PropsType) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

    return (
        <div className={style.slider}>
            <Swiper
                modules={[Navigation, Pagination, Keyboard, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                navigation
                keyboard={{ enabled: true }}
                pagination={{ type: 'fraction' }}
                loop={images.length > 2}
                spaceBetween={12}
                className={style.mainSwiper}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={`${src}-${index}`}>
                        {siteUrl ? (
                            <a href={siteUrl} target="_blank" rel="noreferrer" className={style.slideLink}>
                                <img
                                    src={src}
                                    alt={index === 0 ? alt : `${alt} — ${index + 1}`}
                                    className={style.slideImg}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    draggable={false}
                                />
                            </a>
                        ) : (
                            <span className={style.slideLink}>
                                <img
                                    src={src}
                                    alt={index === 0 ? alt : `${alt} — ${index + 1}`}
                                    className={style.slideImg}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    draggable={false}
                                />
                            </span>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView="auto"
                spaceBetween={10}
                watchSlidesProgress
                slideToClickedSlide
                className={style.thumbsSwiper}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={`thumb-${src}-${index}`} className={style.thumbSlide}>
                        <img
                            src={src}
                            alt=""
                            aria-hidden
                            className={style.thumbImg}
                            loading="lazy"
                            draggable={false}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
