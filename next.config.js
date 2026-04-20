/** @type {import('next').NextConfig} */
const s3Hostname = process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_HOSTNAME;

const remotePatterns = [
  {
    protocol: "https",
    hostname: "starlightbucket.s3.ap-northeast-2.amazonaws.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "starlightbucket2.s3.ap-northeast-2.amazonaws.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "starlightbucket2.s3.amazonaws.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "dummy.image",
    port: "",
    pathname: "/**",
  },
  { protocol: "http", hostname: "img1.kakaocdn.net" },
  { protocol: "http", hostname: "k.kakaocdn.net" },
];

if (s3Hostname) {
  remotePatterns.unshift({
    protocol: "https",
    hostname: s3Hostname,
    port: "",
    pathname: "/**",
  });
}

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns,
  },
};

module.exports = nextConfig;
