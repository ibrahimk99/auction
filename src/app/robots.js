export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "",
    },
    sitemap: "https://auction-fr4o.vercel.app/sitemap.xml",
  };
}
