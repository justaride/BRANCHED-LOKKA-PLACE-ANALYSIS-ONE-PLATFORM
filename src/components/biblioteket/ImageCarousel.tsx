'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageCarouselProps {
    images: string[];
    interval?: number; // milliseconds
}

export default function ImageCarousel({ images, interval = 4000 }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg" style={{ paddingBottom: '75%' }}>
            <div className="absolute inset-0">
                {images.map((image, index) => (
                    <div
                        key={image}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Historisk bilde ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${index === currentIndex
                                ? 'w-6 bg-white'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Gå til bilde ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
