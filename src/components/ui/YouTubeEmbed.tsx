import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  description,
  autoplay = false,
  className = '',
}) => {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-video">
        <iframe
          src={embedUrl}
          title={title || 'YouTube video'}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
