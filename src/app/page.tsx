"use client";

import { useEffect, useState } from "react";
import { Users, Heart } from "lucide-react";
import { Header } from "@/components/header";
import { ProfileCard } from "@/components/profile-card";
import { StatCardPercentage } from "@/components/stat-card-percentage";
import { FollowerChart } from "@/components/follower-chart";

interface FollowerDataPoint {
  date: string;
  followers: number;
}

export default function Home() {
  // State für Instagram-Daten
  const [profileData, setProfileData] = useState({
    username: "",
    profileImageUrl: "",
    followers: 0,
    following: 0,
    posts: 0,
  });

  const [followerStats, setFollowerStats] = useState({
    current: 0,
    previous: 0,
    change: 0,
  });

  const [engagementStats, setEngagementStats] = useState({
    current: 0,
    previous: 0,
    change: 0,
  });

  const [followerData, setFollowerData] = useState<FollowerDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // API-Abfrage an das eigene Backend
  useEffect(() => {
    async function fetchInstagramData() {
      try {
        const response = await fetch("/api/instagram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "tobii.ii" }), // Später dynamisch aus WooCommerce holen
        });

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Instagram-Daten");
        }

        const data = await response.json();
        console.log("API Response:", data);

        /**
         * Struktur der API-Antwort (vereinfacht):
         * {
         *   "status": "done",
         *   "response": {
         *     "status_code": 200,
         *     "body": {
         *       "data": {
         *         "user": {
         *           "username": "tobii.ii",
         *           "profile_pic_url": "...",
         *           "edge_followed_by": { "count": 1212 },
         *           "edge_follow": { "count": 532 },
         *           "edge_owner_to_timeline_media": { "count": 1 },
         *           ...
         *         }
         *       }
         *     }
         *   }
         * }
         */
        const user = data.response?.body?.data?.user || {};
        const followersCount = user.edge_followed_by?.count || 0;
        const followingCount = user.edge_follow?.count || 0;
        const postsCount = user.edge_owner_to_timeline_media?.count || 0;

        // Profil-Daten übernehmen
        setProfileData({
          username: user.username || "Unbekannt",
          profileImageUrl: user.profile_pic_url || "",
          followers: followersCount,
          following: followingCount,
          posts: postsCount,
        });

        // Beispielhafte Berechnung von Statistiken
        const prevFollowers = followersCount - Math.round(followersCount * 0.05); // Dummy-Wert
        setFollowerStats({
          current: followersCount,
          previous: prevFollowers,
          change: prevFollowers
            ? ((followersCount - prevFollowers) / prevFollowers) * 100
            : 0,
        });

        const prevEngagement = 2.9; // Beispielhafte Engagement-Rate aus Daten berechnen
        setEngagementStats({
          current: 3.2,
          previous: prevEngagement,
          change: ((3.2 - prevEngagement) / prevEngagement) * 100,
        });

        // Generiere Fake-Daten für Follower-Entwicklung
        setFollowerData(generateFollowerData(followersCount));

        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden der Instagram-Daten:", error);
        setLoading(false);
      }
    }

    fetchInstagramData();
  }, []);

  // Dummy-Daten für die Follower-Entwicklung
  function generateFollowerData(currentFollowers: number): FollowerDataPoint[] {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(
        "de-DE"
      ),
      followers: currentFollowers - i * 5, // Simulierte Entwicklung
    })).reverse();
  }

  return (
    <>
      <Header
        title="Instagram-Dashboard"
        subtitle="Verfolge dein Wachstum und optimiere deine Strategie"
      />

      <ProfileCard {...profileData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCardPercentage
          title="Follower"
          value={followerStats.current}
          prevValue={followerStats.previous}
          change={followerStats.change}
          icon={<Users className="h-4 w-4 text-pink-500" />}
        />
        <StatCardPercentage
          title="Engagement-Rate"
          value={`${engagementStats.current}%`}
          prevValue={`${engagementStats.previous}%`}
          change={engagementStats.change}
          icon={<Heart className="h-4 w-4 text-pink-500" />}
        />
      </div>

      <div className="mb-6">
        {!loading ? (
          <FollowerChart data={followerData} />
        ) : (
          <div className="h-80 w-full flex items-center justify-center bg-card rounded-md">
            <p className="text-muted-foreground">Lade Instagram-Daten...</p>
          </div>
        )}
      </div>
    </>
  );
}
