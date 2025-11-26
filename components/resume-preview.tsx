"use client";

import { useResume } from "@/lib/resume-context";
import { forwardRef } from "react";

export const ResumePreview = forwardRef<HTMLDivElement>((_props, ref) => {
  const { resumeData } = useResume();
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
  } = resumeData;

  const formatDate = (
    startDate: string,
    endDate: string,
    current?: boolean
  ) => {
    const formatMonth = (date: string) => {
      if (!date) return "";
      const [year, month] = date.split("-");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const start = formatMonth(startDate);
    const end = current ? "Present" : formatMonth(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div
      ref={ref}
      className="resume-preview bg-white shadow-lg mx-auto font-serif"
      style={{
        width: "210mm",
        maxHeight: "297mm",
        padding: "12mm 15mm",
      }}
    >
      {/* Header */}
      <header className="mb-4 pb-2">
        <h1 className="text-lg font-bold text-center mb-1.5 tracking-tight text-gray-900">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-center text-[10px] space-y-0.5 text-gray-700">
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {personalInfo.email && (
              <span className="font-medium">{personalInfo.email}</span>
            )}
            {personalInfo.phone && <span className="text-gray-400">•</span>}
            {personalInfo.phone && (
              <span className="font-medium">{personalInfo.phone}</span>
            )}
            {personalInfo.location && <span className="text-gray-400">•</span>}
            {personalInfo.location && (
              <span className="font-medium">{personalInfo.location}</span>
            )}
          </div>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {personalInfo.linkedin && (
              <span className="font-medium">{personalInfo.linkedin}</span>
            )}
            {personalInfo.website && personalInfo.linkedin && (
              <span className="text-gray-400">•</span>
            )}
            {personalInfo.website && (
              <span className="font-medium">{personalInfo.website}</span>
            )}
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold border-b border-gray-800 pb-0.5 mb-1.5 uppercase tracking-wider text-gray-900">
            Professional Summary
          </h2>
          <p className="text-[10px] leading-relaxed text-gray-800">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold border-b border-gray-800 pb-0.5 mb-1.5 uppercase tracking-wider text-gray-900">
            Experience
          </h2>
          <div className="space-y-2.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[10px] text-gray-900">
                    {exp.position}
                  </h3>
                  <span className="text-[9px] italic text-gray-600 font-medium">
                    {formatDate(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-[10px] italic text-gray-700">
                    {exp.company}
                  </span>
                  <span className="text-[9px] text-gray-600">
                    {exp.location}
                  </span>
                </div>
                <ul className="text-[10px] leading-relaxed text-gray-800 space-y-0.5">
                  {exp.description
                    .split("\n")
                    .filter((line) => line.trim())
                    .map((line, idx) => (
                      <li key={idx} className="flex gap-1.5">
                        <span className="text-gray-900">•</span>
                        <span className="flex-1">{line.trim()}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold border-b border-gray-800 pb-0.5 mb-1.5 uppercase tracking-wider text-gray-900">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[10px] text-gray-900">
                    {edu.institution}
                  </h3>
                  <span className="text-[9px] italic text-gray-600 font-medium">
                    {formatDate(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] italic text-gray-700">
                    {edu.degree} in {edu.field}
                  </span>
                  <span className="text-[9px] text-gray-600">
                    {edu.location}
                  </span>
                </div>
                {edu.gpa && (
                  <div className="text-[10px] text-gray-800 mt-0.5">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold border-b border-gray-800 pb-0.5 mb-1.5 uppercase tracking-wider text-gray-900">
            Skills
          </h2>
          <div className="space-y-1">
            {skills.map((skill) => (
              <div key={skill.id} className="text-[10px] text-gray-800">
                <span className="font-bold text-gray-900">
                  {skill.category}:
                </span>{" "}
                {skill.skills.join(", ")}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold border-b border-gray-800 pb-0.5 mb-1.5 uppercase tracking-wider text-gray-900">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[10px] text-gray-900">
                    {project.name}
                  </h3>
                  <span className="text-[9px] italic text-gray-600 font-medium">
                    {formatDate(project.startDate, project.endDate)}
                  </span>
                </div>
                <div className="text-[10px] mb-0.5 text-gray-800">
                  <span className="font-semibold text-gray-900">
                    Technologies:
                  </span>{" "}
                  {project.technologies}
                </div>
                <p className="text-[10px] leading-relaxed text-gray-800">
                  {project.description}
                </p>
                {project.link && (
                  <div className="text-[9px] italic mt-0.5 text-gray-600">
                    {project.link}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold border-b border-gray-800 pb-0.5 mb-1.5 uppercase tracking-wider text-gray-900">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-[10px]">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-[10px] text-gray-900">
                    {cert.name}
                  </span>
                  <span className="text-[9px] italic text-gray-600 font-medium">
                    {cert.date
                      ? (() => {
                          const [year, month] = cert.date.split("-");
                          const monthNames = [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ];
                          return `${monthNames[parseInt(month) - 1]} ${year}`;
                        })()
                      : ""}
                  </span>
                </div>
                <div className="italic text-gray-700 text-[10px]">
                  {cert.issuer}
                </div>
                {cert.link && (
                  <div className="text-[9px] mt-0.5 text-gray-600">
                    {cert.link}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";
