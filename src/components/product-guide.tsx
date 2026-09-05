import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Product } from "@/data/types";
import styles from "./product-guide.module.css";

export function ProductGuide({ product }: { product: Product }) {
  if (!product.guide) return null;
  const { guide } = product;
  return (
    <section id="product-guide" className={styles.section} style={{ "--guide-accent": product.accent } as CSSProperties} aria-labelledby="guide-title">
      <div className={styles.heading}>
        <div><p className="eyebrow">The Sattva product guide</p><h2 id="guide-title">A closer look.<br /><span>Every detail.</span></h2></div>
        <a className={styles.download} href={product.images[1]} download={`${product.slug}-guide.png`}>Download product guide <ArrowDownToLine size={17} aria-hidden="true" /></a>
      </div>
      <div className={styles.board}>
        <div className={styles.visual}>
          <div className={styles.visualTop}><span>SATTVA SKIN</span><span>{product.category}</span></div>
          <Image src={product.images[0]} alt={product.imageAlts?.[0] ?? product.name} width={1000} height={1000} sizes="(max-width: 800px) 92vw, 46vw" />
          <div className={styles.visualBottom}><span>{product.productType}</span><strong>{product.size}</strong></div>
        </div>
        <div className={styles.story}>
          <p className={styles.index}>01 / {guide.highlights.length ? "Featured ingredients" : "Product identity"}</p>
          <h3>{guide.heading}</h3>
          {guide.highlights.length ? <ol className={styles.ingredients}>
            {guide.highlights.map((item, index) => <li key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><div><h4>{item.name}</h4><p>{item.detail}</p></div></li>)}
          </ol> : <p className={styles.intro}>{product.description}</p>}
          <p className={styles.note}>{guide.highlights.length ? "Ingredient highlights, not the complete formula. See the pack or ask us for the full ingredient list." : "Ask us for the complete formula and preparation details."}</p>
        </div>
      </div>
      <div className={styles.facts}>
        <div><span>02 / The format</span><h3>{product.productType}</h3><p>{product.category}</p></div>
        <div><span>03 / The pack</span><h3>{product.size}</h3><p>{guide.packaging}</p></div>
        <div><span>04 / Make it yours</span><h3>Know your product.</h3><p>Follow your current pack’s directions. Get in touch for ingredient and application details.</p><Link href="/contact">Ask Sattva Skin <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
