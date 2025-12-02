"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Card from "@/components/sections/Card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StravaActivity {
  start_date_local: string;
  distance: number;
  type: string;
}

interface HeatmapProps {
  activities?: StravaActivity[];
}

interface DayData {
  date: Date;
  distance: number;
  intensity: number;
  count: number;
}

export default function Heatmap({ activities = [] }: HeatmapProps) {
  const [weeksToDisplay, setWeeksToDisplay] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false); // Hydration fix
  const [openDate, setOpenDate] = useState<string | null>(null); // Mobile tap support

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const data = useMemo(() => {
    if (!isMounted) return [];

    const runs = activities.filter((a) => a.type === "Run");
    const runMap = new Map<string, { distance: number; count: number }>();

    runs.forEach((run) => {
      const dateKey = run.start_date_local.split("T")[0];
      const current = runMap.get(dateKey) || { distance: 0, count: 0 };
      runMap.set(dateKey, {
        distance: current.distance + run.distance,
        count: current.count + 1,
      });
    });

    const days: DayData[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      const runData = runMap.get(dateKey);
      const distanceMeters = runData ? runData.distance : 0;
      const distanceKm = parseFloat((distanceMeters / 1000).toFixed(1));
      const count = runData ? runData.count : 0;

      let intensity = 0;
      if (distanceKm > 0) intensity = 1;
      if (distanceKm > 5) intensity = 2;
      if (distanceKm > 10) intensity = 3;
      if (distanceKm > 20) intensity = 4;

      days.push({
        date: d,
        distance: distanceKm,
        intensity,
        count,
      });
    }
    return days;
  }, [activities, isMounted]);

  useEffect(() => {
    const calculateWeeks = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        const COL_WIDTH = 16;
        const maxWeeks = Math.floor(containerWidth / COL_WIDTH);
        setWeeksToDisplay(maxWeeks);
      } else {
        setWeeksToDisplay(52);
      }
    };
    calculateWeeks();
    window.addEventListener("resize", calculateWeeks);
    return () => window.removeEventListener("resize", calculateWeeks);
  }, []);

  const weeks = useMemo(() => {
    if (data.length === 0) return [];
    const result: (DayData | null)[][] = [];
    let currentWeek: (DayData | null)[] = [];
    const firstDayOfWeek = data[0].date.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }
    data.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) result.push(currentWeek);
    return result.slice(-weeksToDisplay);
  }, [data, weeksToDisplay]);

  const monthLabelsMap = useMemo(() => {
    if (weeks.length === 0) return {};
    const map: Record<number, string> = {};
    let currentMonth = -1;
    let lastLabelIndex = -5;
    const MIN_WEEK_GAP = 4;
    weeks.forEach((week, i) => {
      const day = week.find((d) => d !== null);
      if (day) {
        const m = day.date.getMonth();
        if (m !== currentMonth && i - lastLabelIndex >= MIN_WEEK_GAP) {
          if (i < weeks.length - 2) {
            map[i] = day.date.toLocaleString("default", { month: "short" });
            lastLabelIndex = i;
          }
          currentMonth = m;
        }
      }
    });
    return map;
  }, [weeks]);

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-slate-100/80 dark:bg-zinc-800/80";
      case 1:
        return "bg-orange-200 dark:bg-orange-900/60";
      case 2:
        return "bg-orange-300 dark:bg-orange-700";
      case 3:
        return "bg-orange-500 dark:bg-orange-600";
      case 4:
        return "bg-orange-600 dark:bg-orange-500";
      default:
        return "bg-slate-100/80 dark:bg-zinc-800/80";
    }
  };

  const SQUARE_SIZE = "w-3 h-3";
  const GAP_SIZE = "gap-1";

  if (!isMounted || !activities) {
    return (
      <Card title="Activity Heatmap">
        <div className="w-full h-[140px] animate-pulse bg-slate-100 dark:bg-zinc-800 rounded-lg"></div>
      </Card>
    );
  }

  return (
    <Card title="Activity Heatmap">
      <TooltipProvider>
        <div ref={containerRef} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                Runs in the last year
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Less</span>
                <div className={`flex ${GAP_SIZE}`}>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`${SQUARE_SIZE} rounded-[2px] ${getColor(
                        level
                      )}`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            <div className="flex items-start overflow-hidden">
              <div className="overflow-x-auto lg:overflow-x-hidden flex-1 pb-2 no-scrollbar">
                <div className="min-w-max">
                  <div className={`flex ${GAP_SIZE} mb-2 h-3 relative z-10`}>
                    {weeks.map((_, i) => (
                      <div key={i} className="w-3 relative flex-shrink-0">
                        {monthLabelsMap[i] && (
                          <span className="absolute top-0 left-0 text-[10px] font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap">
                            {monthLabelsMap[i]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className={`flex ${GAP_SIZE}`}>
                    {weeks.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className={`flex flex-col ${GAP_SIZE}`}
                      >
                        {week.map((day, dayIndex) => {
                          if (!day)
                            return (
                              <div
                                key={`empty-${weekIndex}-${dayIndex}`}
                                className={`${SQUARE_SIZE} rounded-[2px] opacity-0`}
                              />
                            );

                          const dateKey = day.date.toISOString();
                          return (
                            <Tooltip
                              key={dateKey}
                              delayDuration={0}
                              open={openDate === dateKey}
                              onOpenChange={(isOpen) =>
                                setOpenDate(isOpen ? dateKey : null)
                              }
                            >
                              <TooltipTrigger asChild>
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    delay: weekIndex * 0.005 + dayIndex * 0.005,
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenDate((prev) =>
                                      prev === dateKey ? null : dateKey
                                    );
                                  }}
                                  className={`${SQUARE_SIZE} rounded-[2px] ${getColor(
                                    day.intensity
                                  )} relative group transition-all duration-200 hover:ring-2 hover:ring-orange-300 dark:hover:ring-orange-400 hover:z-10 cursor-pointer`}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <div className="text-xs">
                                  <div className="font-bold mb-1">
                                    {day.distance} km{" "}
                                    <span className="font-normal opacity-80">
                                      {day.count > 1
                                        ? `(${day.count} runs)`
                                        : ""}
                                    </span>
                                  </div>
                                  <div className="opacity-80 font-medium">
                                    {day.date.toLocaleDateString(undefined, {
                                      weekday: "short",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </TooltipProvider>
    </Card>
  );
}
