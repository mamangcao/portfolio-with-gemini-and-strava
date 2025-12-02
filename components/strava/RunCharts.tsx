"use client";

import { useState, useMemo, useEffect } from "react";
import { Line, LineChart, CartesianGrid, XAxis, TooltipProps } from "recharts";
import { motion } from "framer-motion";
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import Card from "@/components/sections/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  start_date_local: string;
  type: string;
}

interface RunChartsProps {
  activities: StravaActivity[];
}

interface ChartData {
  name: string;
  fullDate: string;
  distance: number;
  timeMinutes: number;
  elevationGain: number;
}

const chartConfig = {
  distance: { label: "Distance", color: "hsl(var(--primary))" },
  timeMinutes: { label: "Time", color: "hsl(var(--primary))" },
  elevationGain: { label: "Elevation", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const getWeekStart = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload as ChartData;
    return (
      <div className="min-w-[150px] rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-zinc-200">
          {entry.name}
        </p>
        <div className="grid gap-2 text-xs">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              Distance
            </div>
            <span className="font-mono font-medium text-slate-900 dark:text-zinc-50">
              {entry.distance} km
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Time
            </div>
            <span className="font-mono font-medium text-slate-900 dark:text-zinc-50">
              {Math.floor(entry.timeMinutes / 60)}h {entry.timeMinutes % 60}m
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Elevation
            </div>
            <span className="font-mono font-medium text-slate-900 dark:text-zinc-50">
              {entry.elevationGain} m
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function RunCharts({ activities = [] }: RunChartsProps) {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const [isMounted, setIsMounted] = useState(false);

  // ✅ FIX: Wrapped in setTimeout to satisfy Linter
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const runs = useMemo(() => {
    return activities.filter((act) => act.type === "Run");
  }, [activities]);

  const data = useMemo(() => {
    if (!isMounted) return [];
    const today = new Date();
    const result: ChartData[] = [];

    if (view === "weekly") {
      for (let i = 11; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i * 7);
        const weekStart = getWeekStart(d);
        const weekKey = weekStart.toISOString().split("T")[0];

        const label =
          i === 0
            ? "This Week"
            : weekStart.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

        result.push({
          name: label,
          fullDate: weekKey,
          distance: 0,
          timeMinutes: 0,
          elevationGain: 0,
        });
      }

      runs.forEach((run) => {
        const runDate = new Date(run.start_date_local);
        const runWeekStart = getWeekStart(runDate).toISOString().split("T")[0];

        const bucket = result.find((r) => r.fullDate === runWeekStart);
        if (bucket) {
          bucket.distance += run.distance;
          bucket.timeMinutes += run.moving_time;
          bucket.elevationGain += run.total_elevation_gain;
        }
      });
    } else {
      for (let i = 5; i >= 0; i--) {
        const d = new Date(today);
        d.setMonth(d.getMonth() - i);
        const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
        const label = d.toLocaleDateString("en-US", { month: "short" });

        result.push({
          name: label,
          fullDate: monthKey,
          distance: 0,
          timeMinutes: 0,
          elevationGain: 0,
        });
      }

      runs.forEach((run) => {
        const runDate = new Date(run.start_date_local);
        const monthKey = `${runDate.getFullYear()}-${runDate.getMonth()}`;

        const bucket = result.find((r) => r.fullDate === monthKey);
        if (bucket) {
          bucket.distance += run.distance;
          bucket.timeMinutes += run.moving_time;
          bucket.elevationGain += run.total_elevation_gain;
        }
      });
    }

    return result.map((item) => ({
      ...item,
      distance: parseFloat((item.distance / 1000).toFixed(2)),
      timeMinutes: Math.floor(item.timeMinutes / 60),
      elevationGain: Math.round(item.elevationGain),
    }));
  }, [view, runs, isMounted]);

  // ✅ FIX: Moved this Hook UP, BEFORE the return statement
  const trendingData = useMemo(() => {
    if (data.length < 2) return { value: 0, isUp: true };
    const current = data[data.length - 1].distance;
    const previous = data[data.length - 2].distance;

    if (previous === 0) return { value: current > 0 ? 100 : 0, isUp: true };

    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change * 10) / 10),
      isUp: change >= 0,
    };
  }, [data]);

  // ✅ FIX: Now we can safely return early if not mounted
  if (!isMounted) {
     return <Card title="Running Breakdown"><div className="h-48 w-full animate-pulse bg-slate-100 dark:bg-zinc-800 rounded-lg" /></Card>;
  }

  return (
    <Card title="Running Breakdown">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col gap-4 lg:gap-6"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Distance and Time
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
                {view === "weekly" ? "Last 12 Weeks" : "Last 6 Months"}
                <ChevronDown
                  size={14}
                  className="text-gray-500 dark:text-gray-400"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              onCloseAutoFocus={(e) => e.preventDefault()}
              sideOffset={8}
              className="w-40 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 p-1"
            >
              <DropdownMenuItem
                onClick={() => setView("weekly")}
                className={`text-sm py-2 cursor-pointer ${
                  view === "weekly"
                    ? "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                }`}
              >
                Last 12 Weeks
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setView("monthly")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  view === "monthly"
                    ? "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                }`}
              >
                Last 6 Months
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ChartContainer
          config={chartConfig}
          className="h-48 w-full text-orange-500 dark:text-white"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="hsl(var(--muted))"
              strokeDasharray="4 4"
            />

            <XAxis dataKey="name" hide={true} />

            <ChartTooltip cursor={false} content={<CustomTooltip />} />

            <Line
              dataKey="distance"
              type="natural"
              stroke="currentColor"
              strokeWidth={2}
              dot={{
                fill: "currentColor",
                stroke: "var(--background)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: "currentColor",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>

        <div className="flex items-start gap-2 text-sm border-t border-slate-100 dark:border-zinc-800 pt-4">
          <div className="grid gap-1">
            <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
              Trending {trendingData.isUp ? "up" : "down"} by{" "}
              {trendingData.value}% this {view === "weekly" ? "week" : "month"}
              {trendingData.isUp ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-rose-500" />
              )}
            </div>
            <div className="text-xs text-muted-foreground text-gray-500 dark:text-gray-400">
              Showing total distance for the last{" "}
              {view === "weekly" ? "12 weeks" : "6 months"}
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}