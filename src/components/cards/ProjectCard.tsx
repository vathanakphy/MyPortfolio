import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Github, Play, Download, ChevronDown, ChevronUp, Monitor, Video, Maximize2, X, Smartphone } from "lucide-react";
import type { Project } from "../../types";

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

type ModalType = 'none' | 'frontend' | 'youtube' | 'mobile';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);
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
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full">
                
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

                    {/* Placeholder for projects without video or frontend */}
                    {!youtubeEmbedUrl && !canEmbedFrontend && (
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
                    <div className="flex items-start gap-3 mb-3">
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

                    {/* Overview - Truncated */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                        {project.overview}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {Object.values(project.stack).flat().slice(0, 5).map((tech, i) => (
                            <span 
                                key={i} 
                                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                            >
                                {tech}
                            </span>
                        ))}
                        {Object.values(project.stack).flat().length > 5 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                                +{Object.values(project.stack).flat().length - 5}
                            </span>
                        )}
                    </div>

                    {/* Expandable Details */}
                    <div className="flex-grow">
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 mb-2 cursor-pointer"
                        >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            {isExpanded ? "Hide Details" : "View Details"}
                        </button>

                        {isExpanded && (
                            <div className="space-y-3 text-sm text-gray-700 border-t border-gray-100 pt-3">
                                {/* Full Overview */}
                                <p className="text-gray-600">{project.overview}</p>
                                
                                {/* Highlights */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Key Highlights</h4>
                                    <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                                        {project.highlights.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Contribution */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">My Contribution</h4>
                                    <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                                        {project.contribution.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Tech Stack</h4>
                                    <div className="space-y-0.5 text-gray-600">
                                        {Object.entries(project.stack).map(([category, tools]) => (
                                            <div key={category}>
                                                <span className="font-medium">{category}:</span> {tools.join(", ")}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
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
                            <button
                                onClick={() => openModal(isMobileApp ? 'mobile' : 'youtube')}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 cursor-pointer"
                            >
                                {isMobileApp ? <Smartphone size={12} /> : <Play size={12} />}
                                {isMobileApp ? 'Mobile Demo' : 'Watch Demo'}
                            </button>
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
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 cursor-pointer"
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
                </div>,
                document.body
            )}
        </>
    );
};

export default ProjectCard;
