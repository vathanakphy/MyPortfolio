import React, { useState, useEffect } from 'react';

// Defines the structure for a single slide
interface Slide {
  url: string;
  caption: string;
}

// Defines the props the component accepts
interface CaptionedSlideshowProps {
  slides: Slide[];
  interval?: number; // Optional: time in milliseconds between slides
}

const CaptionedSlideshow: React.FC<CaptionedSlideshowProps> = ({ slides, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // This effect handles the auto-play timer
  useEffect(() => {
    // Don't start a timer if there's only one slide
    if (slides.length <= 1) return;

    const timer = setTimeout(() => {
      // Move to the next slide, looping back to the start if at the end
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    // Clean up the timer when the slide changes or the component unmounts
    return () => clearTimeout(timer);
  }, [currentIndex, slides.length, interval]);

  // Function to allow users to jump to a specific slide
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-md bg-black/20">
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
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
            />
            ))}
        </div>
      </div>
      {/* Caption Text */}
      <div className="mt-2 text-center text-sm text-gray-300 h-10 flex items-center justify-center">
        <p>{slides[currentIndex]?.caption || ''}</p>
      </div>
    </div>
  );
};

export default CaptionedSlideshow;