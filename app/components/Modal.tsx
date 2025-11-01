"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  widthClass?: string; // optional, to control modal width
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  widthClass = "max-w-lg",
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* This wrapper ensures scroll works */}
          <div className="flex min-h-full items-center justify-center p-4 w-full">
            <motion.div
              className={`bg-background-light rounded-2xl shadow-xl w-full ${widthClass} max-h-[90vh] flex flex-col`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-5 py-3 border-b">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-5 overflow-y-auto flex-1">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
