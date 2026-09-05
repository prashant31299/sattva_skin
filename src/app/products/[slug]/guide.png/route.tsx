import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getProduct } from "@/data/catalog";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product?.guide) return new Response("Product guide not found", { status: 404 });
  const file = await readFile(path.join(process.cwd(), "public", product.images[0].replace(/\.webp$/, ".png")));
  const photo = `data:image/png;base64,${file.toString("base64")}`;
  const accent = product.accent ?? "#c4cea5";
  const highlights = product.guide.highlights;
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "65px", background: "#f7f3ec", color: "#24352a", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, letterSpacing: 3 }}><span>SATTVA SKIN</span><span>THE PRODUCT GUIDE</span></div>
      <h1 style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: -3, margin: "48px 0 20px" }}>{product.name}</h1>
      <div style={{ display: "flex", fontSize: 23, marginBottom: 28 }}>{product.productType} · {product.size}</div>
      <div style={{ display: "flex", height: 650, background: "#fffdf9", borderRadius: 24, overflow: "hidden" }}>
        {/* An embedded local image makes downloads independent of external hosts. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={570} height={650} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 500, padding: "35px" }}>
          <span style={{ fontSize: 18, letterSpacing: 2 }}>{highlights.length ? "FEATURED ON THE LABEL" : "THE PRODUCT"}</span>
          {highlights.length ? highlights.map((item, index) => <div key={item.name} style={{ display: "flex", alignItems: "center", padding: "26px 0", borderBottom: "1px solid #d9d4c8", fontSize: 32 }}><span style={{ color: "#6d7169", fontSize: 18, marginRight: 18 }}>{String(index + 1).padStart(2, "0")}</span>{item.name}</div>) : <div style={{ display: "flex", fontSize: 36, marginTop: 35 }}>{product.name}</div>}
          <p style={{ fontSize: 18, lineHeight: 1.5, color: "#6d7169", marginTop: 25 }}>{highlights.length ? "Ingredient highlights, not the complete formula." : "Contact us for the complete formula and preparation details."}</p>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: 25, background: accent, borderRadius: 20, padding: 36, gap: 45 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 450 }}><span style={{ fontSize: 18 }}>01 / THE FORMAT</span><strong style={{ fontSize: 36, marginTop: 18 }}>{product.productType}</strong><span style={{ fontSize: 23, marginTop: 10 }}>{product.category}</span></div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 18 }}>02 / THE PACK</span><strong style={{ fontSize: 36, marginTop: 18 }}>{product.size}</strong><span style={{ fontSize: 23, marginTop: 10 }}>{product.guide.packaging}</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 35 }}><span style={{ fontSize: 18 }}>03 / KNOW YOUR PRODUCT</span><p style={{ fontSize: 27, lineHeight: 1.4, marginTop: 18 }}>Follow the directions on your current pack. Contact Sattva Skin for the complete ingredient list, application details, pricing and availability.</p></div>
      <div style={{ display: "flex", marginTop: "auto", paddingTop: 22, borderTop: "1px solid #d9d4c8", justifyContent: "space-between", fontSize: 18 }}><span>SATTVA SKIN / {product.category.toUpperCase()}</span><span>PRODUCT NOTES · 2026</span></div>
    </div>,
    { width: 1200, height: 1700, headers: { "Content-Disposition": `inline; filename="${slug}-guide.png"`, "Cache-Control": "public, max-age=3600" } },
  );
}
