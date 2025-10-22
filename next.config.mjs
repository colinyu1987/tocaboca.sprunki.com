import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import mdx from "@next/mdx";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: false
});

const withNextIntl = createNextIntlPlugin();

const withMDX = mdx({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // 压缩配置
  compress: true,
  async redirects() {
    return [];
  },

  poweredByHeader: false,
};

// Make sure experimental mdx flag is enabled
const configWithMDX = {
  ...nextConfig,
};

export default withBundleAnalyzer(withNextIntl(withMDX(configWithMDX)));
