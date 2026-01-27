import React from "react";
import type { Project } from "../../types";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
            
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className="text-blue-500 flex-shrink-0">
                    {project.icon}
                </div>

                <div>
                    <h3 className="text-xl font-bold text-black flex items-center gap-2">
                        {project.title}
                        {project.inProgress && (
                            <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                In Progress
                            </span>
                        )}
                    </h3>
                    <p className="text-gray-700 mt-1">
                        {project.overview}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="border-t border-gray-300 pt-4 space-y-4 text-sm text-gray-800 flex-grow">
                
                {/* Highlights */}
                <div>
                    <h4 className="font-semibold text-black mb-2">
                        Key Highlights
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                        {project.highlights.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Contribution */}
                <div>
                    <h4 className="font-semibold text-black mb-2">
                        My Contribution
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                        {project.contribution.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Tech Stack */}
                <div>
                    <h4 className="font-semibold text-black mb-2">
                        Tech Stack & Tools
                    </h4>
                    <div className="space-y-1">
                        {Object.entries(project.stack).map(([category, tools]) => (
                            <div key={category}>
                                <span className="font-semibold text-black">
                                    {category}:
                                </span>{" "}
                                {tools.join(", ")}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-4 mt-4 flex justify-end gap-4 text-sm font-medium">
                {project.gameFile && (
                    <a
                        href={project.gameFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        File
                    </a>
                )}

                {project.demo && project.demo !== "#" && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Demo
                    </a>
                )}

                <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Code
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
