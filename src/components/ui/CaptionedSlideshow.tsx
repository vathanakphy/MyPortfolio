import React, { useState, useEffect } from 'react';

interface Slide {
  url: string;
  caption: string;
}

interface CaptionedSlideshowProps {
  slides: Slide[];
  interval?: number;
}

const CaptionedSlideshow: React.FC<CaptionedSlideshowProps> = ({ slides, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [currentIndex, slides.length, interval]);

  const goToSlide = (slideIndex: number) => setCurrentIndex(slideIndex);

  return (
    <div className="w-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-md bg-white border border-gray-300">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.url}
            alt={slide.caption}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/800x600/cccccc/FFFFFF?text=Image+Error";
            }}
          />
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-blue-200 hover:bg-blue-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Caption Text */}
      <div className="mt-2 text-center text-sm text-gray-800 min-h-[2.5rem] flex items-center justify-center">
        <p>{slides[currentIndex]?.caption || ''}</p>
      </div>
    </div>
  );
};

export default CaptionedSlideshow;
