import React from "react";
import { Briefcase, Users, TrendingUp, Award, Target, Zap } from "lucide-react";

const CareerComponent: React.FC = () => {
  return (
    <div
      id="careers"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Dotted Pattern Overlay */}
      <div className="absolute inset-0 opacity-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Careers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our team and be part of something extraordinary. We&apos;re
            building the future together.
          </p>
        </div>

        {/* Image and Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="order-2 md:order-1 relative">
            <div className="absolute -inset-4 rounded-lg blur opacity-20"></div>
            <img
              src="/images/careers.jpg"
              alt="Team collaboration"
              className="rounded-lg shadow-2xl w-full h-auto relative z-10"
            />
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Why Work With Us
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We believe in creating an environment where innovation thrives and
              every team member can reach their full potential.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Our culture is built on collaboration, creativity, and mutual
              respect. We encourage bold ideas and provide the resources you
              need to bring them to life.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you&apos;re just starting your career or bringing years of
              experience, you&apos;ll find opportunities to grow, learn, and
              make a meaningful impact.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 mb-2 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We push boundaries and embrace new ideas to stay ahead of the
                curve.
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Collaboration
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Together we achieve more. Teamwork is at the heart of everything
                we do.
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Growth
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We invest in our people and provide opportunities for continuous
                learning.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 shadow-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-6">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals who share our
            passion and values. Get in touch and let&apos;s explore how we can
            work together.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            Get In Touch
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CareerComponent;
