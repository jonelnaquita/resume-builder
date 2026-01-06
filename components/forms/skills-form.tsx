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
      className="space-y-8"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skills & Expertise
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Organize your skills into categories to showcase your technical
          abilities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Card */}
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl p-6 border border-blue-100 space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            Skill Category
          </h4>
          <div className="space-y-2.5">
            <Label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category Name <span className="text-red-500 text-xs">*</span>
            </Label>
            <Input
              id="category"
              placeholder="e.g., Programming Languages, Tools & Technologies, Soft Skills"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Skills Input Card */}
        <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-xl p-6 border border-purple-100 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
              Add Skills <span className="text-red-500 text-xs">*</span>
            </h4>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              Enter skills one at a time and press Add or hit Enter
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              id="skillInput"
              placeholder="e.g., JavaScript, Python, React..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkillToList();
                }
              }}
            />
            <Button
              type="button"
              onClick={addSkillToList}
              variant="outline"
              className="px-6 hover:bg-purple-100 hover:border-purple-300 transition-all"
              disabled={!skillInput.trim()}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-white/60 rounded-lg border border-purple-200/50 min-h-[60px]">
              {formData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkillFromList(index)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <span className="text-lg leading-none">×</span>
                  </button>
                </motion.span>
              ))}
            </div>
          )}

          {formData.skills.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-purple-200 rounded-lg bg-white/40">
              <p className="text-sm text-gray-500">
                No skills added yet. Start adding skills above!
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
            disabled={formData.skills.length === 0}
          >
            <Plus className="w-5 h-5 mr-2" />
            {editingId ? "Update Category" : "Add Skill Category"}
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
        {resumeData.skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <h3 className="text-sm font-semibold text-gray-600">
                Your Skills ({resumeData.skills.length}{" "}
                {resumeData.skills.length === 1 ? "Category" : "Categories"})
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            {resumeData.skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2 hover:border-purple-300 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3 bg-gradient-to-br from-gray-50 to-purple-50/30">
                    <CardTitle className="text-base flex items-center justify-between gap-3">
                      <span className="font-bold text-gray-900">
                        {skill.category}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(skill)}
                          className="hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(skill.id)}
                          className="hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="flex flex-wrap gap-2">
                      {skill.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-md text-sm font-medium border border-blue-200"
                        >
                          {s}
                        </span>
                      ))}
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
