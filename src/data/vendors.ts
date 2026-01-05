import budarsi1 from "@/components/pictures/budarsi1.png";
import budarsi2 from "@/components/pictures/budarsi2.png";
import kaswadi1 from "@/components/pictures/kaswadi1.png";
import kaswadi2 from "@/components/pictures/kaswadi2.png";
import sutarno1 from "@/components/pictures/sutarno1.png";
import sutarno2 from "@/components/pictures/sutarno2.png";
import sutarno3 from "@/components/pictures/sutarno3.png";
import murni1 from "@/components/pictures/murni1.png";
import eny1 from "@/components/pictures/eny1.png";
import eny2 from "@/components/pictures/eny2.png";
import sugito1 from "@/components/pictures/sugito1.png";
import sugito2 from "@/components/pictures/sugito2.png";
import mario1 from "@/components/pictures/mario1.png";
import mario2 from "@/components/pictures/mario2.png";
import rohmad1 from "@/components/pictures/rohmadi1.png";
import rohmad2 from "@/components/pictures/rohmadi2.png";

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  age?: number;
  vendorType: string;
  sells: string[];
  story: string;
  photos: string[];
  location: {
    lat: number;
    lng: number;
    addressText: string;
  };
  radiusMeters: number;
  tags: string[];
  createdAt: string;
}

