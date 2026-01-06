"use client";

import { useResume } from "@/lib/resume-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIEnhanceButton } from "@/components/ui/ai-enhance-button";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (field: string, value: string) => {
    updatePersonalInfo({ ...personalInfo, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Personal Information
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Fill in your basic contact details to get started with your
          professional resume
        </p>
      </div>

      <div className="space-y-6">
        {/* Essential Information Card */}
        <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-xl p-6 border border-blue-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            Essential Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="fullName"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <User className="w-4 h-4 text-blue-600" />
                Full Name <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="e.g. John Doe"
                value={personalInfo.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2.5">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                Email Address <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. john@example.com"
                value={personalInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2.5">
              <Label
                htmlFor="phone"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                Phone Number <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="e.g. +1 (555) 123-4567"
                value={personalInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2.5">
              <Label
                htmlFor="location"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                Location <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="location"
                placeholder="e.g. New York, NY"
                value={personalInfo.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Online Presence Card */}
        <div className="bg-gradient-to-br from-green-50/50 to-teal-50/30 rounded-xl p-6 border border-green-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            Online Presence{" "}
            <span className="text-xs text-gray-500 font-normal">
              (Optional)
            </span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="linkedin"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                LinkedIn Profile
              </Label>
              <Input
                id="linkedin"
                placeholder="e.g. linkedin.com/in/johndoe"
                value={personalInfo.linkedin || ""}
                onChange={(e) => handleChange("linkedin", e.target.value)}
              />
            </div>
            <div className="space-y-2.5">
              <Label
                htmlFor="website"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                Website / Portfolio
              </Label>
              <Input
                id="website"
                placeholder="e.g. johndoe.com"
                value={personalInfo.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Professional Summary Card */}
        <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-xl p-6 border border-amber-100">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label
                  htmlFor="summary"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  Professional Summary{" "}
                  <span className="text-red-500 text-xs">*</span>
                </Label>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Write 2-3 compelling sentences highlighting your experience,
                  skills, and career aspirations
                </p>
              </div>
            </div>
            <div className="relative">
              <Textarea
                id="summary"
                placeholder="e.g. Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable applications and leading high-performing teams. Seeking opportunities to leverage expertise in cloud technologies and modern frameworks to drive innovation..."
                value={personalInfo.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                rows={6}
                className="resize-none pr-32"
              />
              <AIEnhanceButton
                text={personalInfo.summary}
                type="summary"
                onEnhanced={(enhanced) => handleChange("summary", enhanced)}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
