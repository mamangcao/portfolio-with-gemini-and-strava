"use client";

import { useMemo } from "react";
import Card from "@/components/sections/Card";
import {
  Trophy,
  Mountain,
  Timer,
  Zap,
  MapPin,
  Heart,
  Medal,
} from "lucide-react";

// Types
interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  average_speed: number;
  start_date_local: string;
  type: string;
  kudos_count: number;
  achievement_count: number;
}

interface BestEffortsProps {
  activities?: StravaActivity[];
}

const formatDuration = (seconds: number) => {
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

const calculatePace = (speedMps: number) => {
  if (speedMps === 0) return "0:00";
  const secondsPerKm = 1000 / speedMps;
  const min = Math.floor(secondsPerKm / 60);
  const sec = Math.floor(secondsPerKm % 60);
  return `${min}:${sec.toString().padStart(2, "0")}/km`;
};

export default function RecentBest({ activities = [] }: BestEffortsProps) {
  const bests = useMemo(() => {
    const runs = activities.filter((a) => a.type === "Run");

    if (runs.length === 0) return null;

    // Longest Distance
    const longestRun = runs.reduce((prev, current) =>
      prev.distance > current.distance ? prev : current
    );

    // Highest Elevation Gain
    const hilliestRun = runs.reduce((prev, current) =>
      prev.total_elevation_gain > current.total_elevation_gain ? prev : current
    );

    // Fastest Pace (>1km only)
    const validPaceRuns = runs.filter((r) => r.distance > 1000);
    const fastestRun =
      validPaceRuns.length > 0
        ? validPaceRuns.reduce((prev, current) =>
            prev.average_speed > current.average_speed ? prev : current
          )
        : null;

    // Longest Duration
    const longestDuration = runs.reduce((prev, current) =>
      prev.moving_time > current.moving_time ? prev : current
    );

    // Most Kudos
    const mostKudos = runs.reduce((prev, current) =>
      prev.kudos_count > current.kudos_count ? prev : current
    );
    // Golden Run (Most PRs/Achievements in one run)
    const goldenRun = runs.reduce((prev, current) =>
      prev.achievement_count > current.achievement_count ? prev : current
    );

    return [
      {
        label: "Longest Run",
        value: `${(longestRun.distance / 1000).toFixed(2)} km`,
        subValue: longestRun.name,
        date: new Date(longestRun.start_date_local).toLocaleDateString(),
        icon: MapPin,
      },
      {
        label: "Highest Climb",
        value: `${hilliestRun.total_elevation_gain.toFixed(0)} m`,
        subValue: hilliestRun.name,
        date: new Date(hilliestRun.start_date_local).toLocaleDateString(),
        icon: Mountain,
      },
      {
        label: "Fastest Pace",
        value: fastestRun ? calculatePace(fastestRun.average_speed) : "--",
        subValue: fastestRun ? fastestRun.name : "",
        date: fastestRun
          ? new Date(fastestRun.start_date_local).toLocaleDateString()
          : "",
        icon: Zap,
      },
      {
        label: "Longest Time",
        value: formatDuration(longestDuration.moving_time),
        subValue: longestDuration.name,
        date: new Date(longestDuration.start_date_local).toLocaleDateString(),
        icon: Timer,
      },
      {
        label: "Fan Favorite",
        value: `${mostKudos.kudos_count} Kudos`,
        subValue: mostKudos.name,
        date: new Date(mostKudos.start_date_local).toLocaleDateString(),
        icon: Heart,
      },
      {
        label: "Golden Run",
        value: `${goldenRun.achievement_count} Awards`,
        subValue: goldenRun.name,
        date: new Date(goldenRun.start_date_local).toLocaleDateString(),
        icon: Medal,
      },
    ];
  }, [activities]);

  if (!bests) {
    return (
      <Card title="Recent Bests">
        <div className="text-sm text-gray-500 py-4">No recent runs found.</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Bests">
      <div className="space-y-1">
        {bests.map((effort, index) => {
          const Icon = effort.icon;
          return (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800 last:border-0 group cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-500">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors">
                    {effort.label}
                  </div>
                  <div className="text-[10px] text-gray-400 dark:text-gray-500 truncate max-w-[120px] sm:max-w-[150px]">
                    {effort.subValue}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white tabular-nums">
                  {effort.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {effort.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
