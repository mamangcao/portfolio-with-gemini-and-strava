export interface FunRunEvent {
  id: string;
  title: string;
  date: string;
  distance: string;
  time?: string;
  status: "completed" | "upcoming";
  medalImage?: string;
}

export const funRuns: FunRunEvent[] = [
  {
    id: "2",
    title: "CATS ON THE RUN 2025",
    date: "DEC 14, 2025",
    distance: "10K",
    time: "55:02",
    status: "completed",
    medalImage: "/Alab.png",
  },
  {
    id: "1",
    title: "FREEDOM RUN MARAWI 2025",
    date: "NOV 12, 2025",
    distance: "10K",
    time: "55:02",
    status: "completed",
    medalImage: "/FRMarawi.png",
  },
  {
    id: "5",
    title: "Valentine Vibe Run",
    date: "FEB 14, 2025",
    distance: "10K",
    time: "58:45",
    status: "completed",
    medalImage: "/Alab.png",
  },
  {
    id: "4",
    title: "New Year's Trail Run",
    date: "JAN 18, 2025",
    distance: "21K",
    time: "2:05:30",
    status: "completed",
    medalImage: "/FRMarawi.png",
  },
  {
    id: "3",
    title: "Sunrise Dash 2024",
    date: "DEC 05, 2024",
    distance: "5K",
    time: "28:15",
    status: "completed",
    medalImage: "/Alab.png",
  },
];
