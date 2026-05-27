export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/offers"],
        disallow: ["/cart", "/orders", "/login", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/offers"],
        disallow: ["/cart", "/orders", "/login", "/api/"],
      },
    ],
    sitemap: "https://bansaltrading.com/sitemap.xml",
  };
}
