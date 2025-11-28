'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const carouselImages = [
    '/images/biblioteket/carousel/032sAY52bekg.webp',
    '/images/biblioteket/carousel/032ykUTcS78m.webp',
    '/images/biblioteket/carousel/174621.webp',
    '/images/biblioteket/carousel/1789278.jpeg',
    '/images/biblioteket/carousel/2_Handkoloritt-postkort.jpg',
    '/images/biblioteket/carousel/4338128713_fe786f7d44_b.jpg',
    '/images/biblioteket/carousel/708c99da-a515-4d0c-9238-d34a6a4fd0af.webp',
    '/images/biblioteket/carousel/agdrggraeer.jpg',
    '/images/biblioteket/carousel/akers-1926.webp',
    '/images/biblioteket/carousel/Akerselva-river.jpg',
    '/images/biblioteket/carousel/Akerskart_1938_Nydalen.jpg',
    '/images/biblioteket/carousel/Blå-Artist-Chanoir-scaled.jpg',
    '/images/biblioteket/carousel/Byboligen_Sentrumsgate+paa+slutten+av+60-tallet_Foto+Jon+Guttu.webp',
    '/images/biblioteket/carousel/fotosadik2.png',
    '/images/biblioteket/carousel/Grünerløkka-Torshovlinjen_map_old.jpg',
    '/images/biblioteket/carousel/Hønse-lovisa-1-450x338.jpeg',
    '/images/biblioteket/carousel/IMG_20200815_173321_935241594571875.jpg',
    '/images/biblioteket/carousel/IMG_3744.jpeg',
    '/images/biblioteket/carousel/IMG_9215-600x403.jpeg',
    '/images/biblioteket/carousel/langgataplan.jpg',
    '/images/biblioteket/carousel/Nedre_Foss_park_med_lekeanlegget_hovedbygningen_og_siloen_Grünerløkka_studenhus.jpg',
    '/images/biblioteket/carousel/niels-dahls-1.jpg',
    '/images/biblioteket/carousel/Oslofrokost1952.jpg',
    '/images/biblioteket/carousel/padling-pa-akerselva.jpg',
    '/images/biblioteket/carousel/standard_compressed_15181473097_b695e3851c_o.jpg',
    '/images/biblioteket/carousel/standard_Grünerløkka.jpg',
    '/images/biblioteket/carousel/uteservering_pa_schous_hjornet_vo05077_foto_thomas_johannessen-2-2.jpg',
    '/images/biblioteket/carousel/utstilling---krig-og-hverdagsliv---rigmor-dahl-delphin---ak0172u.jpg',
    '/images/biblioteket/carousel/Zerofsky-Berlin-Gentrification.webp'
];

export default function ImageCarousel({ images = carouselImages }: { images?: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-2xl group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`Bilde ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        priority={currentIndex === 0}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 opacity-0 group-hover:opacity-100"
                aria-label="Forrige bilde"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 opacity-0 group-hover:opacity-100"
                aria-label="Neste bilde"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.slice(0, 5).map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${idx === currentIndex % 5 ? 'w-8 bg-white' : 'w-2 bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
