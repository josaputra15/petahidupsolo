import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-4 font-serif text-2xl font-semibold text-foreground">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mt-2 text-muted-foreground">
          Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/peta">
              <MapPin className="h-4 w-4" />
              Lihat Peta
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
