"use client";

import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import { Certification } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

export function CertificationsForm() {
  const {
    resumeData,
    addCertification,
    updateCertification,
    deleteCertification,
  } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Certification>({
    id: "",
    name: "",
    issuer: "",
    date: "",
    link: "",
  });

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      issuer: "",
      date: "",
      link: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCertification(editingId, formData);
    } else {
      addCertification({ ...formData, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleEdit = (cert: Certification) => {
    setFormData(cert);
    setEditingId(cert.id);
  };

  const handleDelete = (id: string) => {
    deleteCertification(id);
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
          <Label htmlFor="certName">Certification Name *</Label>
          <Input
            id="certName"
            placeholder="AWS Certified Solutions Architect"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuer">Issuing Organization *</Label>
          <Input
            id="issuer"
            placeholder="Amazon Web Services"
            value={formData.issuer}
            onChange={(e) =>
              setFormData({ ...formData, issuer: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certDate">Issue Date *</Label>
          <Input
            id="certDate"
            type="month"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certLink">Credential Link (Optional)</Label>
          <Input
            id="certLink"
            placeholder="https://www.credly.com/badges/..."
            value={formData.link || ""}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            {editingId ? "Update" : "Add"} Certification
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {resumeData.certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-muted-foreground">
              Added Certifications
            </h3>
            {resumeData.certifications.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>{cert.name}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(cert)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(cert.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} • {cert.date}
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
