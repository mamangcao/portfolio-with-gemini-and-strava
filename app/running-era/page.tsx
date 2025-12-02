import Link from "next/link";
import { getStravaData } from "@/lib/data/strava";
import { MoveLeft } from "lucide-react";

// Components
import AllTimeStats from "@/components/strava/AllTimeStats";
import YTDStats from "@/components/strava/YTDStats";
import RunCharts from "@/components/strava/RunCharts";
import HeroStrava from "@/components/strava/HeroStrava";
import Heatmap from "@/components/strava/HeatMap";
import RunGoal from "@/components/strava/RunGoal";
import ShoeGear from "@/components/strava/ShoeGears";
import Trophies from "@/components/strava/Trophies";
import BestEfforts from "@/components/strava/BestEfforts";
import StravaFooter from "@/components/strava/StravaFooter";
import RecentBest from "@/components/strava/RecentBest";

export const dynamic = "force-dynamic";

export default async function RunningEra() {
  const stravaData = await getStravaData();

  if (!stravaData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load Strava data.</p>
      </div>
    );
  }

  const { athlete, activities, stats } = stravaData;

  return (
    <main className="min-h-screen text-gray-900 fade-in-up">
      <section className="max-w-6xl mx-auto lg:px-28">
        <div className="mt-6 ml-8">
          <Link
            href="/"
            className="flex items-center gap-2 group hover:text-midnight-100 transition-colors"
          >
            <MoveLeft className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-orange-500 transition-transform group-hover:-translate-x-2" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              My Running Era
            </span>
          </Link>
        </div>
        <HeroStrava />
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36">
        <Heatmap activities={activities} />
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36 py-3 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="lg:col-span-2">
          <AllTimeStats data={stats.all_run_totals} />
        </div>
        <div>
          <YTDStats data={stats.ytd_run_totals} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <RunCharts activities={activities} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <RunGoal
              activities={activities}
              period="weekly"
              targetDistance={25}
            />
            <RunGoal
              activities={activities}
              period="monthly"
              targetDistance={100}
            />
          </div>
          <ShoeGear shoes={athlete.shoes} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36 py-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div>
          <RecentBest activities={activities} />
        </div>
        <div>
          <BestEfforts activities={activities} />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 lg:px-36">
        <Trophies activities={activities} />
      </section>
      <StravaFooter />
    </main>
  );
}
