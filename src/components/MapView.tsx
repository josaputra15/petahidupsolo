import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Vendor } from "@/data/vendors";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapViewProps {
  vendors: Vendor[];
  selectedVendor?: Vendor | null;
  onVendorClick?: (vendor: Vendor) => void;
  showRadius?: boolean;
  className?: string;
  center?: [number, number];
  zoom?: number;
}

const MapView = ({
  vendors,
  selectedVendor,
  onVendorClick,
  showRadius = false,
  className = "",
  center = [-7.5755, 110.8243],
  zoom = 13,
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Create custom icon
    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="
        background-color: hsl(0, 70%, 47%);
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // Add markers
    vendors.forEach((vendor) => {
      const marker = L.marker([vendor.location.lat, vendor.location.lng], {
        icon: customIcon,
      }).addTo(mapInstanceRef.current!);

      marker.bindPopup(`
        <div style="min-width: 150px;">
          <strong style="font-family: serif;">${vendor.name}</strong>
          <p style="margin: 4px 0; font-size: 12px; color: #666;">${vendor.sells.slice(0, 2).join(", ")}</p>
          <p style="margin: 0; font-size: 11px; color: #888;">${vendor.location.addressText}</p>
        </div>
      `);

      if (onVendorClick) {
        marker.on("click", () => onVendorClick(vendor));
      }

      markersRef.current.push(marker);
    });
  }, [vendors, onVendorClick]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing circle
    if (circleRef.current) {
      circleRef.current.remove();
      circleRef.current = null;
    }

    // Add circle for selected vendor
    if (selectedVendor && showRadius) {
      circleRef.current = L.circle(
        [selectedVendor.location.lat, selectedVendor.location.lng],
        {
          radius: selectedVendor.radiusMeters,
          color: "hsl(0, 70%, 47%)",
          fillColor: "hsl(0, 70%, 47%)",
          fillOpacity: 0.15,
          weight: 2,
        }
      ).addTo(mapInstanceRef.current);

      mapInstanceRef.current.setView(
        [selectedVendor.location.lat, selectedVendor.location.lng],
        15
      );
    }
  }, [selectedVendor, showRadius]);

  return (
    <div
      ref={mapRef}
      className={`h-full w-full rounded-lg ${className}`}
      style={{ minHeight: "300px" }}
    />
  );
};

export default MapView;
