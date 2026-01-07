import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MapView from "@/components/MapView";
import { useVendors } from "@/hooks/useVendors";
import type { Vendor } from "@/data/vendors";

// Search function that works with any vendor array
const searchVendors = (vendors: Vendor[], query: string): Vendor[] => {
  const lowerQuery = query.toLowerCase();
  return vendors.filter(v => 
    v.name.toLowerCase().includes(lowerQuery) ||
    v.sells.some(s => s.toLowerCase().includes(lowerQuery)) ||
    v.location.addressText.toLowerCase().includes(lowerQuery)
  );
};

const categories = [
  { value: "semua", label: "Semua" },
  { value: "makanan", label: "Makanan" },
  { value: "barang", label: "Barang" },
  { value: "jasa", label: "Jasa" },
];

const VENDORS_PER_PAGE = 10;

const Peta = () => {
  const { data: vendors = [], isLoading } = useVendors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredVendors = useMemo(() => {
    let result = searchQuery ? searchVendors(vendors, searchQuery) : vendors;

    if (selectedCategory !== "semua") {
      result = result.filter((v) => v.vendorType === selectedCategory);
    }

    return result;
  }, [vendors, searchQuery, selectedCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredVendors.length / VENDORS_PER_PAGE);
  const startIndex = (currentPage - 1) * VENDORS_PER_PAGE;
  const endIndex = startIndex + VENDORS_PER_PAGE;
  const paginatedVendors = filteredVendors.slice(startIndex, endIndex);

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("semua");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "semua";

  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col">
        <div className="border-b border-border bg-card px-4 py-4">
          <div className="container mx-auto">
            <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Peta Pedagang Solo
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Temukan dan dukung pedagang kecil di sekitarmu
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-muted-foreground">Memuat...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-4">
        <div className="container mx-auto">
          <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Peta Pedagang Solo
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Temukan dan dukung pedagang kecil di sekitarmu
          </p>
        </div>
      </div>

      {/* Filters - Desktop */}
      <div className="hidden border-b border-border bg-background px-4 py-3 md:block">
        <div className="container mx-auto flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama, jualan, atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-1 h-4 w-4" />
              Reset
            </Button>
          )}
          <span className="ml-auto text-sm text-muted-foreground">
            {filteredVendors.length} pedagang ditemukan
          </span>
        </div>
      </div>

      {/* Filters - Mobile */}
      <div className="border-b border-border bg-background px-4 py-3 md:hidden">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>Filter Pedagang</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Kategori</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat.value}
                        variant={
                          selectedCategory === cat.value ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(cat.value)}
                      >
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                </div>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Reset Filter
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {filteredVendors.length} pedagang ditemukan
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Map - Mobile First */}
        <div className="h-[300px] w-full md:order-2 md:h-auto md:flex-1">
          <MapView
            vendors={filteredVendors}
            selectedVendor={selectedVendor}
            onVendorClick={handleVendorClick}
            showRadius={!!selectedVendor}
          />
        </div>

        {/* Vendor List */}
        <div className="flex w-full flex-col border-t border-border bg-card md:order-1 md:w-96 md:border-r md:border-t-0">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {paginatedVendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedVendor?.id === vendor.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => handleVendorClick(vendor)}
                >
                  <CardContent className="flex gap-3 p-3">
                    <img
                      src={vendor.photos[0]}
                      alt={vendor.name}
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-semibold text-foreground truncate">
                          {vendor.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {vendor.sells.slice(0, 2).join(", ")}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{vendor.location.addressText}</span>
                      </div>
                      <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="mt-1 h-auto p-0 text-primary"
                      >
                        <Link to={`/pedagang/${vendor.slug}`}>Lihat Profil →</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredVendors.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <p>Tidak ada pedagang yang cocok dengan filter.</p>
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Reset filter
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          {filteredVendors.length > VENDORS_PER_PAGE && (
            <div className="border-t border-border p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredVendors.length)} dari {filteredVendors.length}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="min-w-[2rem]"
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-muted-foreground">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Peta;
