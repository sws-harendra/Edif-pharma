// pages/history.tsx
import Image from "next/image";
import React from "react";

const timelineData = [
  {
    year: "2005",
    title: "Company Founded",
    description:
      "Our company was founded with a vision to bring innovative solutions to the market.",
  },
  {
    year: "2010",
    title: "Global Expansion",
    description:
      "Expanded globally and launched several groundbreaking products loved by our customers.",
  },
  {
    year: "2018",
    title: "Major Milestones",
    description:
      "Achieved major milestones in technology and sustainability, setting new industry standards.",
  },
  {
    year: "2025",
    title: "Today",
    description:
      "Today, we continue to innovate, grow, and make a positive impact around the world.",
  },
];

const HistoryPage = () => {
  return (
    <div id="history" className="min-h-screen bg-gray-50 py-16 px-4 md:px-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our History</h1>
        <p className="text-gray-600 text-lg">
          Discover the journey that shaped us into who we are today. From humble
          beginnings to remarkable achievements, every step has been driven by
          passion and innovation.
        </p>
        <div className="relative w-full h-80 md:h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/lab.png"
            alt="Our History"
            layout="fill"
            objectFit="cover"
            className="rounded-lg filter grayscale"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-blue-500 h-full"></div>

        {/* Timeline items */}
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`mb-12 flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="md:w-5/12 md:px-8 text-right md:text-right">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.year}
              </h2>
              <h3 className="text-lg font-medium text-gray-700">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            {/* Dot */}
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white z-10 absolute left-1/2 -translate-x-1/2 md:static"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
