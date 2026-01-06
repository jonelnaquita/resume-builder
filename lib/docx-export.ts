import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import { ResumeData } from "./types";

export async function exportToDOCX(
  resumeData: ResumeData,
  filename: string = "resume.docx"
) {
  try {
    const { personalInfo, experience, education, skills, projects, certifications } = resumeData;

    // Helper function to format dates
    const formatDate = (
      startDate: string,
      endDate: string,
      current?: boolean
    ) => {
      const formatMonth = (date: string) => {
        if (!date) return "";
        const [year, month] = date.split("-");
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
      };

      const start = formatMonth(startDate);
      const end = current ? "Present" : formatMonth(endDate);
      return `${start} - ${end}`;
    };

    // Create document sections
    const sections: Paragraph[] = [];

    // Header - Personal Info
    sections.push(
      new Paragraph({
        text: personalInfo.fullName || "Your Name",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      })
    );

    // Contact Info
    const contactParts: string[] = [];
    if (personalInfo.email) contactParts.push(personalInfo.email);
    if (personalInfo.phone) contactParts.push(personalInfo.phone);
    if (personalInfo.location) contactParts.push(personalInfo.location);

    if (contactParts.length > 0) {
      sections.push(
        new Paragraph({
          text: contactParts.join(" • "),
          alignment: AlignmentType.CENTER,
          spacing: { after: 50 },
        })
      );
    }

    // Links
    const linkParts: string[] = [];
    if (personalInfo.linkedin) linkParts.push(personalInfo.linkedin);
    if (personalInfo.website) linkParts.push(personalInfo.website);

    if (linkParts.length > 0) {
      sections.push(
        new Paragraph({
          text: linkParts.join(" • "),
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
    }

    // Professional Summary
    if (personalInfo.summary) {
      sections.push(
        new Paragraph({
          text: "PROFESSIONAL SUMMARY",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: "000000",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );
      sections.push(
        new Paragraph({
          text: personalInfo.summary,
          spacing: { after: 200, line: 240 },
        })
      );
    }

    // Experience
    if (experience.length > 0) {
      sections.push(
        new Paragraph({
          text: "EXPERIENCE",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: "000000",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

      experience.forEach((exp) => {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.position,
                bold: true,
              }),
              new TextRun({
                text: `\t${formatDate(exp.startDate, exp.endDate, exp.current)}`,
                italics: true,
              }),
            ],
            spacing: { after: 50 },
            tabStops: [
              {
                type: "right",
                position: 9000,
              },
            ],
          })
        );

        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.company,
                italics: true,
              }),
              new TextRun({
                text: `\t${exp.location}`,
              }),
            ],
            spacing: { after: 50 },
            tabStops: [
              {
                type: "right",
                position: 9000,
              },
            ],
          })
        );

        // Description bullet points
        const descriptionLines = exp.description
          .split("\n")
          .filter((line) => line.trim());

        descriptionLines.forEach((line) => {
          sections.push(
            new Paragraph({
              text: line.trim(),
              bullet: {
                level: 0,
              },
              spacing: { after: 50, line: 240 },
            })
          );
        });

        sections.push(
          new Paragraph({
            text: "",
            spacing: { after: 100 },
          })
        );
      });
    }

    // Education
    if (education.length > 0) {
      sections.push(
        new Paragraph({
          text: "EDUCATION",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: "000000",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

      education.forEach((edu) => {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.institution,
                bold: true,
              }),
              new TextRun({
                text: `\t${formatDate(edu.startDate, edu.endDate)}`,
                italics: true,
              }),
            ],
            spacing: { after: 50 },
            tabStops: [
              {
                type: "right",
                position: 9000,
              },
            ],
          })
        );

        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.degree} in ${edu.field}`,
                italics: true,
              }),
              new TextRun({
                text: `\t${edu.location}`,
              }),
            ],
            spacing: { after: 50 },
            tabStops: [
              {
                type: "right",
                position: 9000,
              },
            ],
          })
        );

        if (edu.gpa) {
          sections.push(
            new Paragraph({
              text: `GPA: ${edu.gpa}`,
              spacing: { after: 100 },
            })
          );
        }

        sections.push(
          new Paragraph({
            text: "",
            spacing: { after: 100 },
          })
        );
      });
    }

    // Skills
    if (skills.length > 0) {
      sections.push(
        new Paragraph({
          text: "SKILLS",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: "000000",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

      skills.forEach((skill) => {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${skill.category}: `,
                bold: true,
              }),
              new TextRun({
                text: skill.skills.join(", "),
              }),
            ],
            spacing: { after: 50 },
          })
        );
      });

      sections.push(
        new Paragraph({
          text: "",
          spacing: { after: 100 },
        })
      );
    }

    // Projects
    if (projects.length > 0) {
      sections.push(
        new Paragraph({
          text: "PROJECTS",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: "000000",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

      projects.forEach((project) => {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: project.name,
                bold: true,
              }),
              new TextRun({
                text: `\t${formatDate(project.startDate, project.endDate)}`,
                italics: true,
              }),
            ],
            spacing: { after: 50 },
            tabStops: [
              {
                type: "right",
                position: 9000,
              },
            ],
          })
        );

        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Technologies: ",
                bold: true,
              }),
              new TextRun({
                text: project.technologies,
              }),
            ],
            spacing: { after: 50 },
          })
        );

        sections.push(
          new Paragraph({
            text: project.description,
            spacing: { after: 50, line: 240 },
          })
        );

        if (project.link) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: project.link,
                  italics: true,
                }),
              ],
              spacing: { after: 100 },
            })
          );
        }

        sections.push(
          new Paragraph({
            text: "",
            spacing: { after: 100 },
          })
        );
      });
    }

    // Certifications
    if (certifications.length > 0) {
      sections.push(
        new Paragraph({
          text: "CERTIFICATIONS",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: "000000",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

      certifications.forEach((cert) => {
        const certDate = cert.date
          ? (() => {
              const [year, month] = cert.date.split("-");
              const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
              ];
              return `${monthNames[parseInt(month) - 1]} ${year}`;
            })()
          : "";

        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cert.name,
                bold: true,
              }),
              new TextRun({
                text: `\t${certDate}`,
                italics: true,
              }),
            ],
            spacing: { after: 50 },
            tabStops: [
              {
                type: "right",
                position: 9000,
              },
            ],
          })
        );

        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cert.issuer,
                italics: true,
              }),
            ],
            spacing: { after: 50 },
          })
        );

        if (cert.link) {
          sections.push(
            new Paragraph({
              text: cert.link,
              spacing: { after: 100 },
            })
          );
        }

        sections.push(
          new Paragraph({
            text: "",
            spacing: { after: 100 },
          })
        );
      });
    }

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: sections,
        },
      ],
    });

    // Generate and download the DOCX file
    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);

    return true;
  } catch (error) {
    console.error("Error generating DOCX:", error);
    alert("Failed to generate DOCX. Please try again.");
    throw error;
  }
}
