"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Card from "@/components/sections/Card";
import { AlertCircle } from "lucide-react";

interface StravaGear {
  id: string;
  name: string;
  distance: number;
  primary: boolean;
  brand_name?: string;
  model_name?: string;
}

interface ShoeGearProps {
  shoes?: StravaGear[];
}

export default function ShoeGear({ shoes = [] }: ShoeGearProps) {
  const getImageForShoe = (name: string) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("anta") || lowerName.includes("c202")) {
      return "/C202.PNG";
    }

    return null;
  };

  const activeShoes = shoes.sort((a, b) => b.distance - a.distance);

  if (activeShoes.length === 0) {
    return (
      <Card title="Shoe Gears">
        <div className="flex flex-col items-center justify-center py-6 text-gray-500">
          <AlertCircle className="mb-2 text-orange-500 opacity-50" />
          <p className="text-sm">No shoes found in Strava.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Shoe Gears">
      <div className="flex flex-col gap-3">
        {activeShoes.map((shoe, index) => {
          const imageSrc = getImageForShoe(shoe.name);
          const distanceKm = parseFloat((shoe.distance / 1000).toFixed(1));

          const maxDistance = 1200;
          const percentage = Math.min((distanceKm / maxDistance) * 100, 100);

          return (
            <motion.div
              key={shoe.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-800 transition-colors group"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden relative">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={shoe.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="64px"
                  />
                ) : (
                  <span className="text-2xl">👟</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0 pr-2">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                      {shoe.name === "adidas" ? "Anta C202 6" : shoe.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {shoe.primary ? "Primary" : "Rotation"}
                      </p>
                      {shoe.primary && (
                        <span className="text-[9px] bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-1.5 py-0.5 rounded-full font-bold">
                          MAIN
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">
                      {distanceKm}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                      / {maxDistance}km
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      percentage > 100
                        ? "bg-red-500"
                        : percentage > 75
                        ? "bg-orange-500"
                        : "bg-emerald-500"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
