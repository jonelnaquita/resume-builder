"use client";

import { useRef, useState } from "react";
import { ResumeProvider, useResume } from "@/lib/resume-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "@/components/resume-preview";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";
import { ExperienceForm } from "@/components/forms/experience-form";
import { EducationForm } from "@/components/forms/education-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { ProjectsForm } from "@/components/forms/projects-form";
import { CertificationsForm } from "@/components/forms/certifications-form";
import { InitialSelection } from "@/components/initial-selection";
import { DocumentUpload } from "@/components/document-upload";
import { exportToPDF } from "@/lib/pdf-export";
import { Download, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

type AppMode = "selection" | "manual" | "document" | "builder";

function ResumeBuilderContent() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [appMode, setAppMode] = useState<AppMode>("selection");
  const { resumeData } = useResume();

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await exportToPDF(resumeData, "my-resume.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleModeSelect = (mode: "manual" | "document") => {
    if (mode === "manual") {
      setAppMode("builder");
    } else {
      setAppMode("document");
    }
  };

  const handleDocumentComplete = () => {
    setAppMode("builder");
  };

  const handleBackToSelection = () => {
    setAppMode("selection");
  };

  // Show initial selection screen
  if (appMode === "selection") {
    return <InitialSelection onSelectMode={handleModeSelect} />;
  }

  // Show document upload screen
  if (appMode === "document") {
    return (
      <DocumentUpload
        onComplete={handleDocumentComplete}
        onBack={handleBackToSelection}
      />
    );
  }

  // Show resume builder (manual or after document upload)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 no-print backdrop-blur-md bg-white/80"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-7 h-7 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Resume Builder
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Create your professional resume
                </p>
              </div>
            </div>
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Two Panel Layout */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Panel - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 no-print"
          >
            <div className="bg-white rounded-xl border border-gray-200">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6 gap-1 h-auto bg-transparent p-0 border-b border-gray-200">
                  <TabsTrigger
                    value="personal"
                    className="text-xs lg:text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 data-[state=active]:text-blue-700 hover:bg-gray-50 transition-colors py-3"
                  >
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="text-xs lg:text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 data-[state=active]:text-blue-700 hover:bg-gray-50 transition-colors py-3"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="text-xs lg:text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 data-[state=active]:text-blue-700 hover:bg-gray-50 transition-colors py-3"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="text-xs lg:text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 data-[state=active]:text-blue-700 hover:bg-gray-50 transition-colors py-3"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="text-xs lg:text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 data-[state=active]:text-blue-700 hover:bg-gray-50 transition-colors py-3"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="certifications"
                    className="text-xs lg:text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 data-[state=active]:text-blue-700 hover:bg-gray-50 transition-colors py-3"
                  >
                    Certificates
                  </TabsTrigger>
                </TabsList>

                <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                  <TabsContent value="personal" className="mt-0">
                    <PersonalInfoForm />
                  </TabsContent>

                  <TabsContent value="experience" className="mt-0">
                    <ExperienceForm />
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <EducationForm />
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <SkillsForm />
                  </TabsContent>

                  <TabsContent value="projects" className="mt-0">
                    <ProjectsForm />
                  </TabsContent>

                  <TabsContent value="certifications" className="mt-0">
                    <CertificationsForm />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-gray-50 rounded-xl p-6 overflow-auto max-h-[calc(100vh-120px)] border border-gray-200 no-print">
              <div className="mb-4 no-print">
                <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live Preview
                </h3>
              </div>
            </div>
            {/* Resume Preview Container - visible in print */}
            <div className="flex justify-center resume-preview-container">
              <ResumePreview ref={resumeRef} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
}
