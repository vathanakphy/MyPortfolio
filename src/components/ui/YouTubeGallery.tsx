import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

// Types
export interface VideoItem {
    id: string;
    title: string;
    description?: string;
}

interface YouTubeGalleryProps {
    videos: VideoItem[];
    columns?: 1 | 2 | 3;
    title?: string;
}

interface VideoCardProps {
    video: VideoItem;
}

// Skeleton Loader Component
const SkeletonLoader = memo(() => (
    <div className="animate-pulse">
        <div className="aspect-video bg-gray-300 rounded-lg" />
        <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
    </div>
));
SkeletonLoader.displayName = "SkeletonLoader";

// Single Video Card with Intersection Observer
const VideoCard = memo(({ video }: VideoCardProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect(); // Stop observing once visible
                    }
                });
            },
            {
                rootMargin: "100px", // Start loading 100px before entering viewport
                threshold: 0.1,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            ref={containerRef}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1"
        >
            {/* Video Container with 16:9 aspect ratio */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
                {!isVisible ? (
                    // Placeholder before intersection
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-600/80 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Skeleton while loading */}
                        {!isLoaded && (
                            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse" />
                            </div>
                        )}
                        {/* Lite YouTube Embed */}
                        <div 
                            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={handleLoad}
                        >
                            <LiteYouTubeEmbed
                                id={video.id}
                                title={video.title}
                                poster="hqdefault"
                                webp={true}
                                noCookie={true}
                                onIframeAdded={handleLoad}
                            />
                        </div>
                    </>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Video Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                </h3>
                {video.description && (
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {video.description}
                    </p>
                )}
            </div>
        </div>
    );
});
VideoCard.displayName = "VideoCard";

// Main Gallery Component
const YouTubeGallery: React.FC<YouTubeGalleryProps> = memo(({ 
    videos, 
    columns = 2,
    title 
}) => {
    // Grid column classes
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    };

    if (!videos || videos.length === 0) {
        return null;
    }

    return (
        <section className="w-full">
            {title && (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    {title}
                </h2>
            )}
            
            <div className={`grid ${gridCols[columns]} gap-6 md:gap-8`}>
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    );
});
YouTubeGallery.displayName = "YouTubeGallery";

export default YouTubeGallery;
