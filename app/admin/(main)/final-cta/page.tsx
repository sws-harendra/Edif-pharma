"use client";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCTABanner } from "@/app/lib/store/features/finalCtaBannerSlice";
import { RootState, AppDispatch } from "@/app/lib/store/store";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import FinalCTABannerForm from "./edit/page";

export default function FinalCTABannerSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { banner, status } = useSelector(
    (state: RootState) => state.finalCtaBanner
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCTABanner());
  }, [dispatch]);

  if (status === "loading") return <p>Loading CTA...</p>;

  return (
    <>
      {banner ? (
        <section
          className="relative text-white py-20 text-center"
          style={{
            backgroundImage: `linear-gradient(to right, ${banner.gradientStart}, ${banner.gradientEnd}), url(${banner.backgroundImage})`,
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
            <p className="text-lg mb-8">{banner.subtitle}</p>

            <div className="flex flex-wrap justify-center gap-4">
              {banner.quoteButtonText && (
                <Link
                  href={banner.quoteButtonLink || "#"}
                  className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-100 transition"
                >
                  {banner.quoteButtonText}
                </Link>
              )}

              {banner.catalogButtonText && banner.catalogFile && (
                <a
                  href={banner.catalogFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-700 transition"
                >
                  {banner.catalogButtonText}
                </a>
              )}
            </div>

            {/* 🛠 Edit Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm px-4 py-2 text-sm rounded-md border border-white/30 hover:bg-black/60 transition"
            >
              ✏️ Edit
            </button>
          </div>
        </section>
      ) : (
        // If no banner exists, show Add button
        <div className="text-center py-20">
          <p className="mb-4 text-gray-600">No CTA banner found.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add New CTA Banner
          </button>
        </div>
      )}

      {/* 🪟 Headless UI Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-background-light p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-2xl font-bold">
                      {banner ? "Edit CTA Banner" : "Add CTA Banner"}
                    </Dialog.Title>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ✖
                    </button>
                  </div>

                  {/* Pass data as prop (no extra fetch inside) */}
                  <FinalCTABannerForm
                    banner={banner}
                    onClose={() => setIsOpen(false)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
