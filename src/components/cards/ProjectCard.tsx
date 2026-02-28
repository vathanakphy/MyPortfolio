import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Github, Play, Download, Monitor, Video, Maximize2, X, Smartphone, ChevronLeft, ChevronRight, Image, Calendar, Info, GraduationCap } from "lucide-react";
import type { Project } from "../../types";
import { TechBadge, TechBadgeList } from "../ui/TechBadge";

// Helper to extract YouTube video ID from various URL formats
const extractYouTubeId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};

// Screenshot Slideshow Component
const ScreenshotSlideshow: React.FC<{ screenshots: string[]; title: string }> = ({ screenshots, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const goToPrevious = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    }, [screenshots.length]);

    const goToNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    }, [screenshots.length]);

    // Auto-advance every 4 seconds
    useEffect(() => {
        if (screenshots.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [screenshots.length]);

    return (
        <div className="absolute inset-0 bg-gray-900">
            {/* Current Image */}
            <img
                src={screenshots[currentIndex]}
                alt={`${title} screenshot ${currentIndex + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
            />

            {/* Loading placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <Image size={32} className="text-gray-600 animate-pulse" />
                </div>
            )}

            {/* Navigation arrows - only show if multiple screenshots */}
            {screenshots.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                        aria-label="Previous screenshot"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                        aria-label="Next screenshot"
                    >
                        <ChevronRight size={16} />
                    </button>
                </>
            )}

            {/* Dots indicator */}
            {screenshots.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {screenshots.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                                }`}
                            aria-label={`Go to screenshot ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Screenshot badge */}
            <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs font-medium rounded-md flex items-center gap-1 pointer-events-none">
                <Image size={12} />
                {currentIndex + 1} / {screenshots.length}
            </div>
        </div>
    );
};

type ModalType = 'none' | 'frontend' | 'youtube' | 'mobile' | 'details';

// Helper to parse "Mon YYYY" format to Date
const parseMonthYear = (dateStr: string): Date | null => {
    const months: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const parts = dateStr.split(' ');
    if (parts.length !== 2) return null;
    const month = months[parts[0]];
    const year = parseInt(parts[1]);
    if (month === undefined || isNaN(year)) return null;
    return new Date(year, month, 1);
};

// Helper to calculate weeks between dates
const calculateWeeks = (startDate: string, endDate?: string): number | null => {
    const start = parseMonthYear(startDate);
    if (!start) return null;
    const end = endDate && endDate !== "Present" ? parseMonthYear(endDate) : new Date();
    if (!end) return null;
    const diffMs = end.getTime() - start.getTime();
    const weeks = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
    return weeks > 0 ? weeks : null;
};

// Helper to format project duration with weeks
const formatDuration = (startDate: string, endDate?: string): string => {
    const weeks = calculateWeeks(startDate, endDate);
    const weeksStr = weeks ? ` (${weeks} weeks)` : '';
    if (!endDate || endDate === "Present") {
        return `${startDate} - Present${weeksStr}`;
    }
    return `${startDate} - ${endDate}${weeksStr}`;
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [showLivePreview, setShowLivePreview] = useState(false);
    const [modalType, setModalType] = useState<ModalType>('none');
    const [iframeScale, setIframeScale] = useState(1);

    // Check if demo is a YouTube link
    const youtubeVideoId = project.youtubeVideoId || (project.demo ? extractYouTubeId(project.demo) : null);
    const youtubeEmbedUrl = youtubeVideoId
        ? `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0`
        : null;

    // Check if it's a mobile app
    const isMobileApp = project.projectType === "Mobile Application";

    // Check if we can embed frontend
    const canEmbedFrontend = project.frontendUrl && !youtubeEmbedUrl;
    const hasYoutubeAndFrontend = youtubeEmbedUrl && project.frontendUrl;
    const showFrontendPreview = canEmbedFrontend || (hasYoutubeAndFrontend && showLivePreview);

    const openModal = (type: ModalType) => setModalType(type);
    const closeModal = () => setModalType('none');

    // Lock body scroll when modal is open
    useEffect(() => {
        if (modalType !== 'none') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [modalType]);

    // Calculate iframe scale for frontend and youtube modals based on viewport
    useEffect(() => {
        if (modalType === 'frontend' || modalType === 'youtube') {
            const calculateScale = () => {
                // Available space: 92% of viewport minus padding and header
                const maxWidth = window.innerWidth * 0.92 - 24; // 92vw - padding
                const maxHeight = window.innerHeight * 0.92 - 60; // 92vh - header - padding
                const scaleX = maxWidth / 1920;
                const scaleY = maxHeight / 1080;
                setIframeScale(Math.min(scaleX, scaleY));
            };
            calculateScale();
            window.addEventListener('resize', calculateScale);
            return () => window.removeEventListener('resize', calculateScale);
        }
    }, [modalType]);

    return (
        <>
            <div className="group bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full">

                {/* Media Section */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
                    {/* Toggle buttons when both YouTube and Frontend are available */}
                    {hasYoutubeAndFrontend && (
                        <div className="absolute top-2 right-2 z-10 flex gap-1 bg-black/50 rounded-lg p-1">
                            <button
                                onClick={() => setShowLivePreview(false)}
                                className={`p-1.5 rounded transition-colors cursor-pointer ${!showLivePreview ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
                                title="Watch Video"
                            >
                                <Video size={14} />
                            </button>
                            <button
                                onClick={() => setShowLivePreview(true)}
                                className={`p-1.5 rounded transition-colors cursor-pointer ${showLivePreview ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
                                title="Live Preview"
                            >
                                <Monitor size={14} />
                            </button>
                        </div>
                    )}

                    {/* Expand button for YouTube */}
                    {youtubeEmbedUrl && !showLivePreview && (
                        <button
                            onClick={() => openModal('youtube')}
                            className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors cursor-pointer"
                            title="Watch Larger"
                        >
                            <Maximize2 size={14} />
                        </button>
                    )}

                    {/* YouTube Video */}
                    {youtubeEmbedUrl && !showLivePreview && (
                        <iframe
                            src={youtubeEmbedUrl}
                            title={project.title}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            className="absolute inset-0 w-full h-full"
                        />
                    )}

                    {/* Live Frontend Preview - Desktop scaled view */}
                    {showFrontendPreview && (
                        <div className="absolute inset-0">
                            {/* Scaled desktop preview container */}
                            <div className="absolute inset-0 overflow-hidden">
                                <iframe
                                    src={project.frontendUrl}
                                    title={`${project.title} - Live Preview`}
                                    loading="lazy"
                                    className="border-0 pointer-events-none"
                                    style={{
                                        width: '1280px',
                                        height: '720px',
                                        transform: 'scale(0.35)',
                                        transformOrigin: 'top left',
                                    }}
                                />
                            </div>
                            {/* Click overlay to open modal */}
                            <button
                                onClick={() => openModal('frontend')}
                                className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center group"
                            >
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Maximize2 size={16} />
                                    Click to Interact
                                </div>
                            </button>
                            {/* Desktop preview badge */}
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-md flex items-center gap-1 pointer-events-none">
                                <Monitor size={12} />
                                Desktop Preview
                            </div>
                        </div>
                    )}

                    {/* Screenshots slideshow for projects without video or frontend */}
                    {!youtubeEmbedUrl && !canEmbedFrontend && project.screenshots && project.screenshots.length > 0 && (
                        <ScreenshotSlideshow screenshots={project.screenshots} title={project.title} />
                    )}

                    {/* Placeholder for projects without video, frontend, or screenshots */}
                    {!youtubeEmbedUrl && !canEmbedFrontend && (!project.screenshots || project.screenshots.length === 0) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <div className="text-6xl mb-2 opacity-50">
                                {project.icon}
                            </div>
                            <span className="text-sm font-medium">{project.projectType}</span>
                            {/* Mobile app badge */}
                            {isMobileApp && youtubeVideoId && (
                                <button
                                    onClick={() => openModal('mobile')}
                                    className="mt-3 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <Smartphone size={14} />
                                    View Demo
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow">

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-2">
                        <div className="text-blue-500 flex-shrink-0 mt-0.5">
                            {project.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                    {project.title}
                                </h3>
                                {project.inProgress && (
                                    <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                        In Progress
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-blue-600 font-medium">
                                {project.projectType}
                            </span>
                        </div>
                    </div>

                    {/* Date/Duration & Academic Year */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <span>{formatDuration(project.startDate, project.endDate)}</span>
                        </div>
                        {project.academicYear && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                                <GraduationCap size={12} />
                                <span>{project.academicYear}</span>
                            </div>
                        )}
                    </div>

                    {/* Overview - Truncated */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                        {project.overview}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mb-3">
                        <TechBadgeList techs={Object.values(project.stack).flat()} limit={5} />
                    </div>

                    {/* View Details Button */}
                    <div className="flex-grow flex items-end">
                        <button
                            onClick={() => openModal('details')}
                            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
                        >
                            <Info size={16} />
                            View Details
                        </button>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-100 pt-3 mt-auto flex flex-wrap justify-end gap-2">
                        {project.gameFile && (
                            <a
                                href={project.gameFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                            >
                                <Download size={12} />
                                Download
                            </a>
                        )}

                        {/* YouTube popup button */}
                        {youtubeVideoId && (
                            <>
                                <button
                                    onClick={() => openModal(isMobileApp ? 'mobile' : 'youtube')}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 cursor-pointer"
                                >
                                    {isMobileApp ? <Smartphone size={12} /> : <Play size={12} />}
                                    {isMobileApp ? 'Mobile Demo' : 'Watch Demo'}
                                </button>
                                <a
                                    href={`https://youtu.be/${youtubeVideoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
                                    title="Watch on YouTube"
                                    style={{ marginLeft: '0.25rem' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16" className="inline-block">
                                        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.566A2.994 2.994 0 0 0 .502 6.186C0 8.347 0 12 0 12s0 3.653.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.653 24 12 24 12s0-3.653-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    YouTube
                                </a>
                            </>
                        )}

                        {project.frontendUrl && (
                            <button
                                onClick={() => openModal('frontend')}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 cursor-pointer"
                            >
                                <Monitor size={12} />
                                Try Live
                            </button>
                        )}

                        {project.frontendUrl && (
                            <a
                                href={project.frontendUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 cursor-pointer"
                            >
                                <ExternalLink size={12} />
                                Open Site
                            </a>
                        )}

                        {project.backendUrl && (
                            <a
                                href={project.backendUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 cursor-pointer"
                            >
                                <ExternalLink size={12} />
                                API
                            </a>
                        )}

                        {project.codeUrl && (
                            <a
                                href={project.codeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                            >
                                <Github size={12} />
                                Code
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Overlay - Rendered via Portal to document.body */}
            {modalType !== 'none' && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 cursor-pointer"
                    onClick={closeModal}
                >
                    {/* Frontend Modal */}
                    {modalType === 'frontend' && project.frontendUrl && (
                        <div
                            className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Browser Chrome Header */}
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={closeModal}
                                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
                                            title="Close"
                                        />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-700 rounded px-2 py-1 text-xs text-gray-300 max-w-[400px] truncate">
                                        <Monitor size={12} className="text-gray-400 flex-shrink-0" />
                                        {project.frontendUrl}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <a
                                        href={project.frontendUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors cursor-pointer"
                                        title="Open in new tab"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                    <button
                                        onClick={closeModal}
                                        className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded transition-colors cursor-pointer"
                                        title="Close"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                            {/* Scaled 1920x1080 Desktop View - Container fits exactly to scaled content */}
                            <div className="bg-gray-800 p-3">
                                <div
                                    className="relative overflow-hidden rounded-md bg-white"
                                    style={{
                                        width: `${1920 * iframeScale}px`,
                                        height: `${1080 * iframeScale}px`,
                                    }}
                                >
                                    <iframe
                                        src={project.frontendUrl}
                                        title={`${project.title} - Desktop Preview`}
                                        className="absolute top-0 left-0 border-0"
                                        style={{
                                            width: '1920px',
                                            height: '1080px',
                                            transformOrigin: 'top left',
                                            transform: `scale(${iframeScale})`,
                                        }}
                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* YouTube Modal - Same style as frontend preview */}
                    {modalType === 'youtube' && youtubeEmbedUrl && (
                        <div
                            className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Browser Chrome Header */}
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={closeModal}
                                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
                                            title="Close"
                                        />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-700 rounded px-2 py-1 text-xs text-gray-300 max-w-[400px] truncate">
                                        <Video size={12} className="text-red-500 flex-shrink-0" />
                                        {project.title}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors cursor-pointer"
                                        title="Open on YouTube"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                    <button
                                        onClick={closeModal}
                                        className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded transition-colors cursor-pointer"
                                        title="Close"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                            {/* Video Container - Scaled 16:9 fitting viewport */}
                            <div className="bg-gray-800 p-3">
                                <div
                                    className="relative overflow-hidden rounded-md bg-black"
                                    style={{
                                        width: `${1920 * iframeScale}px`,
                                        height: `${1080 * iframeScale}px`,
                                    }}
                                >
                                    <iframe
                                        src={`${youtubeEmbedUrl}&autoplay=1`}
                                        title={project.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full border-0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile App Demo Modal - Phone frame */}
                    {modalType === 'mobile' && youtubeEmbedUrl && (
                        <div
                            className="relative flex flex-col items-center cursor-default"
                            style={{ height: '80vh' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute -top-2 -right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors cursor-pointer"
                                title="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* Phone Frame */}
                            <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl h-full" style={{ aspectRatio: '9/19.5' }}>
                                {/* Phone notch */}
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10"></div>
                                {/* Phone screen */}
                                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                                    <iframe
                                        src={`${youtubeEmbedUrl}&autoplay=1`}
                                        title={project.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full border-0"
                                    />
                                </div>
                                {/* Home indicator */}
                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                            </div>

                            {/* Title below phone */}
                            <div className="mt-4 text-center">
                                <h3 className="text-white font-semibold">{project.title}</h3>
                                <p className="text-gray-400 text-sm flex items-center justify-center gap-1 mt-1">
                                    <Smartphone size={14} />
                                    Mobile Application Demo
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Project Details Modal */}
                    {modalType === 'details' && (
                        <div
                            className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl w-[90vw] max-w-3xl max-h-[85vh] cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Browser Chrome Header */}
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={closeModal}
                                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
                                            title="Close"
                                        />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-700 rounded px-2 py-1 text-xs text-gray-300 max-w-[400px] truncate">
                                        <Info size={12} className="text-gray-400 flex-shrink-0" />
                                        {project.title} - Details
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {project.codeUrl && (
                                        <a
                                            href={project.codeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors cursor-pointer"
                                            title="View Code"
                                        >
                                            <Github size={16} />
                                        </a>
                                    )}
                                    <button
                                        onClick={closeModal}
                                        className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded transition-colors cursor-pointer"
                                        title="Close"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="bg-white overflow-y-auto" style={{ maxHeight: 'calc(85vh - 44px)' }}>
                                {/* Header Section */}
                                <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm text-blue-500">
                                            {project.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm text-gray-600">{project.projectType}</span>
                                                {project.inProgress && (
                                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                                        In Progress
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Duration & Academic Year */}
                                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                                        <div className="flex items-center gap-2 text-gray-600 bg-white rounded-lg px-3 py-1.5 text-sm shadow-sm">
                                            <Calendar size={14} />
                                            <span>{formatDuration(project.startDate, project.endDate)}</span>
                                        </div>
                                        {project.academicYear && (
                                            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 rounded-lg px-3 py-1.5 text-sm">
                                                <GraduationCap size={14} />
                                                <span>{project.academicYear}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="p-6 space-y-5">

                                    {/* Overview */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                                        <p className="text-gray-600 leading-relaxed">{project.overview}</p>
                                    </div>

                                    {/* Key Highlights */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Highlights</h3>
                                        <ul className="space-y-2">
                                            {project.highlights.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-600">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* My Contribution */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">My Contribution</h3>
                                        <ul className="space-y-2">
                                            {project.contribution.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-600">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-3">Tech Stack</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {Object.entries(project.stack).map(([category, tools]) => (
                                                <div key={category} className="bg-gray-50 rounded-lg p-3">
                                                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{category}</h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {tools.map((tool, i) => (
                                                            <TechBadge key={i} name={tool} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                                        {project.frontendUrl && (
                                            <a
                                                href={project.frontendUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                            >
                                                <ExternalLink size={14} />
                                                Visit Website
                                            </a>
                                        )}
                                        {project.codeUrl && (
                                            <a
                                                href={project.codeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                            >
                                                <Github size={14} />
                                                View Code
                                            </a>
                                        )}
                                        {youtubeVideoId && (
                                            <button
                                                onClick={() => setModalType(isMobileApp ? 'mobile' : 'youtube')}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                                            >
                                                <Play size={14} />
                                                Watch Demo
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>,
                document.body
            )}
        </>
    );
};

export default ProjectCard;
