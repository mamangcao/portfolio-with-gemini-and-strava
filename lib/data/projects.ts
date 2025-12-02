export interface Project {
  title: string;
  desc: string;
  year: string;
  built: string;
  url: string;
  href: string;
  made?: string; // Optional
}

export const projects: Project[] = [
  {
    title: "Running Stats Dashboard",
    desc: "Showcasing real-time running statistics fetched from the Strava API.",
    year: "2025",
    made: "Personal Project",
    built: "Typescript, NextJS, TailwindCSS, Strava API, Vercel",
    url: "mamangcao.com/running-era",
    href: "https://mamangcao.vercel.app/running-era",
  },
  {
    title: "Al-Jalis As-Salih, Inc. (v2)",
    desc: "Empowering communities through authentic Islamic education.",
    year: "2025",
    made: "Al-Jalis As-Salih, Inc.",
    built:
      "javascript, laravel, react, vitejs, tailwindcss, motiondev, mysql, vscode",
    url: "thegoodcompanion.net",
    href: "https://thegoodcompanion.net",
  },
  {
    title: "Portfolio / Creative Resume",
    desc: "A creative resume featuring an AI chatbot that represents me.",
    year: "2025",
    made: "Personal Project",
    built: "javascript, typescript, nextjs, tailwindcss, vercel, vscode",
    url: "GitHub Repository",
    href: "https://github.com/mamangcao/portfolio-nextjs",
  },
  {
    title: "The Good Companion Academy",
    desc: "A comprehensive academy providing transformative Islamic education.",
    year: "2024",
    made: "The Good Companion Academy",
    built:
      "wordpress, typescript, laravel, react, vitejs, tailwindcss, mysql, vscode",
    url: "academy.thegoodcompanion.net",
    href: "https://academy.thegoodcompanion.net",
  },
  {
    title: "Al-Jalis As-Salih, Inc. (v1)",
    desc: "Empowering communities through authentic Islamic education.",
    year: "2019",
    made: "Al-Jalis As-Salih, Inc.",
    built: "laravel, php, materialui, mysql",
    url: "thegoodcompanion.net",
    href: "",
  },
  {
    title: "MIMSA Attendance System",
    desc: "Attendance system for MIMSA using their ID Number as reference.",
    year: "2018",
    built: "laravel, php, bootstrap, postgresql",
    url: "",
    href: "",
  },
  {
    title: "Pharmacy Web Management System",
    desc: "Pharmacy web management system for inventory and sales tracking.",
    year: "2018",
    built: "laravel, php, materialui, postgresql",
    url: "",
    href: "",
  },
];
