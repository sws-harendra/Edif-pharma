"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchHeroByHeader } from "@/app/lib/store/features/heroSlice";
import { useEffect, useState } from "react";
import { getMediaElement } from "@/app/utils/getMediaElement";
import Link from "next/link";
import { Edit } from "lucide-react";
import Modal from "@/app/components/Modal";
import EditHeroForm from "./components/editHero";

export default function HeroSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { heroes, status } = useSelector(
    (state: RootState) => state.heroSection
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHeroByHeader(2)); // Example headerId
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (!heroes?.length) return <p>No hero section found.</p>;

  const hero = heroes[0];

  return (
    <section className="">
      {" "}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Header">
        <EditHeroForm hero={hero} onClose={() => setOpen(false)} />
      </Modal>
      <div className="h-[85vh] relative  overflow-hidden flex items-center justify-center text-center text-white">
        {/* ✅ Background image or video */}
        {getMediaElement(
          hero?.backgroundVideo || hero?.bannerImage,
          "absolute inset-0 w-full h-full object-cover",
          { autoPlay: true, loop: true, muted: true }
        )}
        {/* ✅ Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* ✅ Content */}
        <div
          className={`relative z-10 max-w-3xl mx-auto px-4 transition-all duration-700 ${
            hero?.animationType === "fade" ? "animate-fadeIn" : ""
          }`}
        >
          {/* Headline + Subheadline */}
          <h1 className="text-5xl font-extrabold mb-4">{hero?.headline}</h1>
          <p className="text-lg mb-8 opacity-90">{hero?.subheadline}</p>
          {/* ✅ CTA Buttons */}
          <div className="flex gap-4 justify-center">
            {hero?.primaryCtaText && hero?.primaryCtaLink && (
              <Link
                href={hero.primaryCtaLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
              >
                {hero.primaryCtaText}
              </Link>
            )}

            {hero?.secondaryCtaText && hero?.secondaryCtaLink && (
              <Link
                href={hero.secondaryCtaLink}
                className="bg-transparent border border-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-medium transition"
              >
                {hero.secondaryCtaText}
              </Link>
            )}
          </div>
          {/* ✅ Optional: Show extra info (for debug or dev only) */}
          <div className="mt-8 text-sm opacity-70">
            <p>Animation: {hero?.animationType}</p>
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <button
        onClick={() => setOpen(true)}
        className="hidden float-right mt-3 lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Edit className="w-4 h-4" />
        Edit
      </button>
    </section>
  );
}
