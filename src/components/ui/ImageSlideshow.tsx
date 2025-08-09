import React, { useState, useEffect } from 'react';

interface ImageSlideshowProps {
  urls: string[];
  alt: string;
  interval?: number;
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ urls, alt, interval = 2500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (urls.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
    }, interval);

    return () => clearTimeout(timer);
  }, [currentIndex, urls.length, interval]);

  // NEW: Function to handle clicking on a dot
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full h-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
      <div className="w-full h-full">
        {urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${alt} - slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found";
            }}
          />
        ))}
      </div>
      
      {/* UPDATED: Dots are now clickable buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {urls.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)} // Added onClick handler
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`} // Added for accessibility
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;