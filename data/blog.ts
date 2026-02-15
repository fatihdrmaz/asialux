export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "led-aydinlatma-trendleri-2025",
    title: "LED Aydınlatma Trendleri 2025",
    excerpt: "Yeni nesil LED teknolojileri ve mekân tasarımında öne çıkan trendler.",
    date: "2025-02-01",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
  },
  {
    slug: "dis-mekan-aydinlatma-ipuclari",
    title: "Dış Mekan Aydınlatması İpuçları",
    excerpt: "Peyzaj ve dış cephe aydınlatmasında dikkat edilmesi gerekenler.",
    date: "2025-01-15",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
  },
  {
    slug: "enerji-tasarruflu-aydinlatma",
    title: "Enerji Tasarruflu Aydınlatma Çözümleri",
    excerpt: "LED ürünlerle elektrik tüketimini azaltmanın yolları.",
    date: "2025-01-05",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
