"use client";

import { useEffect, useRef } from "react";
import { Activity } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";

interface Props {
  activities: Activity[];
}

export default function ActivityMap({ activities }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!).setView([9.53, 100.06], 11);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      const CATEGORY_EMOJI: Record<string, string> = {
        "nature-animals": "🐘",
        "water-beaches": "🌊",
        "creative-learning": "🎨",
        "adventure-sports": "🧗",
        "food-cafes": "🍜",
        cultural: "🏛️",
        entertainment: "🎮",
      };

      activities.forEach((activity) => {
        const emoji = CATEGORY_EMOJI[activity.category] || "📍";
        const icon = L.divIcon({
          html: `<div style="font-size:24px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${emoji}</div>`,
          className: "",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        const marker = L.marker([activity.location.lat, activity.location.lng], { icon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:system-ui,sans-serif;min-width:180px">
            <strong style="font-size:14px;color:#1a1a2e">${activity.title}</strong><br/>
            <span style="font-size:11px;color:#6b7280">${activity.location.area}</span><br/>
            <span style="font-size:11px;color:#0096c7;font-weight:bold">${activity.priceNote}</span><br/>
            <a href="/activities/${activity.slug}" style="font-size:12px;color:#ff6b35;font-weight:bold;text-decoration:none">View Details →</a>
          </div>
        `);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activities]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div ref={mapRef} className="w-full h-full rounded-2xl z-0" />
    </>
  );
}
