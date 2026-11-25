/**
 * llms[.]txt route — served at /llms.txt
 *
 * A short, factual description of the site for AI assistants and LLM
 * crawlers (https://llmstxt.org). Facts mirror the Organization JSON-LD
 * on the front page.
 */
import { SITE_URL } from "~/lib/site";

export function loader() {
  const llmsTxt = [
    "# AAAL ApS",
    "",
    "> AAAL ApS er et dansk holdingselskab med fokus på langsigtet værdiskabelse gennem aktivt ejerskab af selskaber inden for ejendom, drift og digitale forretningsmodeller.",
    "",
    "- CVR: 38889206",
    "- Adresse: Risø Huse 1, 4000 Roskilde, Danmark",
    "- E-mail: kontakt@aaal.dk",
    "- Telefon: +45 42 94 26 02",
    "",
    "## Sider",
    "",
    `- [Forside](${SITE_URL}/): Om os, vision & mission, værdier og kontakt`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
  ].join("\n");

  return new Response(llmsTxt, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
