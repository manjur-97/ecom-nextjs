"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { color } from "./theme/Color";

export interface BannerItem {
    id: string;
    image: string;
    title: string;
    description: string;
    link: string;
    linkText?: string;
    bgColor?: string;
}

interface SliderFullScreenBannerProps {
    banners: BannerItem[];
    height?: string;
    width?: string;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
}

function SliderFullScreenBanner({
    banners,
    height = "h-96",
    width = "w-full",
    autoPlay = true,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true,
}: SliderFullScreenBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

    // Auto-play timer
    useEffect(() => {
        if (!isAutoPlaying || banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [isAutoPlaying, autoPlayInterval, banners.length]);

    // Keep local autoplay state in sync with prop changes
    useEffect(() => {
        setIsAutoPlaying(autoPlay);
    }, [autoPlay]);

    // Pause autoplay when page is hidden and resume when visible (respecting prop)
    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                setIsAutoPlaying(false);
            } else {
                setIsAutoPlaying(autoPlay);
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, [autoPlay]);

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    const goToSlide = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    if (!banners || banners.length === 0) {
        return (
            <div className={`${width} ${height} bg-gray-200 flex items-center justify-center`}>
                <p className="text-gray-600">No banners available</p>
            </div>
        );
    }

    const currentBanner = banners[currentIndex];

    return (
        <div className={`${width} relative overflow-hidden group mt-3`}>
            {/* Slider Container */}
            <div className={`${height} relative bg-gray-900 overflow-hidden flex items-center`}>
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {/* Banner Image */}
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12 lg:px-16">
                            <div className="max-w-2xl text-white">
                                {/* Title */}
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                                    {banner.title}
                                </h2>

                                {/* Description */}
                                <p className="text-base md:text-lg text-gray-200 mb-6 drop-shadow-md line-clamp-3">
                                    {banner.description}
                                </p>

                                {/* CTA Button */} 
                                <Link
                                    href={banner.link}
                                    className="inline-block font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                    style={{background:color.buttonBg, color:color.buttonText}}
                                >
                                    {banner.linkText || "Explore Now"}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Left Arrow Button */}
                {showArrows && banners.length > 1 && (
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white py-3 transition-all rounded duration-200 backdrop-blur"
                        aria-label="Previous banner"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                {/* Right Arrow Button */}
                {showArrows && banners.length > 1 && (
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white py-3 rounded transition-all duration-200 backdrop-blur"
                        aria-label="Next banner"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}

                {/* Dots Navigation */}
                {showDots && banners.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "bg-white w-8"
                                        : "bg-white/50 hover:bg-white/70"
                                    }`}
                                aria-label={`Go to banner ${index + 1}`}
                            />
                        ))}
                    </div>
                )}


            </div>
        </div>
    );
}

export default SliderFullScreenBanner;