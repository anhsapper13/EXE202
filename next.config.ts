const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "placekitten.com",
      "placedog.net",
      "localhost",
      "m.media-amazon.com",
      "chewychews.com.au",
      "bf1af2.a-cdn.akinoncloud.com",
      "homepage.momocdn.net",
      "images.pexels.com",
      "placeholder.com"
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "2400",
        pathname: "/api/image/get/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placekitten.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placedog.net",
        port: "",
        pathname: "/**",
      },
      // Amazon
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chewychews.com.au",
        port: "",
        pathname: "/**",
      },
      // CDN services
      {
        protocol: "https",
        hostname: "bf1af2.a-cdn.akinoncloud.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "homepage.momocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pet-shop-be.fly.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
     
      {
        protocol: "https",
        hostname: "placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],

    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    unoptimized: false,
    loader: "default",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
