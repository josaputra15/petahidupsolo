import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import {
  fetchVendors,
  createVendor,
  updateVendor,
  deleteVendor,
  uploadVendorImage,
  type Vendor,
} from "@/lib/vendors";
import VendorForm from "@/components/admin/VendorForm";

const Dashboard = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await fetchVendors();
      setVendors(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat data vendor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleCreate = () => {
    setEditingVendor(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus ${name}?`)) return;

    try {
      await deleteVendor(id);
      toast({
        title: "Berhasil",
        description: "Vendor berhasil dihapus.",
      });
      loadVendors();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus vendor.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (vendorData: Omit<Vendor, "id" | "createdAt">) => {
    try {
      if (editingVendor) {
        await updateVendor(editingVendor.id, vendorData);
        toast({
          title: "Berhasil",
          description: "Vendor berhasil diperbarui.",
        });
      } else {
        await createVendor(vendorData);
        toast({
          title: "Berhasil",
          description: "Vendor berhasil ditambahkan.",
        });
      }
      setIsDialogOpen(false);
      setEditingVendor(null);
      loadVendors();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">Daftar Vendor</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreate} className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingVendor ? "Edit Vendor" : "Tambah Vendor Baru"}
                </DialogTitle>
              </DialogHeader>
              <VendorForm
                vendor={editingVendor}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingVendor(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Vendor List */}
        {loading ? (
          <div className="text-center text-muted-foreground">Memuat...</div>
        ) : vendors.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Belum ada vendor. Klik "Tambah Vendor" untuk menambahkan.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-serif">{vendor.name}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {vendor.vendorType}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(vendor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(vendor.id, vendor.name)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span className="line-clamp-2">{vendor.location.addressText}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Jualan:</span>{" "}
                      {vendor.sells.slice(0, 3).join(", ")}
                      {vendor.sells.length > 3 && ` +${vendor.sells.length - 3}`}
                    </div>
                    {vendor.photos.length > 0 && (
                      <img
                        src={vendor.photos[0]}
                        alt={vendor.name}
                        className="mt-2 h-32 w-full rounded object-cover"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

