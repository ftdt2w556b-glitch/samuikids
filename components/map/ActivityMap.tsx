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

      // OpenTopoMap — green terrain, illustrated style
      L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://opentopomap.org/">OpenTopoMap</a> contributors, © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 17,
      }).addTo(map);

      const CATEGORY_COLOR: Record<string, string> = {
        "nature-animals":    "#22c55e",
        "water-beaches":     "#06b6d4",
        "creative-learning": "#f97316",
        "adventure-sports":  "#eab308",
        "food-cafes":        "#ec4899",
        cultural:            "#a855f7",
        entertainment:       "#3b82f6",
      };

      const CATEGORY_LABEL: Record<string, string> = {
        "nature-animals":    "N",
        "water-beaches":     "W",
        "creative-learning": "C",
        "adventure-sports":  "A",
        "food-cafes":        "F",
        cultural:            "K",
        entertainment:       "E",
      };

      activities.forEach((activity) => {
        const color = CATEGORY_COLOR[activity.category] || "#06b6d4";
        const letter = CATEGORY_LABEL[activity.category] || "?";
        const icon = L.divIcon({
          html: `<div style="width:32px;height:32px;background:${color};border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:13px;font-family:system-ui,sans-serif">${letter}</div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
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
