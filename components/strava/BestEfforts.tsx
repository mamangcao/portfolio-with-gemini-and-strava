"use client";

import { useMemo } from "react";
import Card from "@/components/sections/Card";
import { Medal, Trophy, Calendar, Info } from "lucide-react";

interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  average_speed: number;
  start_date_local: string;
  type: string;
}

interface BestEffortsProps {
  activities?: StravaActivity[];
}

const EFFORT_DISTANCES = [
  { label: "5K", distance: 5000 },
  { label: "10K", distance: 10000 },
  { label: "15K", distance: 15000 },
  { label: "Half Marathon", distance: 21097 },
  { label: "Marathon", distance: 42195 },
];

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function BestEfforts({ activities = [] }: BestEffortsProps) {
  const bestEfforts = useMemo(() => {
    const runs = activities.filter((a) => a.type === "Run");
    if (runs.length === 0) return [];

    return EFFORT_DISTANCES.map((target) => {
      const eligibleRuns = runs.filter(
        (run) => run.distance >= target.distance
      );

      if (eligibleRuns.length === 0) {
        return {
          label: target.label,
          time: "--:--",
          date: "-",
          isUnlocked: false,
        };
      }

      const bestRun = eligibleRuns.reduce((prev, current) =>
        prev.average_speed > current.average_speed ? prev : current
      );

      const estimatedTimeSeconds = target.distance / bestRun.average_speed;

      return {
        label: target.label,
        time: formatTime(estimatedTimeSeconds),
        date: new Date(bestRun.start_date_local).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "2-digit",
        }),
        isUnlocked: true,
      };
    });
  }, [activities]);

  if (!activities || activities.length === 0) return null;

  const runCount = activities.filter((a) => a.type === "Run").length;

  return (
    <Card title="Recent Best Efforts">
      <div className="space-y-1">
        {bestEfforts.map((effort) => (
          <div
            key={effort.label}
            className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-zinc-800 last:border-0 group cursor-default"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  effort.isUnlocked
                    ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-400"
                }`}
              >
                {effort.isUnlocked ? <Trophy size={16} /> : <Medal size={16} />}
              </div>

              <span
                className={`font-semibold text-sm transition-colors ${
                  effort.isUnlocked
                    ? "text-gray-700 dark:text-gray-300 group-hover:text-orange-500"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {effort.label}
              </span>
            </div>

            <div className="text-right">
              <div
                className={`font-bold tabular-nums ${
                  effort.isUnlocked
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-300 dark:text-zinc-700"
                }`}
              >
                {effort.time}
              </div>

              {effort.isUnlocked && (
                <div className="flex items-center justify-end gap-1 mt-0.5 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <Calendar size={10} />
                  {effort.date}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 dark:text-zinc-600 bg-gray-50 dark:bg-zinc-800/50 py-2 rounded-md">
        <Info size={12} />
        <span>
          Based on my last{" "}
          <span className="font-semibold text-gray-600 dark:text-gray-400">
            {runCount} runs
          </span>
        </span>
      </div>
    </Card>
  );
}
