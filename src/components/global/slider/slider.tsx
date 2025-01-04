"use client"

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperProps } from "swiper/react"
import { Label } from "../../ui/label"

type SliderProps = {
    children: React.ReactNode
    overlay?: boolean
    label?: string
} & SwiperProps

export const Slider = ({ children, overlay, label, ...rest }: SliderProps) => {
    return (
        <div
            style={{
                maskImage: `linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))`,
            }}
            className="w-full max-w-full overflow-x-hidden mt-5 relative"
        >
            {overlay && (
                <>
                    <div className="absolute w-[40px] slider-overlay left-0 h-full z-50" />
                    <div className="absolute w-[40px] slider-overlay-rev right-0 h-full z-50" />
                </>
            )}
            {label && (
                <Label className="pl-7 mb-3 text-themeTextGray">{label}</Label>
            )}
            <Swiper
                modules={[Navigation, Pagination, Autoplay, FreeMode]}
                autoplay={{
                    delay: 1, // Minimal delay for continuous effect
                    disableOnInteraction: false, // Keep autoplay active after interaction
                }}
                freeMode={{
                    enabled: true, // Enable free mode for smooth continuous scrolling
                    momentum: false, // Disable momentum to ensure constant speed
                }}
                speed={2000} // Adjust speed for smoothness
                loop={true} // Enable infinite scrolling
                slidesPerView="auto" // Show multiple slides at once
                spaceBetween={10} // Adjust spacing between slides
                {...rest}
            >
                {children}
            </Swiper>
        </div>
    )
}
