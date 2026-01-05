import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Vendor } from "@/data/vendors";

interface VendorCardProps {
  vendor: Vendor;
  showFullStory?: boolean;
}

const VendorCard = ({ vendor, showFullStory = false }: VendorCardProps) => {
  return (
    <Card className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={vendor.photos[0]}
          alt={`Foto ${vendor.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-serif text-xl font-bold text-card">
            {vendor.name}
          </h3>
          <p className="text-sm text-card/90">{vendor.age && `${vendor.age} tahun • `}{vendor.vendorType}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-3 flex flex-wrap gap-1">
          {vendor.sells.slice(0, 3).map((item) => (
            <Badge key={item} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
          {vendor.sells.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{vendor.sells.length - 3}
            </Badge>
          )}
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {showFullStory ? vendor.story : vendor.story.substring(0, 100) + "..."}
        </p>
        <div className="mb-4 flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
          <span className="line-clamp-1">{vendor.location.addressText}</span>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/pedagang/${vendor.slug}`}>Lihat Profil</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
