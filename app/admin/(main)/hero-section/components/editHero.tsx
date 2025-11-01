"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store/store";
import { updateHero } from "@/app/lib/store/features/heroSlice";
import commonServices from "@/app/services/common.service"; // for image upload if you have it
import { HeroData } from "@/app/services/hero.service";
import { getMediaElement } from "@/app/utils/getMediaElement";
import { toast } from "sonner";

interface EditHeroFormProps {
  hero: HeroData;
  onClose: () => void;
}

const EditHeroForm: React.FC<EditHeroFormProps> = ({ hero, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    bannerImage: hero.bannerImage || "",
    backgroundVideo: hero.backgroundVideo || "",
    headline: hero.headline || "",
    subheadline: hero.subheadline || "",
    primaryCtaText: hero.primaryCtaText || "",
    primaryCtaLink: hero.primaryCtaLink || "",
    secondaryCtaText: hero.secondaryCtaText || "",
    secondaryCtaLink: hero.secondaryCtaLink || "",
    animationType: hero.animationType || "fade",
  });

  const [preview, setPreview] = useState<string | null>(
    hero.bannerImage ? hero.bannerImage : null
  );
  const [loading, setLoading] = useState(false);

  // 🧩 Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼️ Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setLoading(true);
    try {
      const uploaded = await commonServices.uploadImage(file); // assumes this returns { path: "/uploads/file.png" }
      setFormData((prev) => ({ ...prev, bannerImage: uploaded.path }));
      setPreview(uploaded.path);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 💾 Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateHero({ id: hero.id, data: formData })).unwrap();
      onClose();
      toast("My first toast");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4  rounded-2xl shadow-md w-full max-w-lg"
    >
      <h2 className="text-xl font-semibold mb-2 ">Edit Hero Section</h2>

      {/* Banner Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Banner Image</label>
        {getMediaElement(hero?.backgroundVideo || hero?.bannerImage, "", {
          autoPlay: true,
          loop: true,
          muted: true,
        })}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Headline */}
      <div>
        <label className="block text-sm font-medium mb-1">Headline</label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Subheadline */}
      <div>
        <label className="block text-sm font-medium mb-1">Subheadline</label>
        <textarea
          name="subheadline"
          value={formData.subheadline}
          onChange={handleChange}
          rows={2}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Primary CTA */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Primary CTA Text
          </label>
          <input
            type="text"
            name="primaryCtaText"
            value={formData.primaryCtaText}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Primary CTA Link
          </label>
          <input
            type="text"
            name="primaryCtaLink"
            value={formData.primaryCtaLink}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Secondary CTA */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Secondary CTA Text
          </label>
          <input
            type="text"
            name="secondaryCtaText"
            value={formData.secondaryCtaText}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Secondary CTA Link
          </label>
          <input
            type="text"
            name="secondaryCtaLink"
            value={formData.secondaryCtaLink}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Animation Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Animation Type</label>
        <select
          name="animationType"
          value={formData.animationType}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
          <option value="zoom">Zoom</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditHeroForm;
