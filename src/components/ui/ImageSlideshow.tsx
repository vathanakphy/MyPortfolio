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

  const goToSlide = (slideIndex: number) => setCurrentIndex(slideIndex);

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl shadow-md border border-gray-300">
      {urls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`${alt} - slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/800x600/cccccc/FFFFFF?text=Image+Not+Found";
          }}
        />
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {urls.map((_, index) => (
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
  );
};

export default ImageSlideshow;
