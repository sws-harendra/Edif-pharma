"use client";
import React from "react";
import { getImageUrl } from "./getImageUrl";

export const getMediaElement = (
  mediaPath?: string | null,
  className: string = "",
  options: {
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    alt?: string;
  } = {}
): React.ReactNode => {
  if (!mediaPath) {
    return (
      <img src="/placeholder.png" alt="placeholder" className={className} />
    );
  }

  const url = getImageUrl(mediaPath);
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(mediaPath);

  if (isVideo) {
    return (
      <video
        src={url}
        className={className}
        autoPlay={options.autoPlay ?? true}
        loop={options.loop ?? true}
        muted={options.muted ?? true}
        controls={options.controls ?? false}
        playsInline
      />
    );
  }

  return <img src={url} alt={options.alt || "media"} className={className} />;
};
