"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Card from "@/components/sections/Card";
import { funRuns } from "@/lib/data/fun-runs";

export default function FunRun() {
  // Show recent fun runs and marathons
  const reversedFunRuns = [...funRuns].reverse();

  return (
    <Card title="Recent Fun Runs & Marathons">
      <ul role="list" className="space-y-8">
        {reversedFunRuns.map((run, idx) => (
          <motion.li
            key={run.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative flex gap-x-4 cursor-default"
          >
            <div
              className={`absolute left-0 top-1 flex w-6 justify-center ${
                idx === reversedFunRuns.length - 1 ? "h-6" : "-bottom-8"
              }`}
            >
              <div className="w-px bg-gray-300 dark:bg-zinc-700 transition-colors" />
            </div>

            <div className="relative flex h-6 w-6 flex-none items-center justify-center">
              <div
                className={`h-3 w-3 rounded-full ring-2 ring-gray-200 dark:ring-zinc-900 transition-all duration-300 ${
                  run.status === "completed"
                    ? "bg-orange-600 ring-orange-100 dark:ring-orange-900/30 group-hover:scale-110"
                    : "bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 group-hover:bg-gray-400 dark:group-hover:bg-zinc-500"
                }`}
              />
            </div>

            <div className="flex-auto flex items-center justify-between gap-4 py-0.5 transition-colors duration-200">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                  {run.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-0.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {run.date}
                  </span>
                  <span className="hidden sm:inline text-gray-300 dark:text-zinc-700">
                    •
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-gray-600 dark:text-gray-300">
                      {run.distance}
                    </span>
                    {run.time ? (
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        ({run.time})
                      </span>
                    ) : (
                      <span className="text-[10px] text-orange-600/80 dark:text-orange-400/80 uppercase tracking-wider font-bold">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 relative">
                {run.status === "completed" && run.medalImage ? (
                  <div className="w-10 h-10 relative group-hover:scale-125 transition-transform">
                    <Image
                      src={run.medalImage}
                      alt={`${run.title} Medal`}
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center border border-slate-200 dark:border-zinc-700 group-hover:border-slate-300 transition-colors"></div>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
