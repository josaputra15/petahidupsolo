import { Link } from "react-router-dom";
import { Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/Section";

const Dukung = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-accent to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Dukung Kami
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Ikuti dan dukung perjalanan kami di media sosial
          </p>
        </div>
      </section>

      {/* Social Media Links */}
      <Section>
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Instagram */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Dukung kami di Instagram
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ikuti @petahidupsolo untuk update terbaru
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="gap-2"
                >
                  <a
                    href="https://www.instagram.com/petahidupsolo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-5 w-5" />
                    Ikuti
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* TikTok */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
                  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Dukung kami di TikTok
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ikuti @petahidupsolo untuk konten video
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2"
                >
                  <a
                    href="https://www.tiktok.com/@petahidupsolo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                    Ikuti
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Bank Account Info */}
      <Section className="bg-card">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Donasi
              </h3>
              <p className="text-foreground">
                Jika mau donasi kirim ke <strong>Sepriana Ester Eyrene</strong>
              </p>
              <p className="mt-2 text-lg font-semibold text-primary">
                BRI = 106301003934536
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
            Kenali mereka lebih dekat
          </h2>
          <p className="mt-3 text-primary-foreground/90">
            Lihat profil pedagang di peta dan baca cerita mereka.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-6 gap-2"
          >
            <Link to="/peta">
              Jelajahi Peta
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </main>
  );
};

export default Dukung;
