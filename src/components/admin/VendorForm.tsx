import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Vendor } from "@/data/vendors";
import { uploadVendorImage } from "@/lib/vendors";

interface VendorFormProps {
  vendor?: Vendor | null;
  onSubmit: (vendor: Omit<Vendor, "id" | "createdAt">) => Promise<void>;
  onCancel: () => void;
}

const VendorForm = ({ vendor, onSubmit, onCancel }: VendorFormProps) => {
  const [formData, setFormData] = useState({
    slug: vendor?.slug || "",
    name: vendor?.name || "",
    age: vendor?.age?.toString() || "",
    vendorType: vendor?.vendorType || "makanan",
    sells: vendor?.sells.join(", ") || "",
    story: vendor?.story || "",
    locationLat: vendor?.location.lat.toString() || "",
    locationLng: vendor?.location.lng.toString() || "",
    locationAddress: vendor?.location.addressText || "",
    radiusMeters: vendor?.radiusMeters.toString() || "100",
  });

  const [photos, setPhotos] = useState<string[]>(vendor?.photos || []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");
      const uploadPromises = Array.from(files).map((file, index) =>
        uploadVendorImage(file, slug, photos.length + index)
      );
      const urls = await Promise.all(uploadPromises);
      setPhotos([...photos, ...urls]);
    } catch (error: any) {
      alert("Gagal mengupload gambar: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");
      
      await onSubmit({
        slug,
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : undefined,
        vendorType: formData.vendorType,
        sells: formData.sells.split(",").map((s) => s.trim()).filter(Boolean),
        story: formData.story,
        photos,
        location: {
          lat: parseFloat(formData.locationLat),
          lng: parseFloat(formData.locationLng),
          addressText: formData.locationAddress,
        },
        radiusMeters: parseInt(formData.radiusMeters) || 100,
        tags: [],
      });
    } catch (error) {
      // Error handling is done in parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="slug">Slug (URL-friendly)</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="pak-kaswadi-putu-bambu"
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Kosongkan untuk auto-generate dari nama
          </p>
        </div>

        <div>
          <Label htmlFor="name">Nama *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="age">Usia</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="vendorType">Kategori *</Label>
          <Select
            value={formData.vendorType}
            onValueChange={(value) => setFormData({ ...formData, vendorType: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="makanan">Makanan</SelectItem>
              <SelectItem value="barang">Barang</SelectItem>
              <SelectItem value="jasa">Jasa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="sells">Yang Dijual (pisahkan dengan koma) *</Label>
          <Input
            id="sells"
            value={formData.sells}
            onChange={(e) => setFormData({ ...formData, sells: e.target.value })}
            placeholder="Puthu Bambu, Kue Putu"
            required
            className="mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="story">Cerita *</Label>
          <Textarea
            id="story"
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            rows={4}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="locationLat">Latitude *</Label>
          <Input
            id="locationLat"
            type="number"
            step="any"
            value={formData.locationLat}
            onChange={(e) => setFormData({ ...formData, locationLat: e.target.value })}
            placeholder="-7.5755"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="locationLng">Longitude *</Label>
          <Input
            id="locationLng"
            type="number"
            step="any"
            value={formData.locationLng}
            onChange={(e) => setFormData({ ...formData, locationLng: e.target.value })}
            placeholder="110.8243"
            required
            className="mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="locationAddress">Alamat *</Label>
          <Input
            id="locationAddress"
            value={formData.locationAddress}
            onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
            placeholder="Jl. Contoh No. 123"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="radiusMeters">Radius (meter)</Label>
          <Input
            id="radiusMeters"
            type="number"
            value={formData.radiusMeters}
            onChange={(e) => setFormData({ ...formData, radiusMeters: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <Label>Foto</Label>
        <div className="mt-2 space-y-4">
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
              <Button type="button" variant="outline" className="gap-2" disabled={uploading}>
                <Upload className="h-4 w-4" />
                {uploading ? "Mengupload..." : "Upload Foto"}
              </Button>
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="h-32 w-full rounded object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Menyimpan..." : vendor ? "Update" : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;

