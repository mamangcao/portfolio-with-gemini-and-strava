"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Footprints, CalendarDays } from "lucide-react";
import Card from "@/components/sections/Card";

interface StravaActivity {
  start_date_local: string;
  distance: number; // meters
  type: string;
}

interface RunGoalProps {
  activities?: StravaActivity[];
  period?: "weekly" | "monthly";
  targetDistance?: number; // in km
}

export default function RunGoal({
  activities = [],
  period = "weekly",
  targetDistance = 30,
}: RunGoalProps) {
  const currentDistance = useMemo(() => {
    const now = new Date();
    const runs = activities.filter((a) => a.type === "Run");
    let totalMeters = 0;

    if (period === "weekly") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const startOfWeek = new Date(now.setDate(diff));
      startOfWeek.setHours(0, 0, 0, 0);

      runs.forEach((run) => {
        const runDate = new Date(run.start_date_local);
        if (runDate >= startOfWeek) {
          totalMeters += run.distance;
        }
      });
    } else {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      runs.forEach((run) => {
        const runDate = new Date(run.start_date_local);
        if (
          runDate.getMonth() === currentMonth &&
          runDate.getFullYear() === currentYear
        ) {
          totalMeters += run.distance;
        }
      });
    }

    return parseFloat((totalMeters / 1000).toFixed(2));
  }, [activities, period]);

  const percentage = Math.min((currentDistance / targetDistance) * 100, 100);

  const chartData = [
    {
      name: "distance",
      value: percentage,
      fill: "#F97316", // Orange-500
    },
  ];

  const title = period === "weekly" ? "Weekly Goal" : "Month Goal";
  const Icon = period === "weekly" ? Footprints : CalendarDays;

  return (
    <Card title={title}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col items-center justify-center w-full"
      >
        <div className="relative w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="75%"
              outerRadius="100%"
              barSize={10}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: "hsl(var(--muted))" }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex items-center justify-center text-orange-600 dark:text-orange-500">
            <Icon
              size={32}
              strokeWidth={2}
              className={period === "weekly" ? "transform -rotate-12" : ""}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {currentDistance === 0
              ? "0"
              : currentDistance.toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
          </span>

          <span className="text-xl text-gray-300 dark:text-zinc-600 font-light">
            /
          </span>

          <span className="text-xl font-medium text-gray-500 dark:text-gray-400">
            {targetDistance}
            <span className="text-sm ml-1 font-normal opacity-70">km</span>
          </span>
        </div>
      </motion.div>
    </Card>
  );
}
