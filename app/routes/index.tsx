/**
 * AAAL ApS – One-pager
 */
import type { Route } from "./+types/index";
import { useState, useRef, useEffect } from "react";
import { SITE_URL } from "~/lib/site";

const META_DESCRIPTION =
  "AAAL ApS er et dansk holdingselskab med fokus på langsigtet værdiskabelse gennem aktivt ejerskab af selskaber inden for ejendom, drift og digitale forretningsmodeller.";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=800&fit=crop";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  return { siteUrl: SITE_URL + url.pathname };
}

export function links() {
  return [
    { rel: "preload", as: "image", href: HERO_IMAGE },
  ];
}

export function meta({ data }: Route.MetaArgs) {
  const title = "AAAL ApS - Holdingselskab";
  const url = data?.siteUrl ?? `${SITE_URL}/`;
  return [
    { title },
    { tagName: "link", rel: "canonical", href: url },
    { name: "description", content: META_DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: META_DESCRIPTION },
    { property: "og:url", content: url },
    { property: "og:locale", content: "da_DK" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: META_DESCRIPTION },
  ];
}

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AAAL ApS",
  url: "https://aaal.dk",
  description: META_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Risø Huse 1",
    addressLocality: "Roskilde",
    postalCode: "4000",
    addressCountry: "DK",
  },
  email: "kontakt@aaal.dk",
  telephone: "+4542942602",
  taxID: "38889206",
};

const SUBMENUS = [
  {
    label: "Om os",
    links: [
      { href: "#om-os", label: "Om os" },
      { href: "#hvem-vi-er", label: "Hvem vi er" },
      { href: "#vision-mission", label: "Vision & Mission" },
      { href: "#vaerdier", label: "Værdier" },
    ],
  },
  {
    label: "Kontakt os",
    links: [
      { href: "#kontakt", label: "Kontakt os" },
      { href: "#samarbejde", label: "Samarbejde" },
    ],
  },
] as const;

const MOBILE_MENU_LINKS: Array<{ href: string; label: string }> = [
  ...SUBMENUS[0].links,
  ...SUBMENUS[1].links,
];

