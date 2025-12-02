"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/sections/Card";
import { badges, StravaActivity } from "@/lib/data/trophies";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrophiesProps {
  activities?: StravaActivity[];
}

export default function Trophies({ activities = [] }: TrophiesProps) {
  const [openBadge, setOpenBadge] = useState<string | null>(null);

  const displayBadges = useMemo(() => {
    return badges.filter((badge) => {
      if (!badge.condition) return true;
      return badge.condition(activities);
    });
  }, [activities]);

  const getThemeClasses = (theme: string = "gray") => {
    const styles: Record<string, string> = {
      orange:
        "bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800/50 dark:text-orange-400",
      blue: "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-400",
      green:
        "bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-400",
      red: "bg-red-100 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400",
      yellow:
        "bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-400",
      purple:
        "bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800/50 dark:text-purple-400",
      gray: "bg-gray-50 border-gray-100 text-gray-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-400",
    };
    return styles[theme] || styles.gray;
  };

  if (displayBadges.length === 0) {
    return (
      <Card title="Trophy Case">
        <div className="text-center py-6 text-sm text-gray-500">
          No badges earned yet.
        </div>
      </Card>
    );
  }

  return (
    <Card title="Trophy Case">
      <TooltipProvider>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {displayBadges.map((badge, i) => {
            const isImage = badge.type === "image";

            return (
              <Tooltip
                key={badge.id}
                delayDuration={0}
                open={openBadge === badge.id}
                onOpenChange={(isOpen) =>
                  setOpenBadge(isOpen ? badge.id : null)
                }
              >
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenBadge((prev) =>
                        prev === badge.id ? null : badge.id
                      );
                    }}
                    className={`
                      flex flex-col items-center justify-center p-3 
                      cursor-pointer transition-all group relative rounded-md border
                      ${
                        isImage
                          ? "bg-white dark:bg-midnight-50 border-transparent"
                          : `${getThemeClasses(badge.theme)} border-dashed`
                      }
                    `}
                  >
                    <div className="mb-2 filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-200 flex items-center justify-center h-10 w-10">
                      {isImage ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={badge.imageSrc!}
                            alt={badge.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 100px"
                          />
                        </div>
                      ) : (
                        badge.icon
                      )}
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wide text-center leading-tight opacity-90 text-gray-700 dark:text-gray-200">
                      {badge.name}
                    </span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-[150px] text-center"
                >
                  {badge.description}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </Card>
  );
}
