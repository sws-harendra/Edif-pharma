"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import {
  fetchAllManufacturing,
  createManufacturing,
  updateManufacturing,
} from "@/app/lib/store/features/manufacturingSlice";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import commonServies from "@/app/services/common.service";
import { getImageUrl } from "@/app/utils/getImageUrl";

const ManufacturingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sections, status } = useSelector(
    (state: RootState) => state.manufacturing
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    mediaUrl: "",
    ctaText: "",
    ctaLink: "",
  });

  useEffect(() => {
    dispatch(fetchAllManufacturing());
  }, [dispatch]);

  const openAddModal = () => {
    setEditingSection(null);
    setFormData({
      name: "",
      description: "",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      mediaUrl: "",
      ctaText: "",
      ctaLink: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (section: any) => {
    setEditingSection(section);
    setFormData({
      name: section.name,
      description: section.description,
      backgroundColor: section.backgroundColor,
      textColor: section.textColor,
      mediaUrl: section.mediaUrl,
      ctaText: section.ctaText,
      ctaLink: section.ctaLink,
    });
    setIsModalOpen(true);
  };

  // ✅ Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    try {
      setUploading(true);
      const { url } = await commonServies.uploadImage(file);
      setFormData({ ...formData, mediaUrl: url });
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSection) {
      await dispatch(
        updateManufacturing({ id: editingSection.id, data: formData })
      );
    } else {
      await dispatch(createManufacturing(formData));
    }
    setIsModalOpen(false);
    dispatch(fetchAllManufacturing());
  };

  if (status === "loading")
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="space-y-16 h-screen overflow-y-auto">
      {/* Add Section Button */}
      <div className="flex justify-end max-w-6xl mx-auto px-6 pt-6">
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Section
        </button>
      </div>

      {/* Sections */}
      {sections.length === 0 ? (
        <p className="text-center py-10">No data found</p>
      ) : (
        sections.map((s) => (
          <section
            key={s.id}
            className="py-16 relative"
            style={{
              backgroundColor: s.backgroundColor,
              color: s.textColor,
            }}
          >
            {/* Edit Button */}
            <button
              onClick={() => openEditModal(s)}
              className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Edit
            </button>

            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{s.name}</h2>
                <p className="text-lg mb-6">{s.description}</p>

                {s.subheadings?.map((sub, idx) => (
                  <div key={idx} className="mb-4">
                    <h4 className="text-xl font-semibold">{sub.title}</h4>
                    <p className="text-gray-700">{sub.description}</p>
                  </div>
                ))}

                {s.ctaText && (
                  <a
                    href={s.ctaLink}
                    className="inline-block bg-blue-700 text-white px-5 py-2 mt-4 rounded hover:bg-blue-800"
                  >
                    {s.ctaText}
                  </a>
                )}
              </div>

              {s.mediaUrl && (
                <div className="flex justify-center">
                  <img
                    src={getImageUrl(s.mediaUrl)}
                    alt={s.name}
                    className="rounded-xl shadow-md w-full max-w-md"
                  />
                </div>
              )}
            </div>
          </section>
        ))
      )}

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-background-light p-6 rounded-lg max-w-lg w-full shadow-lg">
            <DialogTitle className="text-xl font-semibold mb-4">
              {editingSection ? "Edit Section" : "Add Section"}
            </DialogTitle>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border p-2 w-full rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border p-2 w-full rounded"
                required
              />

              {/* ✅ Image Upload */}
              <div>
                <label className="block font-medium mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border p-2 w-full rounded"
                />
                {uploading && (
                  <p className="text-sm text-blue-600 mt-1">Uploading...</p>
                )}
                {formData.mediaUrl && (
                  <div className="mt-3">
                    <img
                      src={formData.mediaUrl}
                      alt="Preview"
                      className="rounded-md shadow w-40 h-40 object-cover"
                    />
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="CTA Text"
                value={formData.ctaText}
                onChange={(e) =>
                  setFormData({ ...formData, ctaText: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                placeholder="CTA Link"
                value={formData.ctaLink}
                onChange={(e) =>
                  setFormData({ ...formData, ctaLink: e.target.value })
                }
                className="border p-2 w-full rounded"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className={`px-4 py-2 rounded text-white ${
                    uploading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {editingSection ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ManufacturingPage;
