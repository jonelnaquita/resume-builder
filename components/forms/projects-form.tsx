"use client";

import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import { Project } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, ExternalLink } from "lucide-react";

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, deleteProject } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    id: "",
    name: "",
    description: "",
    technologies: "",
    link: "",
    startDate: "",
    endDate: "",
  });

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      technologies: "",
      link: "",
      startDate: "",
      endDate: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
    } else {
      addProject({ ...formData, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
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
          Projects
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Showcase your personal projects, contributions, and side work
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Details Card */}
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl p-6 border border-blue-100 space-y-5">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            Project Information
          </h4>
          <div className="space-y-2.5">
            <Label
              htmlFor="projectName"
              className="text-sm font-medium text-gray-700"
            >
              Project Name <span className="text-red-500 text-xs">*</span>
            </Label>
            <Input
              id="projectName"
              placeholder="e.g. E-Commerce Platform"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label
              htmlFor="projectLink"
              className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Project Link{" "}
              <span className="text-xs text-gray-500">(Optional)</span>
            </Label>
            <Input
              id="projectLink"
              placeholder="e.g. https://github.com/username/project"
              value={formData.link || ""}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-xl p-6 border border-amber-100 space-y-3">
          <div>
            <Label
              htmlFor="projectDescription"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              Project Description{" "}
              <span className="text-red-500 text-xs">*</span>
            </Label>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              Describe what you built, your role, and the impact
            </p>
          </div>
          <Textarea
            id="projectDescription"
            placeholder="e.g. Built a full-stack e-commerce platform with real-time inventory management. Implemented payment gateway integration and reduced checkout time by 40%..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={5}
            required
            className="resize-none"
          />
        </div>

        {/* Technologies Card */}
        <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-xl p-6 border border-purple-100 space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            Technologies & Timeline
          </h4>
          <div className="space-y-2.5">
            <Label
              htmlFor="technologies"
              className="text-sm font-medium text-gray-700"
            >
              Technologies Used <span className="text-red-500 text-xs">*</span>
            </Label>
            <Input
              id="technologies"
              placeholder="e.g. React, Node.js, MongoDB, AWS, Docker"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="projectStartDate"
                className="text-sm font-medium text-gray-700"
              >
                Start Date <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="projectStartDate"
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
                htmlFor="projectEndDate"
                className="text-sm font-medium text-gray-700"
              >
                End Date <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="projectEndDate"
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
            {editingId ? "Update Project" : "Add Project"}
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
        {resumeData.projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <h3 className="text-sm font-semibold text-gray-600">
                Your Projects ({resumeData.projects.length})
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            {resumeData.projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2 hover:border-purple-300 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3 bg-gradient-to-br from-gray-50 to-purple-50/30">
                    <CardTitle className="text-base flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          {project.name}
                          {project.link && (
                            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                          )}
                        </div>
                        <div className="text-sm font-normal text-gray-600 mt-1">
                          {project.technologies}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(project)}
                          className="hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(project.id)}
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
                        {project.startDate} - {project.endDate}
                      </span>
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
