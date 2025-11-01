"use client";

import React, { useState, useEffect } from "react";

interface QuickStatData {
  id?: number;
  number: string;
  title: string;
  iconUrl?: string;
  color?: string;
  visible?: boolean;
}

interface Props {
  initialData?: QuickStatData;
  onSubmit: (data: QuickStatData) => Promise<void>;
  buttonLabel: string;
}

export default function QuickStatsForm({
  initialData,
  onSubmit,
  buttonLabel,
}: Props) {
  const [formData, setFormData] = useState<QuickStatData>({
    number: "",
    title: "",
    iconUrl: "",
    color: "#ffffff",
    visible: true,
  });

  useEffect(() => {
    if (initialData) setFormData({ ...formData, ...initialData });
    // eslint-disable-next-line
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border border-gray-300 w-full px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Number</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className="border border-gray-300 w-full px-3 py-2 rounded"
        />
      </div>

      <div>
        <div className="flex flex-col space-y-2">
          <label className="block font-medium">Icon Name</label>
          <h4 className="text-sm text-gray-600">
            Add the icon name from the{" "}
            <a
              href="https://lucide.dev/icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Lucide Icons
            </a>{" "}
            website.
          </h4>
        </div>

        <input
          type="text"
          name="iconUrl"
          value={formData.iconUrl}
          onChange={handleChange}
          className="border border-gray-300 w-full px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Color</label>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="border border-gray-300 w-16 h-10 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="visible"
          checked={formData.visible}
          onChange={handleChange}
        />
        <label>Visible</label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
