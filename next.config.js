/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "scontent-waw2-1.cdninstagram.com", // ✅ Instagram CDN hinzufügen
      "scontent.cdninstagram.com", // ✅ Fallback für andere Regionen
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com", // ✅ Erlaubt ALLE Subdomains von Instagram CDN
        pathname: "/**",
      },
    ],
  },
  output: "standalone", // ✅ Empfohlen für Vercel
};

export default nextConfig;
