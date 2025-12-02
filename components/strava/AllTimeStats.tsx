"use client";

import { motion } from "framer-motion";
import Card from "@/components/sections/Card";
import { Activity, Timer, Mountain, Footprints } from "lucide-react";

interface AllTimeStatsProps {
  data: {
    distance: number; // meters
    moving_time: number; // seconds
    elevation_gain: number; // meters
    count: number; // total runs
  };
}

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

export default function AllTimeStats({ data }: AllTimeStatsProps) {
  if (!data) return null;

  const stats = [
    {
      label: "Total Distance",
      value: (data.distance / 1000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      unit: "km",
      icon: Activity,
    },
    {
      label: "Time Moving",
      value: formatDuration(data.moving_time),
      unit: "",
      icon: Timer,
    },
    {
      label: "Elevation Gain",
      value: data.elevation_gain.toLocaleString(),
      unit: "m",
      icon: Mountain,
    },
    {
      label: "Total Runs",
      value: data.count.toLocaleString(),
      unit: "runs",
      icon: Footprints,
    },
  ];

  return (
    <Card title="All Time Stats">
      <div className="grid grid-cols-2 gap-2 sm:gap-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gray-50 dark:bg-midnight-50 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-zinc-800 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between w-full gap-2">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  {stat.label}
                </span>
                <div className="flex-shrink-0 p-1.5 text-orange-600 dark:text-orange-500">
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.unit}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
