import { pdf } from "@react-pdf/renderer";
import React from "react";
import { PDFDocument } from "@/components/pdf-document";
import { ResumeData } from "./types";

export async function exportToPDF(
  resumeData: ResumeData,
  filename: string = "resume.pdf"
) {
  try {
    // Generate PDF blob from React PDF component
    const blob = await pdf(
      React.createElement(PDFDocument, { data: resumeData })
    ).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
    throw error;
  }
}

// Use browser print dialog for better rendering
export function printToPDF() {
  window.print();
}
