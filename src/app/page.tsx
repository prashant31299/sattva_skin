import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductGrid } from "@/components/product-grid";
import { LipFormula } from "@/components/lip-formula";
import { concerns, products } from "@/data/catalog";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.lipHero} aria-labelledby="hero-heading">
        <div className={styles.lipHeroCopy}>
          <p className="eyebrow">The Sattva lip collection</p>
          <h1 id="hero-heading">Soft lips.<br /><span>Sweet<br />rituals.</span></h1>
          <p>Buttery balms. A little sugar polish. Meet small pots of everyday care, with your favourite ingredients at the heart.</p>
          <div className={styles.heroActions}>
            <Link className="button" href="/shop?category=lip-balm">Shop lip balms <ArrowRight aria-hidden="true" size={16} /></Link>
            <Link className="button button--outline" href="/shop?category=lip-scrub">Explore scrubs</Link>
          </div>
          <div className={styles.lipHeroNote}><span>03 balms</span><span>02 scrubs</span><span>One lovely ritual</span></div>
        </div>
        <div className={styles.lipHeroVisual}>
          <Image src="/images/lip-care/lip-care-collection.webp" alt="Sattva Skin's five lip balms and scrubs styled with strawberries, chocolate, butterscotch, grapes and coconut" fill loading="eager" fetchPriority="high" sizes="(max-width: 800px) 100vw, 60vw" />
          <span className={styles.lipHeroPill}>Small pots. Considered ingredients.</span>
          <span className={styles.lipHeroCaption}>SATTVA SKIN / THE LIP EDIT</span>
        </div>
      </section>
      <div className={styles.heroRail} aria-label="Our lip-care base">
        <span>Shea butter · The buttery base</span><span>Coconut oil · The smooth glide</span><span>Beeswax · The finishing structure</span>
      </div>

      <section className={styles.products} id="collection" aria-labelledby="products-heading">
        <div className="container">
          <div className={styles.sectionHead}>
            <div><p className="eyebrow">Meet your favourites</p><h2 className="section-title" id="products-heading">A little care.<br />A lot to love.</h2></div>
            <div className={styles.productAside}>
              <p>Strawberry, butterscotch, chocolate and red wine. Pick your signature, then make it a ritual.</p>
              <Link href="/shop">Explore all five <ArrowRight aria-hidden="true" size={15} /></Link>
            </div>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      <LipFormula />

      <section className={styles.lipRitual} aria-labelledby="ritual-heading">
        <div className="container">
          <div className={styles.sectionHead}>
            <div><p className="eyebrow">Find your texture</p><h2 className="section-title" id="ritual-heading">Two ways to<br />care for lips.</h2></div>
            <p className={styles.sectionNote}>A smooth balm for your daily rhythm. A sugar scrub for an occasional polishing step.</p>
          </div>
          <div className={styles.ritualCards}>
            <Link className={styles.ritualCard} href="/shop?category=lip-balm">
              <div className={styles.ritualPhoto}><Image src="/images/lip-care/butterscotch-lip-balm.webp" alt="Butterscotch Lip Balm with a shea butter curl and coconut" fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
              <div className={styles.ritualCardCopy}><p className="eyebrow">01 / Smooth & buttery</p><h3>The daily balm.</h3><p>Shea butter + coconut oil + beeswax.</p><span>Explore lip balms <ArrowUpRight aria-hidden="true" size={19} /></span></div>
            </Link>
            <Link className={styles.ritualCard} href="/shop?category=lip-scrub">
              <div className={styles.ritualPhoto}><Image src="/images/lip-care/strawberry-lip-scrub.webp" alt="Strawberry Lip Scrub styled with strawberries and sugar" fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
              <div className={styles.ritualCardCopy}><p className="eyebrow">02 / A little sugar polish</p><h3>The scrub moment.</h3><p>The same buttery base, with sugar.</p><span>Explore lip scrubs <ArrowUpRight aria-hidden="true" size={19} /></span></div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.concerns} id="concerns" aria-labelledby="concerns-heading">
        <div className="container">
          <div className={styles.sectionHead}>
            <div><p className="eyebrow">Care, with a little context</p><h2 className="section-title" id="concerns-heading">Start with<br />what you need.</h2></div>
            <p className={styles.sectionNote}>Explore our lip-care range or read the wider Sattva skin guides.</p>
          </div>
          <div className={styles.concernRail}>
            {[...concerns.filter((c) => c.slug === "dry-lips"), ...concerns.filter((c) => c.slug !== "dry-lips").slice(0, 3)].map((concern, index) => (
              <Link className={styles.concernCard} href={`/pages/${concern.slug}`} key={concern.slug} style={{ backgroundColor: concern.accent }}>
                <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div><span className={styles.concernNote}>{index === 0 ? "Shop the lip collection" : "Skin guide"}</span><h3>{concern.name}</h3><p>{concern.description}</p></div>
                <span className={styles.circleArrow} aria-hidden="true"><ArrowUpRight size={19} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.newsletter} aria-labelledby="newsletter-heading">
        <div className={`container ${styles.newsletterInner}`}>
          <p className="eyebrow">Stay in the routine</p><h2 id="newsletter-heading">A little Sattva.<br />In your inbox.</h2>
          <p>New favourites, ingredient stories and everyday care notes.</p><NewsletterForm />
        </div>
      </section>
    </>
  );
}
