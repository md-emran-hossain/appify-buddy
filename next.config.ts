import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'import'],
    quietDeps: true,
  },
};

export default nextConfig;
