"use client";

import Card from "@/components/sections/Card";
import Image from "next/image";
import { FaStrava } from "react-icons/fa";
import {
  SneakerMoveIcon,
  BarbellIcon,
  SneakerIcon,
  PulseIcon,
} from "@phosphor-icons/react";

export default function StravaCard() {
  return (
    <Card title="Physical Activities">
      <div className="flex flex-col gap-2">
        <a
          href="https://strava.com/athletes/158923467"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center py-1 px-1 bg-orange-600 text-white text-xs font-bold font-sans rounded-md hover:bg-orange-700 hover:-translate-y-0.5 transition-colors shadow-sm"
        >
          <FaStrava className="w-6 h-6 lg:w-5 lg:h-5" />
          <span className="font-normal opacity-90 ml-1">Follow me on</span>
          <Image
            src="https://cdn.brandfetch.io/idTLzKLmej/theme/light/logo.svg"
            alt="Strava"
            width={64}
            height={14}
            className="-ml-1"
          />
        </a>

        <div className="grid grid-cols-2 gap-2">
          <a
            href="/running-era"
            className="group flex flex-col items-center justify-center gap-1 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-sm border border-gray-200 dark:border-zinc-800 hover:scale-105 transition-colors text-zinc-600 dark:text-zinc-300"
          >
            <SneakerMoveIcon
              size={24}
              weight="duotone"
              className="group-hover:animate-run-step"
            />
            <span className="text-xs font-medium">Run</span>
          </a>
          <button className="group flex flex-col items-center justify-center gap-1 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-sm border border-gray-200 dark:border-zinc-800 hover:scale-105 transition-colors text-zinc-600 dark:text-zinc-300">
            <SneakerIcon
              size={24}
              weight="duotone"
              className="group-hover:animate-walk-step"
            />
            <span className="text-xs font-medium">Walk</span>
          </button>
          <button className="group flex flex-col items-center justify-center gap-1 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-sm border border-gray-200 dark:border-zinc-800 hover:scale-105 transition-colors text-zinc-600 dark:text-zinc-300">
            <PulseIcon
              size={24}
              weight="duotone"
              className="group-hover:animate-wiggle"
            />
            <span className="text-xs font-medium">Workout</span>
          </button>
          <button className="group flex flex-col items-center justify-center gap-1 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors text-zinc-600 hover:scale-105 dark:text-zinc-300">
            <BarbellIcon
              size={24}
              weight="duotone"
              className="group-hover:animate-workout-jump"
            />
            <span className="text-xs font-medium">Strength</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
