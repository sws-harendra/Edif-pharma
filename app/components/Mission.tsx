import React from "react";
import {
  Target,
  Heart,
  Compass,
  Lightbulb,
  Globe,
  Sparkles,
} from "lucide-react";

const MissionPage: React.FC = () => {
  return (
    <div
      id="our_mission"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Our Mission</h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            To empower people and organizations to achieve their full potential
            through innovative solutions and exceptional service.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-16 border border-gray-100">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-xl leading-relaxed mb-6">
              We believe that every challenge is an opportunity to create
              something remarkable. Our mission drives everything we do, from
              the products we build to the relationships we nurture with our
              customers and partners.
            </p>
            <p className="text-gray-700 text-xl leading-relaxed mb-6">
              We are committed to delivering excellence in every interaction,
              pushing the boundaries of what&apos;s possible, and making a
              positive impact on the communities we serve. Our goal is not just
              to meet expectations, but to exceed them consistently.
            </p>
            <p className="text-gray-700 text-xl leading-relaxed">
              Through continuous innovation, unwavering dedication, and a
              genuine passion for what we do, we strive to be a trusted partner
              in your journey toward success.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Core Pillars
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-6">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                We embrace creativity and forward-thinking approaches to solve
                complex challenges and deliver cutting-edge solutions.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Integrity
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                We operate with transparency, honesty, and ethical principles in
                all our dealings, building trust that lasts.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Excellence
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                We pursue the highest standards in everything we do,
                continuously improving and refining our craft.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 shadow-2xl text-white">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl mb-6">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-blue-50 text-lg leading-relaxed mb-4">
              To be recognized as a global leader that transforms industries and
              enriches lives through innovative thinking and exceptional
              execution.
            </p>
            <p className="text-blue-50 text-lg leading-relaxed">
              We envision a future where our contributions create lasting
              positive change and inspire others to reach new heights.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl mb-6">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We measure our success not just by business metrics, but by the
              positive difference we make in people&apos;s lives and
              communities.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every project, every partnership, and every innovation is an
              opportunity to contribute to a better tomorrow.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
      </div>
    </div>
  );
};

export default MissionPage;
