import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

// Register Libre Baskerville font family using local font files
Font.register({
  family: "Libre Baskerville",
  fonts: [
    {
      src: "/font/LibreBaskerville-Regular.ttf",
      fontWeight: 400,
      fontStyle: "normal",
    },
    {
      src: "/font/LibreBaskerville-Italic.ttf",
      fontWeight: 400,
      fontStyle: "italic",
    },
    {
      src: "/font/LibreBaskerville-Bold.ttf",
      fontWeight: 700,
      fontStyle: "normal",
    },
    {
      src: "/font/LibreBaskerville-BoldItalic.ttf",
      fontWeight: 700,
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Libre Baskerville",
    fontSize: 10,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 50,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 15,
    paddingBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 6,
    color: "#111827",
  },
  contactInfo: {
    fontSize: 10,
    textAlign: "center",
    color: "#374151",
    marginBottom: 2,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 2,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#111827",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1f2937",
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#111827",
  },
  experienceDate: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#4b5563",
  },
  companyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  companyName: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#374151",
  },
  location: {
    fontSize: 9,
    color: "#4b5563",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: "#111827",
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1f2937",
  },
  educationItem: {
    marginBottom: 8,
  },
  skillCategory: {
    fontSize: 10,
    color: "#1f2937",
    marginBottom: 4,
  },
  skillCategoryName: {
    fontWeight: 700,
    color: "#111827",
  },
  projectItem: {
    marginBottom: 8,
  },
  projectTech: {
    fontSize: 10,
    marginBottom: 2,
    color: "#1f2937",
  },
  projectTechLabel: {
    fontWeight: 600,
    color: "#111827",
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1f2937",
  },
  projectLink: {
    fontSize: 9,
    fontStyle: "italic",
    marginTop: 2,
    color: "#4b5563",
  },
  certItem: {
    marginBottom: 6,
  },
  certIssuer: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#374151",
  },
});

interface PDFDocumentProps {
  data: ResumeData;
}

const formatDate = (
  startDate: string,
  endDate: string,
  current?: boolean
): string => {
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

export const PDFDocument: React.FC<PDFDocumentProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } =
    data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Your Name"}
          </Text>
          <Text style={styles.contactInfo}>
            {[
              personalInfo.email,
              personalInfo.phone,
              personalInfo.location,
            ]
              .filter(Boolean)
              .join(" • ")}
          </Text>
          {(personalInfo.linkedin || personalInfo.website) && (
            <Text style={styles.contactInfo}>
              {[personalInfo.linkedin, personalInfo.website]
                .filter(Boolean)
                .join(" • ")}
            </Text>
          )}
        </View>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{exp.position}</Text>
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate, exp.endDate, exp.current)}
                  </Text>
                </View>
                <View style={styles.companyRow}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.location}>{exp.location}</Text>
                </View>
                {exp.description
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, idx) => (
                    <View key={idx} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{line.trim()}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{edu.institution}</Text>
                  <Text style={styles.experienceDate}>
                    {formatDate(edu.startDate, edu.endDate)}
                  </Text>
                </View>
                <View style={styles.companyRow}>
                  <Text style={styles.companyName}>
                    {edu.degree} in {edu.field}
                  </Text>
                  <Text style={styles.location}>{edu.location}</Text>
                </View>
                {edu.gpa && (
                  <Text style={{ fontSize: 10, color: "#1f2937", marginTop: 2 }}>
                    GPA: {edu.gpa}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillCategory}>
                <Text>
                  <Text style={styles.skillCategoryName}>{skill.category}:</Text>{" "}
                  {skill.skills.join(", ")}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{project.name}</Text>
                  <Text style={styles.experienceDate}>
                    {formatDate(project.startDate, project.endDate)}
                  </Text>
                </View>
                <Text style={styles.projectTech}>
                  <Text style={styles.projectTechLabel}>Technologies:</Text>{" "}
                  {project.technologies}
                </Text>
                <Text style={styles.projectDescription}>
                  {project.description}
                </Text>
                {project.link && (
                  <Text style={styles.projectLink}>{project.link}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, index) => {
              const formattedDate = cert.date
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
                : "";

              return (
                <View key={index} style={styles.certItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{cert.name}</Text>
                    <Text style={styles.experienceDate}>{formattedDate}</Text>
                  </View>
                  <Text style={styles.certIssuer}>{cert.issuer}</Text>
                  {cert.link && (
                    <Text style={styles.projectLink}>{cert.link}</Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </Page>
    </Document>
  );
};
