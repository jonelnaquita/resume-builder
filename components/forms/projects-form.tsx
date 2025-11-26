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
import { Trash2, Plus } from "lucide-react";

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
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            placeholder="My Awesome Project"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectDescription">Description *</Label>
          <Textarea
            id="projectDescription"
            placeholder="Describe the project, your role, and key achievements..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            required
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="technologies">Technologies Used *</Label>
          <Input
            id="technologies"
            placeholder="React, Node.js, MongoDB, AWS"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({ ...formData, technologies: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectLink">Project Link (Optional)</Label>
          <Input
            id="projectLink"
            placeholder="https://github.com/username/project"
            value={formData.link || ""}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectStartDate">Start Date *</Label>
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
          <div className="space-y-2">
            <Label htmlFor="projectEndDate">End Date *</Label>
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

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            {editingId ? "Update" : "Add"} Project
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
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
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-muted-foreground">
              Added Projects
            </h3>
            {resumeData.projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>{project.name}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(project)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {project.technologies} • {project.startDate} -{" "}
                      {project.endDate}
                    </p>
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
