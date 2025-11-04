"use client";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CSRData } from "@/app/services/csrSustainability.service";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/store";
import {
  createCSR,
  fetchCSR,
  updateCSR,
} from "@/app/lib/store/features/csrSustainabilitySlice";
import commonService from "@/app/services/common.service";

export default function CSRPage() {
  const dispatch = useAppDispatch();
  const { csr, status } = useAppSelector((state) => state.csrSustainability);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<CSRData>({
    title: "",
    subtitle: "",
    description: "",
    bannerImage: "",
    learnMoreText: "",
    learnMoreLink: "",
    initiatives: [],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchCSR());
  }, [dispatch]);

  const openModal = () => {
    if (csr) {
      setForm(structuredClone(csr));
    } else {
      setForm({
        title: "",
        subtitle: "",
        description: "",
        bannerImage: "",
        learnMoreText: "",
        learnMoreLink: "",
        initiatives: [],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (csr?.id) {
      dispatch(updateCSR({ id: csr.id, data: form }));
    } else {
      dispatch(createCSR(form));
    }
    closeModal();
  };

  const addInitiative = () => {
    setForm({
      ...form,
      initiatives: [
        ...form.initiatives,
        { title: "", photo: "", year: new Date().getFullYear(), story: "" },
      ],
    });
  };

  const removeInitiative = (index: number) => {
    const updated = form.initiatives.filter((_, i) => i !== index);
    setForm({ ...form, initiatives: updated });
  };

  const handleInitiativeChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...form.initiatives];
    // @ts-ignore
    updated[index][field] = value;
    setForm({ ...form, initiatives: updated });
  };

  const handlePhotoUpload = async (index: number, file: File) => {
    try {
      setUploading(true);
      const { url } = await commonService.uploadImage(file);
      const updated = [...form.initiatives];
      updated[index].photo = url;
      setForm({ ...form, initiatives: updated });
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      setUploading(true);
      const { url } = await commonService.uploadImage(e.target.files[0]);
      setForm({ ...form, bannerImage: url });
    } catch (err) {
      console.error("Banner upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold ">CSR & Sustainability</h1>
            <p className="text-gray-600 mt-1">
              Manage your corporate social responsibility initiatives
            </p>
          </div>
          <button
            onClick={openModal}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            {csr ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit CSR
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add CSR
              </>
            )}
          </button>
        </div>

        {/* Display CSR Content */}
        {csr ? (
          <div className="space-y-6">
            {/* Banner Section */}
            {csr.bannerImage && (
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={csr.bannerImage}
                  alt="CSR Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {csr.title}
                    </h2>
                    {csr.subtitle && (
                      <p className="text-xl text-gray-200">{csr.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Description Card */}
            <div className=" rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold  mb-4">Our Commitment</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {csr.description}
              </p>
              {csr.learnMoreLink && (
                <a
                  href={csr.learnMoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-6 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {csr.learnMoreText || "Learn More"}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Initiatives Grid */}
            {csr.initiatives.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold  mb-6">
                  Our Initiatives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {csr.initiatives.map((initiative, index) => (
                    <div
                      key={index}
                      className=" rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {initiative.photo && (
                        <img
                          src={initiative.photo}
                          alt={initiative.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xl font-semibold ">
                            {initiative.title}
                          </h4>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {initiative.year}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {initiative.story}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className=" rounded-xl shadow-md p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-2xl font-semibold  mb-2">No CSR Content Yet</h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first CSR & Sustainability page
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create CSR Page
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl  shadow-2xl transition-all">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                    <Dialog.Title className="text-2xl font-bold text-white">
                      {csr ? "Edit CSR Content" : "Create CSR Content"}
                    </Dialog.Title>
                    <p className="text-blue-100 mt-1">
                      Fill in the details below
                    </p>
                  </div>

                  <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold  border-b pb-2">
                          Basic Information
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                          </label>
                          <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g., Building a Sustainable Future"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subtitle
                          </label>
                          <input
                            name="subtitle"
                            value={form.subtitle}
                            onChange={handleChange}
                            placeholder="e.g., Our commitment to the planet and communities"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                          </label>
                          <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe your CSR initiatives and sustainability goals..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Banner Image
                          </label>
                          {form.bannerImage && (
                            <div className="mb-3 relative inline-block">
                              <img
                                src={form.bannerImage}
                                alt="Banner Preview"
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerUpload}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button Text
                            </label>
                            <input
                              name="learnMoreText"
                              value={form.learnMoreText}
                              onChange={handleChange}
                              placeholder="e.g., Learn More"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button Link
                            </label>
                            <input
                              name="learnMoreLink"
                              value={form.learnMoreLink}
                              onChange={handleChange}
                              placeholder="https://..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Initiatives */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h3 className="text-lg font-semibold ">
                            Initiatives
                          </h3>
                          <button
                            onClick={addInitiative}
                            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Add Initiative
                          </button>
                        </div>

                        {form.initiatives.map((init, i) => (
                          <div
                            key={i}
                            className="border-2 border-gray-200 rounded-lg p-4 space-y-3 "
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700">
                                Initiative {i + 1}
                              </span>
                              <button
                                onClick={() => removeInitiative(i)}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                Remove
                              </button>
                            </div>

                            <input
                              value={init.title}
                              onChange={(e) =>
                                handleInitiativeChange(
                                  i,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Initiative Title"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                            {init.photo && (
                              <img
                                src={init.photo}
                                alt="Initiative Preview"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            )}

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0])
                                  handlePhotoUpload(i, e.target.files[0]);
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />

                            <input
                              type="number"
                              value={init.year}
                              onChange={(e) =>
                                handleInitiativeChange(
                                  i,
                                  "year",
                                  Number(e.target.value)
                                )
                              }
                              placeholder="Year"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                            <textarea
                              value={init.story}
                              onChange={(e) =>
                                handleInitiativeChange(
                                  i,
                                  "story",
                                  e.target.value
                                )
                              }
                              placeholder="Tell the story of this initiative..."
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                            />
                          </div>
                        ))}

                        {form.initiatives.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No initiatives added yet. Click "Add Initiative" to
                            get started.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-8 py-4 flex justify-end space-x-3 border-t">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={uploading}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading
                        ? "Uploading..."
                        : csr
                        ? "Update CSR"
                        : "Create CSR"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
