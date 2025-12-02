const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";

export const getAccessToken = async () => {
  if (!clientId || !clientSecret || !refreshToken) {
    console.error("CRITICAL ERROR: Missing Environment Variables");
    console.log("Client ID:", clientId ? "OK" : "MISSING");
    console.log("Client Secret:", clientSecret ? "OK" : "MISSING");
    console.log("Refresh Token:", refreshToken ? "OK" : "MISSING");
    return null;
  }

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Strava Token Error:", errorData);
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("NETWORK ERROR: Could not connect to Strava.", error);
    return null;
  }
};

export const getStravaData = async () => {
  try {
    const accessToken = await getAccessToken();

    // Check if token generation failed
    if (!accessToken) {
      console.error(
        "Failed to generate Access Token. Check STRAVA_REFRESH_TOKEN."
      );
      return null;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };

    // Fetch Profile
    const profileRes = await fetch("https://www.strava.com/api/v3/athlete", {
      headers,
      cache: "no-store",
    });

    const athlete = await profileRes.json();

    if (athlete.message === "Authorization Error") {
      console.error("Strava Auth Error:", athlete);
      return null;
    }

    // Fetch Activities & Stats
    const [activitiesRes, statsRes] = await Promise.all([
      fetch("https://www.strava.com/api/v3/athlete/activities?per_page=100", {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    const activities = await activitiesRes.json();
    const stats = await statsRes.json();

    if (!Array.isArray(activities)) {
      console.error("API Error: 'activities' is not an array.", activities);
      return { athlete, activities: [], stats };
    }

    return { athlete, activities, stats };
  } catch (error) {
    console.error("Fatal Error fetching Strava data:", error);
    return null;
  }
};
