import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Heart, Share2, Users, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/Section";
import VendorCard from "@/components/VendorCard";
import { vendors } from "@/data/vendors";
import backgroundImage1 from "@/components/pictures/petahidupsolosampul.png";
import backgroundImage2 from "@/components/pictures/petahidupsolobackground2.png";

const Index = () => {
  const latestVendors = vendors.slice(0, 6);
  
  // Array of background images - easy to add more later
  const backgroundImages = [backgroundImage1, backgroundImage2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Rotate background images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const reasons = [
    {
      title: "Mereka tak terlihat",
      description:
        "Ribuan pedagang kecil di Solo tidak tercatat dalam data resmi. Mereka ada, tapi dianggap tidak ada.",
    },
    {
      title: "Setiap gerobak, sebuah cerita",
      description:
        "Di balik dagangan sederhana, ada perjuangan membesarkan anak, merawat orang tua sakit, atau bertahan hidup.",
    },
    {
      title: "Bantuan langsung & transparan",
      description:
        "Donasi disalurkan langsung ke pedagang yang membutuhkan, tanpa birokrasi berbelit.",
    },
    {
      title: "Membangun komunitas",
      description:
        "Kita menciptakan jejaring dukungan antara warga Solo dan pedagang yang menjadi bagian hidup kita.",
    },
  ];

  const helpMethods = [
    {
      icon: Heart,
      title: "Donasi",
      description:
        "Bantu mereka dengan donasi. Sekecil apapun, berarti banyak untuk keluarga yang berjuang.",
      cta: "Donasi Sekarang",
      to: "/dukung",
    },
    {
      icon: Share2,
      title: "Bagikan",
      description:
        "Ceritakan ini ke teman, keluarga, atau media sosialmu. Semakin banyak yang tahu, semakin besar dampaknya.",
      cta: "Bagikan Cerita",
      to: "/peta",
    },
    {
      icon: Users,
      title: "Jadi Relawan",
      description:
        "Bantu kami memetakan pedagang di sekitarmu. Kamu adalah mata dan telinga kami di lapangan.",
      cta: "Gabung Relawan",
      to: "https://wa.me/6289508072677",
      isExternal: true,
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background images with rotation */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: index === currentImageIndex ? 0.30 : 0,
            }}
          ></div>
        ))}
        
        {/* Red gradient overlay - stronger red from top to bottom */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, hsl(0, 20%, 5%, 0.25), hsl(0, 10%, 2%, 0.15), hsl(0, 10%, 50%, 0.25), hsl(0, 70%, 47%, 0.30), hsl(0, 70%, 47%, 0.45))',
          }}
        ></div>
        
        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Karena Semua Hidup,
              <span className="block text-primary">Layak Terlihat.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Peta Hidup Solo memetakan pedagang kecil yang tak terlihat
              di Solo. Kita bantu mereka tetap berjuang, satu langkah kecil setiap kali.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link to="/peta">
                  <MapPin className="h-5 w-5" />
                  Lihat Peta
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/dukung">
                  <Heart className="h-5 w-5" />
                  Dukung Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container relative mx-auto mt-16 px-4">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:gap-8">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-primary md:text-4xl">
                {vendors.length}+
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pedagang Terdaftar
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-primary md:text-4xl">
                5
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Kecamatan Terjangkau
              </p>
            </div>
            {/* <div className="text-center">
              <p className="font-serif text-3xl font-bold text-primary md:text-4xl">
                Rp 2.5jt
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Donasi Terkumpul
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <Section className="bg-card">
        <SectionHeader
          title="Kenapa ini penting?"
          subtitle="Solo punya ribuan pedagang kecil yang menjadi nadi ekonomi informal kota ini."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-serif text-lg font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* How to Help */}
      <Section>
        <SectionHeader
          title="Cara membantu"
          subtitle="Ada banyak cara untuk mendukung mereka. Pilih yang paling sesuai untukmu."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {helpMethods.map((method, index) => (
            <Card
              key={index}
              className="group border-border transition-all hover:shadow-lg"
            >
              <CardContent className="flex flex-col p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <method.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {method.title}
                </h3>
                <p className="mt-2 flex-1 text-muted-foreground">
                  {method.description}
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 justify-start p-0 text-primary hover:bg-transparent hover:text-primary/80"
                >
                  {method.isExternal ? (
                    <a href={method.to} target="_blank" rel="noopener noreferrer" className="gap-2 flex items-center">
                      {method.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link to={method.to} className="gap-2">
                      {method.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Latest Vendors */}
      <Section className="bg-card">
        <SectionHeader
          title="Kenali mereka"
          subtitle="Pedagang-pedagang yang sudah kami petakan. Setiap wajah punya kisah."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/peta">
              Lihat Semua Pedagang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Testimonial */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto mb-6 h-12 w-12 text-primary/30" />
          <blockquote className="font-serif text-2xl italic text-foreground md:text-3xl">
            "Terimakasih sobat PHS. Berkat video Tiktok yang viral, saya bisa lebih dikenal oleh masyarakat setempat."
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-foreground">Bu Sri</p>
            <p className="text-sm text-muted-foreground">
              Penjual Tape Ketan - Jembatan Tipes
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-primary">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            Bersama, kita bisa membuat perbedaan.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Mulai dari langkah kecil. Lihat peta, kenali mereka, dan dukung
            sesuai kemampuanmu.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              <Link to="/peta">
                <MapPin className="h-5 w-5" />
                Jelajahi Peta
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/dukung">
                <Heart className="h-5 w-5" />
                Donasi Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Index;
