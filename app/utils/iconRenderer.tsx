"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconRendererProps {
  name: string; // Example: "Award", "Star", "Activity"
  size?: number;
  color?: string;
  className?: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  // Type-safe access to Lucide icon
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as
    | React.FC<LucideProps>
    | undefined;

  if (!IconComponent) {
    // fallback if the icon doesn't exist
    const DefaultIcon = LucideIcons.CircleAlert;
    return <DefaultIcon size={size} color="gray" className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default IconRenderer;
