"use client";

import { useResume } from "@/lib/resume-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIEnhanceButton } from "@/components/ui/ai-enhance-button";
import { motion } from "framer-motion";

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
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={personalInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={personalInfo.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input
            id="website"
            placeholder="johndoe.com"
            value={personalInfo.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary *</Label>
        <div className="relative">
          <Textarea
            id="summary"
            placeholder="A brief professional summary highlighting your key strengths and career goals..."
            value={personalInfo.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            rows={4}
            className="resize-none pr-32"
          />
          <AIEnhanceButton
            text={personalInfo.summary}
            type="summary"
            onEnhanced={(enhanced) => handleChange("summary", enhanced)}
          />
        </div>
      </div>
    </motion.div>
  );
}
