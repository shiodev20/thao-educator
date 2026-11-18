// robots.txt: allow everything and point search engines to the sitemap (built from SITE_URL).
// If Cloudflare's managed robots.txt is on, Cloudflare adds its own lines in front of this.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const lines = ["User-agent: *", "Allow: /"];
  if (site) lines.push("", `Sitemap: ${new URL("sitemap-index.xml", site).href}`);
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
