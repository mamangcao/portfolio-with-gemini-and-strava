import React from "react";

export interface StravaActivity {
  distance: number;
  total_elevation_gain: number;
  start_date_local: string;
  type: string;
  average_speed: number;
}

export interface BadgeDef {
  id: string;
  type: "image" | "icon";
  name: string;
  imageSrc?: string; // For manual images
  icon?: React.ReactNode;
  theme?: "orange" | "blue" | "green" | "red" | "purple" | "yellow" | "gray";
  description: string;
  // Logic to check if badge is earned
  condition?: (activities: StravaActivity[]) => boolean;
}

export const badges: BadgeDef[] = [
  {
    id: "runna-nov-2025",
    type: "image",
    name: "November Runna 400'",
    imageSrc: "/badges/C0001.png",
    description: "November 400-Minute x Runna Challenge",
  },
];
