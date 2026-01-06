"use client";

import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import { Education } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

export function EducationForm() {
  const { resumeData, addEducation, updateEducation, deleteEducation } =
    useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Education>({
    id: "",
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    gpa: "",
  });

  const resetForm = () => {
    setFormData({
      id: "",
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEducation(editingId, formData);
    } else {
      addEducation({ ...formData, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu.id);
  };

  const handleDelete = (id: string) => {
    deleteEducation(id);
    if (editingId === id) resetForm();
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
          Education
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Add your academic qualifications and achievements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Institution Card */}
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl p-6 border border-blue-100 space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            Institution Details
          </h4>
          <div className="space-y-2.5">
            <Label
              htmlFor="institution"
              className="text-sm font-medium text-gray-700"
            >
              Institution Name <span className="text-red-500 text-xs">*</span>
            </Label>
            <Input
              id="institution"
              placeholder="e.g. Massachusetts Institute of Technology"
              value={formData.institution}
              onChange={(e) =>
                setFormData({ ...formData, institution: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label
              htmlFor="edu-location"
              className="text-sm font-medium text-gray-700"
            >
              Location <span className="text-red-500 text-xs">*</span>
            </Label>
            <Input
              id="edu-location"
              placeholder="e.g. Cambridge, MA"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Degree Card */}
        <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-xl p-6 border border-purple-100 space-y-5">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            Degree Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="degree"
                className="text-sm font-medium text-gray-700"
              >
                Degree <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="degree"
                placeholder="e.g. Bachelor of Science"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2.5">
              <Label
                htmlFor="field"
                className="text-sm font-medium text-gray-700"
              >
                Field of Study <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="field"
                placeholder="e.g. Computer Science"
                value={formData.field}
                onChange={(e) =>
                  setFormData({ ...formData, field: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="gpa" className="text-sm font-medium text-gray-700">
              GPA <span className="text-xs text-gray-500">(Optional)</span>
            </Label>
            <Input
              id="gpa"
              placeholder="e.g. 3.8/4.0"
              value={formData.gpa || ""}
              onChange={(e) =>
                setFormData({ ...formData, gpa: e.target.value })
              }
            />
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-gradient-to-br from-green-50/50 to-teal-50/30 rounded-xl p-6 border border-green-100 space-y-5">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            Study Period
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="edu-startDate"
                className="text-sm font-medium text-gray-700"
              >
                Start Date <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="edu-startDate"
                type="month"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2.5">
              <Label
                htmlFor="edu-endDate"
                className="text-sm font-medium text-gray-700"
              >
                End Date <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="edu-endDate"
                type="month"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            {editingId ? "Update Education" : "Add Education"}
          </Button>
          {editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="h-12 px-6"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {resumeData.education.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <h3 className="text-sm font-semibold text-gray-600">
                Your Education ({resumeData.education.length})
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            {resumeData.education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3 bg-gradient-to-br from-gray-50 to-blue-50/30">
                    <CardTitle className="text-base flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">
                          {edu.degree} in {edu.field}
                        </div>
                        <div className="text-sm font-normal text-blue-600">
                          {edu.institution}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(edu)}
                          className="hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(edu.id)}
                          className="hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">
                        {edu.startDate} - {edu.endDate}
                      </span>
                      {edu.gpa && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span>GPA: {edu.gpa}</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
