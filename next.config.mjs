import withBundleAnalyzer from '@next/bundle-analyzer';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import createNextIntlPlugin from 'next-intl/plugin';
import { createMDX } from 'fumadocs-mdx/next';


const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
initOpenNextCloudflareForDev();


// TODO cache-control headers don't work for static files
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINTER === 'true'
  },
  typescript: {
    ignoreBuildErrors: process.env.SKIP_LINTER === 'true'
  }
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer()(withNextIntl(withMDX(nextConfig)))
  : withNextIntl(withMDX(nextConfig));
