"use client";

import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import { Experience } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AIEnhanceButton } from "@/components/ui/ai-enhance-button";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, deleteExperience } =
    useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience>({
    id: "",
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const resetForm = () => {
    setFormData({
      id: "",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateExperience(editingId, formData);
    } else {
      addExperience({ ...formData, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
  };

  const handleDelete = (id: string) => {
    deleteExperience(id);
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
          Work Experience
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Add your professional experience, responsibilities, and achievements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl p-6 border border-blue-100 space-y-5">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            Position Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company Name <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="company"
                placeholder="e.g. Google Inc."
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                Job Title <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="position"
                placeholder="e.g. Senior Software Engineer"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location <span className="text-red-500 text-xs">*</span>
            </Label>
            <Input
              id="location"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Duration Card */}
        <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-xl p-6 border border-purple-100 space-y-5">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            Employment Duration
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500 text-xs">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(new Date(formData.startDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate ? new Date(formData.startDate) : undefined}
                    onSelect={(date) =>
                      setFormData({ 
                        ...formData, 
                        startDate: date ? format(date, "yyyy-MM-dd") : "" 
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                End Date {formData.current && <span className="text-xs text-gray-500">(Current Position)</span>}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={formData.current}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                      formData.current && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(new Date(formData.endDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate ? new Date(formData.endDate) : undefined}
                    onSelect={(date) =>
                      setFormData({ 
                        ...formData, 
                        endDate: date ? format(date, "yyyy-MM-dd") : "" 
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-purple-200/50">
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current: e.target.checked,
                  endDate: "",
                })
              }
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <Label htmlFor="current" className="cursor-pointer text-sm font-medium text-gray-700">
              I currently work here
            </Label>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-xl p-6 border border-amber-100 space-y-3">
          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              Responsibilities & Achievements <span className="text-red-500 text-xs">*</span>
            </Label>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              Use bullet points to describe your key responsibilities and accomplishments
            </p>
          </div>
          <div className="relative">
            <Textarea
              id="description"
              placeholder="• Led a team of 5 engineers to deliver a customer portal, increasing user engagement by 40%&#10;• Implemented CI/CD pipeline reducing deployment time by 60%&#10;• Collaborated with product managers to define technical requirements"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={7}
              required
              className="resize-none pr-32"
            />
            <AIEnhanceButton
              text={formData.description}
              type="experience"
              context={`${formData.position} at ${formData.company}`}
              onEnhanced={(enhanced) =>
                setFormData({ ...formData, description: enhanced })
              }
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            {editingId ? "Update Experience" : "Add Experience"}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm} className="h-12 px-6">
              Cancel
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {resumeData.experience.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <h3 className="text-sm font-semibold text-gray-600">
                Your Experience ({resumeData.experience.length})
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            {resumeData.experience.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3 bg-gradient-to-br from-gray-50 to-blue-50/30">
                    <CardTitle className="text-base flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{exp.position}</div>
                        <div className="text-sm font-normal text-blue-600">{exp.company}</div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(exp)}
                          className="hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(exp.id)}
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
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{exp.location}</span>
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
