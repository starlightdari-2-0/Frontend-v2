/** @type {import('next').NextConfig} */
const s3_hostname = process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_HOSTNAME;

const nextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true, // styled-components 활성화
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: s3_hostname,
        port: "",
      },
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
      },
      {
        protocol: "https",
        hostname: "starlightbucket2.s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dummy.image",
        port: "",
        pathname: "/**",
      },
      { protocol: "http", hostname: "img1.kakaocdn.net" },
      { protocol: "http", hostname: "k.kakaocdn.net" },
    ],
  },
};

export default nextConfig;