export const vendors: Vendor[] = [
  {
    id: "1",
    slug: "pak-kaswadi-putu-bambu",
    name: "Pak Kaswadi",
    age: 40,
    vendorType: "makanan",
    sells: ["Puthu Bambu"],
    story: "Sejak merantau dari Wonogiri, Pak Kaswadi (40) berjualan putu bambu keliling di Gentan, Ngenden, hingga Banaran. Setiap hari ia mendorong gerobaknya, membawa jajanan tradisional yang dibuat dengan cara sederhana. Dari putu bambu inilah, ia menyambung hidup dan menjaga rasa yang tak banyak berubah.",
    photos: [
      kaswadi1,
      kaswadi2
    ],
    location: {
      lat: -7.578090,
      lng: 110.783906,
      addressText: "Banaran, Gentan, Ngenden"
    },
    radiusMeters: 1000,
    tags: [],
    createdAt: "2025-12-20"
  },
  {
    id: "2",
    slug: "bu-darsi-jamu-gendong",
    name: "Bu Darsi",
    age: 60,
    vendorType: "makanan",
    sells: ["Jamu Kunyit Asam", "Jamu Beras Kencur", "Jamu Temulawak", "Wedang Jahe"],
    story: "Ibu Darsi telah 40 tahun berjualan jamu tradisional sejak merantau dari Wonogiri ke Solo. Selama 10 tahun terakhir, ia mangkal di depan Pasar Jongke, melayani pelanggan setia dengan racikan jamu buatannya sendiri. Meski usianya sudah 60 tahun, ia tetap bertahan berjualan demi menyambung hidup dan menjaga tradisi yang ia jalani seumur hidup.",
    photos: [
      budarsi1,
      budarsi2
    ],
    location: {
      lat: -7.5683,
      lng: 110.7891,
      addressText: "Depan Pasar Jongke, mulai dari pagi sampai siang"
    },
    radiusMeters: 500,
    tags: [],
    createdAt: "2025-01-02"
  },
  {
    id: "3",
    slug: "pak-sutarno-kerupuk-singkong",
    name: "Pak Sutarno",
    age: 58,
    vendorType: "makanan",
    sells: ["Kerupuk Singkong (Tobil)"],
    story: "Pak Sutarno (58) adalah penjual kerupuk singkong (kerupuk tobil) yang berjualan keliling di area Manahan, Pasar Nongko, hingga Gentan. Berasal dari Ngargoyoso, Kemuning, ia menempuh jarak cukup jauh setiap hari dengan sepeda untuk menjajakan dagangannya. Dengan harga terjangkau dan usaha yang tak kenal lelah, Pak Sutarno menyambung hidup dari kerupuk sederhana yang ia jual dari satu jalan ke jalan lain.",
    photos: [
      sutarno1,
      sutarno2,
      sutarno3
    ],
    location: {
      lat: -7.557974,
      lng: 110.811889,
      addressText: "Manahan, Pasar Nongko, Gentan"
    },
    radiusMeters: 1000,
    tags: [],
    createdAt: "2025-12-20"
  },
  {
    id: "4",
    slug: "bu-murni-rengginang-intip",
    name: "Bu Murni",
    age: 55,
    vendorType: "makanan",
    sells: ["Rengginang", "Intip"],
    story: "Ibu Murni (55) adalah penjual rengginang dan intip yang berjualan keliling menggunakan sepeda ontel. Sejak pagi hingga sore, ia menyusuri jalanan untuk menjajakan dagangannya dari satu tempat ke tempat lain. Dengan tenaga dan ketekunan, Ibu Murni menyambung hidup dari usaha sederhana yang ia jalani setiap hari.",
    photos: [
      murni1,
    ],
    location: {
      lat: -7.558458,
      lng: 110.813901,
      addressText: "Keliling area Mangkubumen - Kepatihan"
    },
    radiusMeters: 1000,
    tags: [],
    createdAt: "2025-12-25"
  },
  {
    id: "5",
    slug: "bu-eny-tahu-cress",
    name: "Ibu Eny",
    age: 54,
    vendorType: "makanan",
    sells: ["Tahu Cress"],
    story: "Ibu Eny (54) adalah penjual tahu cress yang berjualan keliling di area Sriwedari. Setiap hari ia mendorong gerobaknya di sekitar Taman Rusa dan depan sekolah MAN Sriwedari, serta berjualan di CFD saat hari Minggu. Dengan harga terjangkau mulai dari Rp5.000, Ibu Eny menyambung hidup dari dagangan sederhana yang ia jajakan dari satu tempat ke tempat lain.",
    photos: [
      eny1,
      eny2
    ],
    location: {
      lat: -7.567576,
      lng: 110.813099,
      addressText: "Keliling area Sriwedari"
    },
    radiusMeters: 800,
    tags: [],
    createdAt: "2025-01-01"
  },
  {
    id: "6",
    slug: "pak-sugito-batagor",
    name: "Pak Sugito",
    age: 74,
    vendorType: "makanan",
    sells: ["Batagor"],
    story: "Pak Sugito (74) adalah penjual batagor keliling yang telah berjualan selama sekitar 10 tahun. Berasal dari Daleman, ia setiap hari mendorong gerobaknya menyusuri wilayah hingga Duwet, Siwal, dan Baki. Di usia lanjut, Pak Sugito tetap bertahan berjualan demi menyambung hidup dari usaha sederhana yang ia jalani.",
    photos: [
      sugito1,
      sugito2
    ],
    location: {
      lat: -7.589434,
      lng: 110.772644,
      addressText: "Keliling area Daleman - Duwet - Siwal - Baki"
    },
    radiusMeters: 2000,
    tags: [],
    createdAt: "2025-12-15"
  },
  {
    id: "7",
    slug: "pak-mario-karak-kerupuk-rambak",
    name: "Pak Mario",
    age: 66,
    vendorType: "makanan",
    sells: ["Karak, Kerupuk Rambak"],
    story: "Pak Mario (66) adalah penjual karak dan kerupuk rambak yang berjualan keliling dengan sepeda. Berangkat sejak subuh dari Plumbon, Mojolaban, ia menyusuri wilayah hingga SMP 9 Surakarta, Sidodadi, Pajang, dan Laweyan. Di usia senja, Pak Mario tetap bekerja keras demi mencukupi kebutuhan keluarga dari dagangan sederhana yang ia jajakan setiap hari.",
    photos: [
        mario1,
        mario2
    ],
    location: {
      lat: -7.574199,
      lng: 110.784881,
      addressText: "Keliling area Plumbon - Mojolaban - SMP 9 Surakarta - Sidodadi - Pajang - Laweyan"
    },
    radiusMeters: 200,
    tags: [],
    createdAt: "2024-05-01"
  },
  {
    id: "8",
    slug: "pak-rohmad-es-puter",
    name: "Pak Rohmadi",
    age: 58,
    vendorType: "makanan",
    sells: ["Es Puter"],
    story: "Pak Rohmadi adalah penjual es puter yang telah berjualan sejak tahun 2007 di area Manahan dan sekitarnya. Tanpa lapak tetap, ia berkeliling dari pagi hingga malam untuk menjajakan es puter yang diproduksi sendiri. Dari usaha sederhana ini, Pak Rohmadi menyambung hidup dan berharap dagangannya selalu laris untuk mencukupi kebutuhan sehari-hari.",
    photos: [
      rohmad1,
      rohmad2
    ],
    location: {
      lat: -7.556381,
      lng: 110.804487,
      addressText: "Pasar Kliwon, los kue tradisional"
    },
    radiusMeters: 100,
    tags: [],
    createdAt: "2024-05-20"
  }
];

export const getVendorBySlug = (slug: string): Vendor | undefined => {
  return vendors.find(v => v.slug === slug);
};

export const getVendorsByCategory = (category: string): Vendor[] => {
  if (category === "semua") return vendors;
  return vendors.filter(v => v.vendorType === category);
};

export const searchVendors = (query: string): Vendor[] => {
  const lowerQuery = query.toLowerCase();
  return vendors.filter(v => 
    v.name.toLowerCase().includes(lowerQuery) ||
    v.sells.some(s => s.toLowerCase().includes(lowerQuery)) ||
    v.location.addressText.toLowerCase().includes(lowerQuery)
  );
};

export const getRelatedVendors = (currentSlug: string, count: number = 3): Vendor[] => {
  return vendors.filter(v => v.slug !== currentSlug).slice(0, count);
};
