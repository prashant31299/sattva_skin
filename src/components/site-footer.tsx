import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { concerns } from "@/data/catalog";
import { siteConfig } from "@/data/config";

import styles from "./site-footer.module.css";

const shopLinks = [
  { label: "All products", href: "/shop" },
  { label: "Face care", href: "/shop?category=face-care" },
  { label: "Hair care", href: "/shop?category=hair-care" },
  { label: "Lip balms", href: "/shop?category=lip-balm" },
  { label: "Lip scrubs", href: "/shop?category=lip-scrub" },
  { label: "Lip care", href: "/shop?category=lip-care" },
];

const aboutLinks = [
  { label: "Our story", href: "/about" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

const helpLinks = [
  { label: "FAQs", href: "/faq" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Track order", href: "/track-order" },
];

const policyLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund policy", href: "/returns" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function SiteFooter() {
  const whatsappNumber = siteConfig.whatsappNumber.replace(/\D/g, "");
  const instagramHandle = siteConfig.instagramHandle.trim();
  const instagramUrl = instagramHandle
    ? instagramHandle.startsWith("http://") || instagramHandle.startsWith("https://")
      ? instagramHandle
      : `https://instagram.com/${instagramHandle.replace(/^@/, "")}`
    : "";

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.statement}>
          <p>Problem-solving skincare</p>
          <div>
            <h2>Skin first. Noise last.</h2>
            <Link href="/shop">
              Explore the collection
              <ArrowUpRight aria-hidden="true" size={19} />
            </Link>
          </div>
        </div>

        <div className={styles.navigation}>
          <div className={styles.brandColumn}>
            <Link className={styles.logo} href="/" aria-label={`${siteConfig.name} home`}>
              <span>{siteConfig.shortName}</span>
              <small>SKIN</small>
            </Link>
            <p>{siteConfig.description}</p>
            <span>Face, hair and lip care for everyday rituals.</span>
            {siteConfig.catalogIsPreview ? (
              <strong>Online checkout coming soon</strong>
            ) : null}
          </div>

          <FooterGroup heading="Shop" links={shopLinks} />
          <FooterGroup
            heading="By concern"
            links={concerns.slice(0, 5).map((concern) => ({
              label: concern.name,
              href: `/pages/${concern.slug}`,
            }))}
          />
          <FooterGroup heading="About" links={aboutLinks} />
          <FooterGroup heading="Help" links={helpLinks} />
        </div>

        <div className={styles.supportRow}>
          <div>
            <p>Need a little guidance?</p>
            <span>We’ll help you find a simpler place to start.</span>
          </div>
          <div className={styles.supportLinks}>
            {whatsappNumber ? (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            ) : null}
            {instagramUrl ? (
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                Instagram
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            ) : null}
            <Link href="/contact">
              Contact us
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <nav aria-label="Legal">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p>Designed for everyday Indian skin</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav className={styles.linkGroup} aria-label={heading}>
      <p>{heading}</p>
      {links.map((link) => (
        <Link key={`${link.href}-${link.label}`} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
