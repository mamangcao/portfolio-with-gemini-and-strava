"use client";

import Card from "@/components/sections/Card";

interface YTDStatsProps {
  data: {
    count: number;
    distance: number; // meters
    moving_time: number; // seconds
    elevation_gain: number; // meters
  };
}

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

export default function YTDStats({ data }: YTDStatsProps) {
  const year = new Date().getFullYear();

  if (!data) return null;

  const stats = [
    {
      label: "Runs",
      value: data.count.toLocaleString(),
    },
    {
      label: "Distance",
      value: `${(data.distance / 1000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} km`,
    },
    {
      label: "Time",
      value: formatDuration(data.moving_time),
    },
    {
      label: "Elevation Gain",
      value: `${data.elevation_gain.toLocaleString()} m`,
    },
  ];

  return (
    <Card title="Year-to-Date">
      <div className="space-y-1">
        <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-zinc-800 last:border-0 group cursor-default">
          <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors">
            {year}
          </span>
        </div>

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800 last:border-0 group cursor-default"
          >
            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors">
              {stat.label}
            </span>
            <div className="text-right">
              <div className="font-bold text-gray-900 dark:text-white tabular-nums">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
