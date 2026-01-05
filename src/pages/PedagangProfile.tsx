import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, Clock, ArrowLeft, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/Section";
import MapView from "@/components/MapView";
import VendorCard from "@/components/VendorCard";
import { getVendorBySlug, getRelatedVendors } from "@/data/vendors";
import { useToast } from "@/hooks/use-toast";

const PedagangProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const vendor = slug ? getVendorBySlug(slug) : undefined;
  const relatedVendors = slug ? getRelatedVendors(slug, 3) : [];

  if (!vendor) {
    return <Navigate to="/peta" replace />;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vendor.name} - Peta Hidup Solo`,
        text: vendor.story.substring(0, 100) + "...",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link disalin!",
        description: "Bagikan profil ini ke teman-temanmu.",
      });
    }
  };

  const scrollToSupport = () => {
    document.getElementById("dukungan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Back Button */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/peta">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Peta
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Photo Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={vendor.photos[0]}
                  alt={`Foto ${vendor.name}`}
                  className="h-full w-full object-cover"
                />
              </div>
              {vendor.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {vendor.photos.slice(1, 5).map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={photo}
                        alt={`Foto ${vendor.name} ${index + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>

              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                {vendor.name}
              </h1>
              <p className="mt-1 text-lg text-muted-foreground">
                {vendor.age && `${vendor.age} tahun • `}
                {vendor.vendorType}
              </p>

              {/* Story */}
              <div className="mt-6">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Cerita
                </h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
                  {vendor.story}
                </p>
              </div>

              {/* What they sell */}
              <div className="mt-6">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Yang Dijual
                </h2>
                <ul className="mt-3 space-y-2">
                  {vendor.sells.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={scrollToSupport} size="lg" className="gap-2">
                  <Heart className="h-5 w-5" />
                  Dukung {vendor.name}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-5 w-5" />
                  Bagikan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Lokasi
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    {vendor.location.addressText}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Jangkauan: radius ± {vendor.radiusMeters} meter dari titik ini
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Jam Operasional</p>
                  <p className="text-sm text-muted-foreground">
                    Bervariasi, biasanya pagi sampai sore/malam
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[300px] overflow-hidden rounded-lg">
            <MapView
              vendors={[vendor]}
              selectedVendor={vendor}
              showRadius={true}
              zoom={15}
              center={[vendor.location.lat, vendor.location.lng]}
            />
          </div>
        </div>
      </Section>

      {/* Support Section */}
      <Section className="bg-card" id="dukungan">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Bantu {vendor.name}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Dukunganmu bisa membantu {vendor.name} tetap berjualan dan menghidupi
            keluarga.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/dukung">
                <Heart className="h-5 w-5" />
                Donasi Sekarang
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Atau bantu langsung dengan membeli dari {vendor.name} saat bertemu
              di lokasi!
            </p>
          </div>
        </div>
      </Section>

      {/* How to Help Directly */}
      <Section>
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-6">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Cara Membantu Langsung
            </h3>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />
                Kunjungi lokasi dan beli langsung dari {vendor.name}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />
                Rekomendasikan ke teman, keluarga, atau di media sosial
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />
                Berikan review positif jika sudah pernah mencoba
              </li>
            </ul>
          </CardContent>
        </Card>
      </Section>

      {/* Related Vendors */}
      <Section className="bg-card">
        <SectionHeader
          title="Profil Lainnya"
          subtitle="Kenali pedagang lain yang juga membutuhkan dukungan."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedVendors.map((v) => (
            <VendorCard key={v.id} vendor={v} />
          ))}
        </div>
      </Section>
    </main>
  );
};

export default PedagangProfile;
