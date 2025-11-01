"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createCTABanner,
  updateCTABanner,
  fetchCTABanner,
} from "@/app/lib/store/features/finalCtaBannerSlice";
import { AppDispatch } from "@/app/lib/store/store";
import finalCtaBannerService, {
  FinalCTABanner,
} from "@/app/services/finalCtaBannerService";
import commonServies from "@/app/services/common.service";
import { getImageUrl } from "@/app/utils/getImageUrl";

interface FinalCTABannerFormProps {
  banner?: FinalCTABanner | null;
  onClose: () => void;
}

const FinalCTABannerForm: React.FC<FinalCTABannerFormProps> = ({
  banner,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<FinalCTABanner>({
    title: "",
    subtitle: "",
    gradientStart: "#0047AB",
    gradientEnd: "#00C853",
    backgroundImage: "",
    quoteButtonText: "",
    quoteButtonLink: "",
    quoteButtonPopup: false,
    catalogButtonText: "",
    catalogFile: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (banner) setFormData(banner);
  }, [banner]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "backgroundImage" | "catalogFile"
  ) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    try {
      setUploading(true);
      const { url } = await commonServies.uploadImage(file);
      setFormData((prev) => ({ ...prev, [field]: url }));
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (banner?.id) {
      await dispatch(updateCTABanner({ id: banner.id, data: formData }));
    } else {
      await dispatch(createCTABanner(formData));
    }
    await dispatch(fetchCTABanner());
    onClose(); // close modal after save
  };

  const handleDelete = async () => {
    if (!banner?.id) return;
    if (confirm("Are you sure you want to delete this banner?")) {
      await finalCtaBannerService.update(banner.id, { enabled: false });
      await dispatch(fetchCTABanner());
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Subtitle</label>
          <textarea
            name="subtitle"
            className="w-full border p-2 rounded"
            rows={3}
            value={formData.subtitle || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Gradient Start</label>
            <input
              type="color"
              name="gradientStart"
              value={formData.gradientStart || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Gradient End</label>
            <input
              type="color"
              name="gradientEnd"
              value={formData.gradientEnd || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Background Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "backgroundImage")}
          />
          {uploading && <p>Uploading...</p>}
          {formData.backgroundImage && (
            <img
              src={getImageUrl(formData.backgroundImage)}
              alt="Preview"
              className="w-full h-40 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Quote Button Text</label>
          <input
            type="text"
            name="quoteButtonText"
            className="w-full border p-2 rounded"
            value={formData.quoteButtonText || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Quote Button Link</label>
          <input
            type="text"
            name="quoteButtonLink"
            className="w-full border p-2 rounded"
            value={formData.quoteButtonLink || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="quoteButtonPopup"
            checked={formData.quoteButtonPopup || false}
            onChange={handleChange}
          />
          <label>Open Quote in Popup?</label>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Catalog Button Text
          </label>
          <input
            type="text"
            name="catalogButtonText"
            className="w-full border p-2 rounded"
            value={formData.catalogButtonText || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Catalog File (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleImageUpload(e, "catalogFile")}
          />
          {formData.catalogFile && (
            <a
              href={formData.catalogFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              View Uploaded PDF
            </a>
          )}
        </div>

        <div className="flex gap-4 justify-end">
          {banner && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {banner ? "Update" : "Create"}
          </button>
        </div>

        <div className="flex gap-4 justify-end mt-6">
          {banner && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {banner ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinalCTABannerForm;
