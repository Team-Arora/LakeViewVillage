import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/lib/legal";
import { PROJECT } from "@/lib/project";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: `How ${PROJECT.name} collects, uses, stores, and shares the personal information you provide when you register for pricing, floor plans, and project updates.`,
  alternates: { canonical: PRIVACY_POLICY.slug },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={PRIVACY_POLICY.title}
      lede={PRIVACY_POLICY.lede}
      sections={PRIVACY_POLICY.sections}
      related={{ href: TERMS_OF_USE.slug, label: TERMS_OF_USE.title }}
    />
  );
}
