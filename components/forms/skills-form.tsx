"use client";

import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import { Skill } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

export function SkillsForm() {
  const { resumeData, addSkill, updateSkill, deleteSkill } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Skill>({
    id: "",
    category: "",
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");

  const resetForm = () => {
    setFormData({
      id: "",
      category: "",
      skills: [],
    });
    setSkillInput("");
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.skills.length === 0) return;

    if (editingId) {
      updateSkill(editingId, formData);
    } else {
      addSkill({ ...formData, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleEdit = (skill: Skill) => {
    setFormData(skill);
    setEditingId(skill.id);
  };

  const handleDelete = (id: string) => {
    deleteSkill(id);
    if (editingId === id) resetForm();
  };

  const addSkillToList = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkillFromList = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
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
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            placeholder="e.g., Programming Languages, Tools, Frameworks"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skillInput">Skills *</Label>
          <div className="flex gap-2">
            <Input
              id="skillInput"
              placeholder="Enter a skill and press Add"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkillToList();
                }
              }}
            />
            <Button type="button" onClick={addSkillToList} variant="outline">
              Add
            </Button>
          </div>
        </div>

        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-background rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkillFromList(index)}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1"
            disabled={formData.skills.length === 0}
          >
            <Plus className="w-4 h-4 mr-2" />
            {editingId ? "Update" : "Add"} Skill Category
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {resumeData.skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-muted-foreground">
              Added Skills
            </h3>
            {resumeData.skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>{skill.category}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(skill)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {skill.skills.join(", ")}
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
