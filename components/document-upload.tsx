"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useResume } from "@/lib/resume-context";

interface DocumentUploadProps {
  onComplete: () => void;
  onBack: () => void;
}

export function DocumentUpload({ onComplete, onBack }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { loadResumeData } = useResume();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    // Validate file type - Images only
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPEG or PNG file.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(file);
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  const processDocument = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      // Send to API
      const response = await fetch("/api/parse-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Failed to process document";

        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Load the extracted data into the resume context
      loadResumeData(data.resumeData);

      setSuccess(true);

      // Navigate to the builder after a short delay
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (err) {
      console.error("Error processing document:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to process document. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Upload Your Resume
          </h1>
          <p className="text-gray-600">
            Upload your existing resume and let AI extract the information
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
                  dragActive
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl mb-4">
                    <Upload className="w-12 h-12 text-purple-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop your resume here or click to browse
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    Supports JPEG and PNG files up to 10MB
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-purple-50 hover:border-purple-300 transition-all"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {/* File Preview */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={removeFile}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-red-50 hover:text-red-600"
                      disabled={isProcessing}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Process Button */}
                <Button
                  onClick={processDocument}
                  disabled={isProcessing || success}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing Document...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Processing Complete!
                    </>
                  ) : (
                    "Process Document"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Note */}
          {!file && !error && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> For best results, ensure your document has
                clear text and good contrast. The AI will extract your personal
                information, work experience, education, skills, and more.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
