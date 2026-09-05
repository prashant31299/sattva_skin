"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/data/config";

import styles from "./whatsapp-button.module.css";

export function WhatsAppButton() {
  const pathname = usePathname();
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");

  if (!number) return null;

  const message = encodeURIComponent(
    "Hello Sattva Skin, I would like help choosing a routine.",
  );

  return (
    <a
      className={`${styles.button} ${
        pathname.startsWith("/products/") ? styles.abovePurchase : ""
      }`}
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Ask Sattva Skin for routine help on WhatsApp"
    >
      <MessageCircle aria-hidden="true" size={19} strokeWidth={1.8} />
      <span>Routine help</span>
    </a>
  );
}
