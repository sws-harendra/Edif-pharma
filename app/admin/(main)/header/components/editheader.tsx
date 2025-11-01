"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchHeader } from "@/app/lib/store/features/headerSlice";
import commonServies from "@/app/services/common.service";
import headerService from "@/app/services/header.service";
import { getImageUrl } from "@/app/utils/getImageUrl";

export default function EditHeaderForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { header, status } = useSelector((state: RootState) => state.header);

  const [formData, setFormData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (header) setFormData(header);
  }, [header]);

  useEffect(() => {
    if (header) setFormData(header);
  }, [header]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    try {
      setUploading(true);
      const { url } = await commonServies.uploadImage(file);
      setFormData({ ...formData, logoUrl: url });
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleMenuChange = (index: number, key: string, value: any) => {
    const updatedMenu = [...formData.menuItems];
    updatedMenu[index][key] = value;
    setFormData({ ...formData, menuItems: updatedMenu });
  };

  const handleReorder = (from: number, to: number) => {
    const updated = [...formData.menuItems];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setFormData({ ...formData, menuItems: updated });
  };

  const handleSubmit = async () => {
    if (!formData) return;
    try {
      await headerService.updateHeader(formData.id, formData);
      alert("✅ Header updated successfully!");
      dispatch(fetchHeader());
    } catch (err) {
      console.error("Update failed", err);
      alert("❌ Failed to update header");
    }
  };

  if (status === "loading" || !formData)
    return <p className="p-4 text-gray-500">Loading header data...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Header Settings</h2>

      {/* Logo Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Company Logo
        </label>
        {formData.logoUrl && (
          <img
            src={getImageUrl(formData.logoUrl)}
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          disabled={uploading}
          className="mt-2"
        />
      </div>

      {/* Sticky Header */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.stickyHeader}
          onChange={(e) =>
            setFormData({ ...formData, stickyHeader: e.target.checked })
          }
        />
        <label>Enable Sticky Header</label>
      </div>

      {/* Menu Items */}
      <div>
        <h3 className="font-semibold mb-2">Menu Items</h3>
        <div className="space-y-3">
          {formData.menuItems.map((item: any, i: number) => (
            <div
              key={item.id}
              className="border rounded-md p-3 flex flex-col space-y-2 "
            >
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleMenuChange(i, "label", e.target.value)}
                  className="border rounded px-2 py-1 w-1/3"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => handleMenuChange(i, "url", e.target.value)}
                  className="border rounded px-2 py-1 w-1/3"
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleReorder(i, i - 1)}
                    disabled={i === 0}
                    className="text-sm px-2 py-1 border rounded "
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleReorder(i, i + 1)}
                    disabled={i === formData.menuItems.length - 1}
                    className="text-sm px-2 py-1 border rounded "
                  >
                    ↓
                  </button>
                </div>
              </div>

              {/* Submenus */}
              {item.subMenus && item.subMenus.length > 0 && (
                <div className="pl-4 space-y-1">
                  <p className="text-sm font-medium">Submenus:</p>
                  {item.subMenus.map((sub: any, si: number) => (
                    <div
                      key={sub.id}
                      className="flex space-x-2 items-center text-sm"
                    >
                      <input
                        type="text"
                        value={sub.label}
                        onChange={(e) => {
                          const newMenus = [...formData.menuItems];
                          newMenus[i].subMenus[si].label = e.target.value;
                          setFormData({ ...formData, menuItems: newMenus });
                        }}
                        className="border rounded px-2 py-1 w-1/3"
                      />
                      <input
                        type="text"
                        value={sub.url}
                        onChange={(e) => {
                          const newMenus = [...formData.menuItems];
                          newMenus[i].subMenus[si].url = e.target.value;
                          setFormData({ ...formData, menuItems: newMenus });
                        }}
                        className="border rounded px-2 py-1 w-1/3"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="space-y-2">
        <h3 className="font-semibold mb-2">CTA Button</h3>
        <input
          type="text"
          placeholder="Button Text"
          value={formData.ctaButton?.text || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              ctaButton: { ...formData.ctaButton, text: e.target.value },
            })
          }
          className="border rounded px-2 py-1 w-full"
        />
        <input
          type="color"
          value={formData.ctaButton?.color || "#000000"}
          onChange={(e) =>
            setFormData({
              ...formData,
              ctaButton: { ...formData.ctaButton, color: e.target.value },
            })
          }
          className="w-16 h-8"
        />
        <input
          type="text"
          placeholder="Link URL"
          value={formData.ctaButton?.link || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              ctaButton: { ...formData.ctaButton, link: e.target.value },
            })
          }
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
