"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Sparkles } from "lucide-react";

interface InitialSelectionProps {
  onSelectMode: (mode: "manual" | "document") => void;
}

export function InitialSelection({ onSelectMode }: InitialSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <FileText className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Resume Builder
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choose how you'd like to create your professional resume
          </motion.p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Entry Option */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-2xl p-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                  <FileText className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Manual Entry</h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                Build your resume step-by-step by filling out forms for each section.
                Perfect for creating a resume from scratch or when you want complete control over every detail.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-sm text-gray-700">Fill in your information section by section</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-sm text-gray-700">Complete control over formatting and content</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-sm text-gray-700">AI-powered suggestions for better writing</p>
                </div>
              </div>

              <Button
                onClick={() => onSelectMode("manual")}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
              >
                Start Manual Entry
              </Button>
            </div>
          </motion.div>

          {/* AI-Powered Document Upload Option */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-2xl p-8 h-full flex flex-col relative overflow-hidden">
              {/* AI Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-semibold text-white">AI-Powered</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300">
                  <Upload className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Generate from Document</h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                Upload an image of your existing resume and let AI automatically extract and format your information.
                Quick and easy way to modernize your existing resume.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <p className="text-sm text-gray-700">Upload image of your current resume</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <p className="text-sm text-gray-700">AI automatically extracts all information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <p className="text-sm text-gray-700">Review and edit before finalizing</p>
                </div>
              </div>

              <Button
                onClick={() => onSelectMode("document")}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                Upload Document
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-gray-500 mt-12"
        >
          Both methods produce the same professional, ATS-friendly resume format
        </motion.p>
      </motion.div>
    </div>
  );
}
