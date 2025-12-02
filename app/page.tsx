import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import TechStack from "@/components/sections/TechStack";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Eligibility from "@/components/sections/Eligibility";
import Hackathon from "@/components/sections/Hackathon";
import BeyondCoding from "@/components/sections/BeyondCoding";
import StravaCard from "@/components/strava/StravaCard";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-gray-900">
      <section className="max-w-6xl mx-auto lg:px-28">
        <Hero />
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="lg:col-span-2">
          <AboutMe />
        </div>
        <div className="flex flex-col gap-2 lg:gap-3">
          <Education />
          <Eligibility />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36 py-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <Experience />
          <Hackathon />
        </div>
        <div className="flex flex-col gap-2">
          <TechStack />
          <BeyondCoding />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36">
        <Projects />
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-36 py-3 grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="lg:col-span-3">
          <Certifications />
        </div>
        <div className="w-full">
          <StravaCard />
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}
