import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/lib/legal";
import { PROJECT } from "@/lib/project";

export const metadata: Metadata = {
  title: TERMS_OF_USE.title,
  description: `The terms and conditions that govern your use of the ${PROJECT.name} website, including submissions, third-party links, liability, and governing law.`,
  alternates: { canonical: TERMS_OF_USE.slug },
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={TERMS_OF_USE.title}
      lede={TERMS_OF_USE.lede}
      sections={TERMS_OF_USE.sections}
      related={{ href: PRIVACY_POLICY.slug, label: PRIVACY_POLICY.title }}
    />
  );
}
