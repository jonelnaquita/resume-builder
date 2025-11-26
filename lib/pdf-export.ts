import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export async function exportToPDF(
  element: HTMLElement,
  filename: string = "resume.pdf"
) {
  try {
    // Wait for fonts to load
    await document.fonts.ready;

    // Wait for rendering to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    // A4 dimensions in mm
    const PDF_WIDTH = 210;
    const PDF_HEIGHT = 297;

    // Get actual element dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Generate high-quality PNG of the exact element as displayed
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      width: elementWidth,
      height: elementHeight,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Calculate image dimensions to fit in PDF while maintaining aspect ratio
    const imgWidth = PDF_WIDTH;
    const imgHeight = (elementHeight * PDF_WIDTH) / elementWidth;

    // Calculate if content truly exceeds one page (with 2mm tolerance)
    if (imgHeight <= PDF_HEIGHT + 2) {
      // Content fits in one page - just add it
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        imgWidth,
        Math.min(imgHeight, PDF_HEIGHT),
        undefined,
        "FAST"
      );
    } else {
      // Multiple pages needed
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= PDF_HEIGHT;

      // Add remaining pages
      while (heightLeft > 2) {
        // Only add page if more than 2mm of content remains
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          dataUrl,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= PDF_HEIGHT;
      }
    }

    // Save PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert(
      "Failed to generate PDF. Please try using the Print button and save as PDF instead."
    );
    throw error;
  }
}

// Use browser print dialog for better rendering
export function printToPDF() {
  window.print();
}
