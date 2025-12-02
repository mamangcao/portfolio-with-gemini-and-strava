🚀 Key Features

🧠 AI Digital Twin (Chatbot)
A conversational AI assistant powered by Google Gemini.
System Prompting: Configured to represent my professional persona, answering queries about my education, skills, and background contextually.
Streaming UI: Real-time text streaming for a natural chat experience.
UI Integration: unobtrusive, accessible chat interface available throughout the site.

👟 "Running Era" Dashboard (Strava API)
A custom, unauthenticated Strava integration visualizing my running data.
Service Account Auth: Implements OAuth 2.0 Token Rotation to keep the API connection alive 24/7 without user login.
Data Visualization: Interactive Heatmaps (GitHub-style) and Performance Charts using Recharts.
Smart Shoe Tracker: Auto-maps Strava gear to custom images and tracks mileage usage.

💼 Portfolio Core
Projects Showcase: Detailed breakdown of my work with tech stacks and live links.
Certifications & Education: Verified credentials and academic background.
Tech Stack: Visual representation of my skills and tools.
Responsive & Smooth: Built with Tailwind CSS for layout and Framer Motion for page transitions.

🛠️ Tech Stack
Category	Technologies
Framework	Next.js, TypeScript, React
Styling	Tailwind CSS, Shadcn UI, Lucide React
Animations	Framer Motion
AI & LLM	Google Gemini API (Generative AI)
Data Viz	Recharts (Charts), Custom SVG Heatmaps
Integration	Strava V3 API (OAuth 2.0)
Deployment	Vercel

⚙️ Environment Variables
To run this project locally, you need to configure API keys for both Strava and Google Gemini. Create a .env.local file:

# --- Strava API (For Running Dashboard) ---
```bash
STRAVA_CLIENT_ID=your_id
STRAVA_REFRESH_TOKEN=your_token
```

# Permanent Refresh Token (Scope: activity:read_all, profile:read_all)
```bash
STRAVA_REFRESH_TOKEN=your_strava_refresh_token
```

# --- Google Gemini (For AI Chatbot) ---
```bash
GOOGLE_API_KEY=your_gemini_api_key
```

🏃‍♂️ Getting Started

Clone the repository:
```bash
git clone https://github.com/mamangcao/portfolio-with-gemini-and-strava.git
cd portfolio-with-gemini-and-strava
```

Install dependencies:
```bash
npm install
```

Run the development server:.
```bash
npm run dev
```

Open http://localhost:3000 with your browser.
