"use client";

import { useState } from "react";
import { ResumeProvider } from "@/lib/resume-context";
import { InitialSelection } from "@/components/initial-selection";
import { DocumentUpload } from "@/components/document-upload";
import { useRouter } from "next/navigation";

type AppMode = "selection" | "document";

function HomeContent() {
  const router = useRouter();
  const [appMode, setAppMode] = useState<AppMode>("selection");

  const handleModeSelect = (mode: "manual" | "document") => {
    if (mode === "manual") {
      router.push("/builder");
    } else {
      setAppMode("document");
    }
  };

  const handleDocumentComplete = () => {
    router.push("/builder");
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

  return null;
}

export default function Home() {
  return (
    <ResumeProvider>
      <HomeContent />
    </ResumeProvider>
  );
}
