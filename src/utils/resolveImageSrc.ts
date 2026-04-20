const s3BaseUrl = process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_URL;

export const resolveImageSrc = (src?: string | null) => {
  if (!src) return "";
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  if (!s3BaseUrl) return `/${src}`;

  return `${s3BaseUrl.replace(/\/$/, "")}/${src.replace(/^\//, "")}`;
};
