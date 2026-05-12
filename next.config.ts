import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/lyndhurt-452-3",
        destination: "/projects/lyndhurst-nj-renovation",
        permanent: true,
      },
      {
        source: "/bloomfield%2Cnj-2ws",
        destination: "/projects/west-caldwell-renovation",
        permanent: true,
      },
      {
        source: "/bloomfield%2Cnj-23sr",
        destination: "/projects/bloomfield-garage-deck-driveway",
        permanent: true,
      },
      {
        source: "/bloomfield%2Cnj-6650",
        destination: "/projects/bloomfield-complete-renovation",
        permanent: true,
      },
      {
        source: "/bloomfield%2Cnj-147m",
        destination: "/projects/east-orange-renovation",
        permanent: true,
      },
      {
        source: "/1422hill",
        destination: "/projects/hillside-church-renovation",
        permanent: true,
      },
      {
        source: "/current-projects",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/featured-projects",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/new-all-projects",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/what-people-are-saying",
        destination: "/reviews",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
