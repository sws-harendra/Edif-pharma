"use client";
import React from "react";
import { Users, Linkedin, Twitter, Mail } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamComponent: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Visionary leader with 15+ years of experience in driving organizational growth and innovation.",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Tech innovator passionate about building scalable solutions and leading high-performance teams.",
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Marketing Officer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Creative strategist with a proven track record of building powerful brands and engaging audiences.",
    },
    {
      name: "Jessica Park",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      bio: "Design thinker who crafts beautiful, user-centric experiences that delight and inspire.",
    },
    {
      name: "Alex Kumar",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Product visionary dedicated to creating solutions that solve real problems and create value.",
    },
  ];

  return (
    <div
      id="team"
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Talented individuals united by a shared passion for excellence and
            innovation.
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-16 border border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The People Behind Our Success
          </h2>
          <p className="text-gray-700 text-xl leading-relaxed mb-4">
            Our team is our greatest asset. We&apos;re a diverse group of
            passionate professionals who bring unique perspectives, skills, and
            experiences to everything we do.
          </p>
          <p className="text-gray-700 text-xl leading-relaxed">
            Together, we&apos;re building something extraordinary—combining
            expertise with creativity to deliver exceptional results for our
            clients and partners.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl  border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Social Icons */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors duration-200">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors duration-200">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors duration-200">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TeamComponent;
