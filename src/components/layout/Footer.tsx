import { Link } from "react-router-dom";
import { MapPin, Instagram, Heart } from "lucide-react";
import logoImage from "@/components/pictures/petahidupsolo-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logoImage} 
                alt="Peta Hidup Solo" 
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-foreground">
                  Peta Hidup Solo
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Memetakan kehidupan, menghubungkan harapan. Satu langkah kecil untuk
              pedagang kecil Solo.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/peta"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Lihat Peta
                </Link>
              </li>
              <li>
                <Link
                  to="/dukung"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dukung Mereka
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">
              Ikuti Kami
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/petahidupsolo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@petahidupsolo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Kontak:{" "}
              <a
                href="https://wa.me/6289508072677"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                +62 895-0807-2677
              </a>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            Peta Hidup Solo adalah inisiatif komunitas independen. Semua donasi
            disalurkan langsung kepada pedagang yang membutuhkan dengan transparansi
            penuh. Kami bukan lembaga resmi atau organisasi nirlaba terdaftar.
          </p>
          <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground">
            Dibuat dengan <Heart className="h-3 w-3 text-primary" /> untuk Solo
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
