import React from 'react';
import type { Project } from '../../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        // The classes here are now permanent dark styles
        <div className="group relative bg-black/30 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-800 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 flex flex-col h-full">
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-gray-100">
                    {project.icon}
                    <span>{project.title}</span>
                    {project.inProgress && (
                        <span className="text-xs font-medium bg-yellow-400/20 text-yellow-300 py-1 px-2 rounded-full">
                            In Progress
                        </span>
                    )}
                </h3>

                {/* Text color is now permanently a light gray */}
                <p className="text-gray-400 mb-4 text-sm flex-grow">
                    {project.overview}
                </p>

                <div className="space-y-4 mb-4">
                    <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-200">Key Highlights:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                            {project.highlights.map((highlight, i) => (
                                <li key={i}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-200">My Contribution:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                            {project.contribution.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-200">Tech Stack & Tools:</h4>
                        <div className="space-y-1 text-gray-300">
                            {Object.entries(project.stack).map(([category, tools]) => (
                                <div key={category} className="text-xs">
                                    <span className="font-bold text-gray-200">{category}:</span>{" "}
                                    {tools.join(", ")}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-800">
                    <div className="flex justify-end space-x-4">
                        {project.frontendUrl && (
                            <a href={project.frontendUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium text-sm">
                                Frontend
                            </a>
                        )}
                        {project.backendUrl && (
                            <a href={project.backendUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium text-sm">
                                Backend
                            </a>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium text-sm">
                                Live Site
                            </a>
                        )}
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium text-sm">
                            Code
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;