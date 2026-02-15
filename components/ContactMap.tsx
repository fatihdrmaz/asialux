"use client";

export default function ContactMap() {
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.279470924!2d28.9137603!3d41.0297933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAxJzQ3LjIiTiAyOMKwNTQnNDkuNiJF!5e0!3m2!1str!2str!4v1234567890";

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-display font-bold text-dark-950 mb-6">Konum</h3>
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg aspect-video bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38527.5!2d28.95!3d41.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5e6f35b5e27%3A0x705c37e008891ab5!2sBayrampa%C5%9Fa%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Asialux konum"
          className="w-full h-full min-h-[300px]"
        />
      </div>
    </section>
  );
}
