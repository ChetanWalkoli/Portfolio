import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