export default function Index({ loaderData }: Route.ComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenIndex(null);
        setMobileOpen(false);
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <div className="onepager">
      <a href="#main-content" className="skip-link">
        Spring til indhold
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <header className="site-header">
        <div className="container header-content">
          <div className="header-logo">
            <a href="#" className="logo-link">
              <h1>AAAL ApS</h1>
              <p className="subtitle">Holdingselskab</p>
            </a>
          </div>

          <button
            type="button"
            className={`menu-toggle ${mobileOpen ? "menu-toggle-active" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
          >
            <span className="menu-toggle-icon menu-toggle-bar" />
            <span className="menu-toggle-icon menu-toggle-bar" />
            <span className="menu-toggle-icon menu-toggle-bar" />
          </button>

          <nav className="main-nav" aria-label="Hovedmenu" ref={navRef}>
            <ul className="nav-list">
              {SUBMENUS.map((sub, i) => (
                <li key={sub.label} className="nav-item-with-submenu">
                  <button
                    type="button"
                    className="nav-trigger"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    aria-expanded={openIndex === i}
                    aria-haspopup="true"
                  >
                    {sub.label}
                  </button>
                  <ul className="nav-submenu" hidden={openIndex !== i}>
                    {sub.links.map(({ href, label }) => (
                      <li key={href}>
                        <a href={href} className="nav-sublink" onClick={() => setOpenIndex(null)}>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          id="mobile-menu"
          className={`mobile-menu ${mobileOpen ? "mobile-menu-open" : ""}`}
          aria-hidden={!mobileOpen}
        >
          <div className="mobile-menu-backdrop" onClick={closeMobile} aria-hidden="true" />
          <div className="mobile-menu-panel">
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button
                type="button"
                className="mobile-menu-close"
                onClick={closeMobile}
                aria-label="Luk menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="mobile-menu-list">
              {MOBILE_MENU_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="mobile-menu-link" onClick={closeMobile}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <section className="hero-image">
        <div className="hero-image-container">
          <img
            src={HERO_IMAGE}
            alt="Natur der signalerer vækst og stabilitet"
            width={1920}
            height={800}
            fetchPriority="high"
          />
          <div className="hero-image-overlay" />
          <div className="hero-image-content">
            <div className="container">
              <h2>Langsigtet ejerskab, ansvarlig kapital, professionel ledelse</h2>
              <p>AAAL ApS er et dansk holdingselskab med fokus på langsigtet værdiskabelse gennem aktivt ejerskab af selskaber inden for ejendom, drift og digitale forretningsmodeller.</p>
              <p className="hero-subtext">Vi arbejder struktureret, compliant og med et klart fokus på stabilitet, transparens og bæredygtig vækst.</p>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content">
        <section id="om-os" className="about-intro">
          <div className="container">
            <h2>Om os</h2>
            <div className="about-intro-content">
              <p>AAAL ApS er et dansk holdingselskab, der specialiserer sig i langsigtet ejerskab og strategisk udvikling af virksomheder. Vi bygger på en solid forretningsmodel, der kombinerer professionel ledelse med ansvarlig kapitalforvaltning.</p>
              <p>Gennem vores datterselskaber arbejder vi aktivt med at skabe værdi og sikre bæredygtig vækst. Vores tilgang er præget af transparens, stabilitet og et langsigtet perspektiv, der gavner både vores porteføljeselskaber og deres interessenter.</p>
            </div>
          </div>
        </section>

        <section id="hvem-vi-er" className="about">
          <div className="container">
            <h2>Hvem vi er</h2>
            <div className="about-content">
              <p>AAAL ApS fungerer som strategisk ejer og governance-platform for koncernforbundne selskaber.</p>
              <p>Vi understøtter vores porteføljeselskaber med kapital, ledelsesmæssig sparring og klare beslutningsprocesser.</p>
              <div className="approach-section">
                <h3>Vores tilgang er præget af:</h3>
                <div className="approach-grid">
                  <div className="approach-item">
                    <div className="approach-image">
                      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" alt="Professionel selskabsledelse" width={800} height={600} loading="lazy" />
                      <div className="approach-overlay" />
                    </div>
                    <h4>Professionel selskabsledelse</h4>
                  </div>
                  <div className="approach-item">
                    <div className="approach-image">
                      <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" alt="Klare ejerstrukturer" width={800} height={600} loading="lazy" />
                      <div className="approach-overlay" />
                    </div>
                    <h4>Klare ejerstrukturer</h4>
                  </div>
                  <div className="approach-item">
                    <div className="approach-image">
                      <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop" alt="Ansvarlig risikostyring" width={800} height={600} loading="lazy" />
                      <div className="approach-overlay" />
                    </div>
                    <h4>Ansvarlig risikostyring</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vision-mission" className="vision-mission">
          <div className="container">
            <div className="vm-grid">
              <div className="vm-card">
                <h3>Vision</h3>
                <p>At være en solid og troværdig ejerplatform, der skaber varig værdi for selskaber, samarbejdspartnere og interessenter gennem disciplineret ejerskab og ansvarlig ledelse.</p>
              </div>
              <div className="vm-card">
                <h3>Mission</h3>
                <p>Vores mission er at:</p>
                <ul>
                  <li>Opbygge og eje sunde selskaber med klare forretningsmodeller</li>
                  <li>Sikre stabil drift og god governance</li>
                  <li>Skabe rammerne for kontrolleret vækst og værdiforøgelse</li>
                  <li>Agere professionel og pålidelig samarbejdspartner</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="vaerdier" className="values">
          <div className="container">
            <h2>Værdier</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Ansvarlighed</h3>
                <p>Vi tager ejerskab for beslutninger og konsekvenser</p>
              </div>
              <div className="value-card">
                <h3>Transparens</h3>
                <p>Klare strukturer og åben kommunikation</p>
              </div>
              <div className="value-card">
                <h3>Stabilitet</h3>
                <p>Langsigtede løsninger frem for kortsigtede gevinster</p>
              </div>
              <div className="value-card">
                <h3>Professionalitet</h3>
                <p>Høj standard i ledelse, compliance og samarbejde</p>
              </div>
            </div>
          </div>
        </section>

        <section id="samarbejde" className="cooperation">
          <div className="container">
            <div className="cooperation-card">
              <h2>Samarbejde</h2>
              <p>AAAL ApS samarbejder med banker, rådgivere, investorer og driftselskaber på et professionelt og tillidsbaseret grundlag.</p>
              <p>Vi lægger vægt på klare aftaler, realistiske forventninger og langsigtede relationer.</p>
            </div>
          </div>
        </section>

        <section id="datter-selskaber" className="subsidiaries">
          <div className="container">
            <h2>Datter selskaber</h2>
            <div className="companies-grid">
              <div className="company-card">
                <h3>AA-Ejendomme ApS</h3>
                <p>CVR: 38891197</p>
                <p className="company-description">AA-Ejendomme ApS er et dansk ejendomsselskab, der fokuserer på professionel forvaltning og langsigtet udvikling af ejendomsporteføljen. Vi kombinerer lokal ekspertise med strategisk vision for at skabe bæredygtig værdi for vores partnere og samfundet.</p>
              </div>
              <div className="company-card">
                <h3>ScaleGroup ApS</h3>
                <p>CVR: 44921995</p>
                <p className="company-description">Et webureau der leverer digitale løsninger og webudvikling til virksomheder. Vi hjælper kunder med at bygge moderne websites, webapplikationer og digitale platforme der styrker deres online tilstedeværelse.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="contact">
          <div className="container">
            <h2>Kontakt os</h2>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <h3>Adresse</h3>
                  <p>Risø Huse 1<br />4000 Roskilde<br />Danmark</p>
                </div>
                <div className="contact-item">
                  <h3>E-mail</h3>
                  <p><a href="mailto:kontakt@aaal.dk">kontakt@aaal.dk</a></p>
                </div>
                <div className="contact-item">
                  <h3>Telefon</h3>
                  <p><a href="tel:+4542942602">42 94 26 02</a></p>
                </div>
                <div className="contact-item">
                  <h3>CVR-nummer</h3>
                  <p>38889206</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2025 AAAL ApS. Alle rettigheder forbeholdes.</p>
          <p>CVR: 38889206 | Risø Huse 1, 4000 Roskilde</p>
        </div>
      </footer>
    </div>
  );
}
