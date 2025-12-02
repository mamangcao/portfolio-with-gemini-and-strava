"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaStrava } from "react-icons/fa";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "@/components/ui/ThemeToggle";
import React from "react";

export default function HeroStrava() {
  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault(); // Prevent right-click
  };

  return (
    <section className="relative text-gray-900 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-8">
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      <div className="relative flex justify-center sm:justify-start flex-shrink-0 fade-in-up">
        <div className="relative rounded-xl overflow-hidden w-[250px] h-[250px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]">
          <Image
            src="/strava-light.png"
            alt="Profile"
            onContextMenu={handleContextMenu}
            fill
            sizes="(max-width: 640px) 250px, (max-width: 768px) 140px, 160px"
            className="object-cover dark:hidden"
            priority
          />
          <Image
            src="/strava-dark.png"
            alt="Profile"
            onContextMenu={handleContextMenu}
            fill
            sizes="(max-width: 640px) 250px, (max-width: 768px) 140px, 160px"
            className="object-cover hidden dark:block"
            priority
          />
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left fade-in-up">
        <h1 className="text-lg sm:text-xl md:text-2xl dark:text-white font-bold flex items-center justify-center sm:justify-start gap-2">
          Abdul Haleem Mamangcao
          <CheckBadgeIcon className="w-5 h-5 sm:w-5 sm:h-5 text-blue-500" />
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-1 flex items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm">
          <MapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-300" />
          Lanao del Norte, Philippines
        </p>

        <p className="text-sm sm:text-base mt-3 text-gray-700 dark:text-gray-100">
          Building websites and better habits. Beginner in running and staying
          active. Coding daily, training slowly, aiming for fun runs soon and a
          marathon eventually.
        </p>

        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-3">
          <div className="flex items-center gap-2">
            <Link
              href="https://www.linkedin.com/in/abdulhaleemmamangcao"
              target="_blank"
              rel="noopener noreferrer"
              className="transition"
            >
              <FaLinkedin className="w-8 h-8 text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-blue-500 hover:-translate-y-0.5" />
            </Link>

            <Link
              href="https://github.com/mamangcao"
              target="_blank"
              rel="noopener noreferrer"
              className="transition"
            >
              <FaGithub className="w-8 h-8 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200 hover:-translate-y-0.5" />
            </Link>
          </div>
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
              width={32}
              height={32}
              className="rounded-lg w-auto h-8"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
