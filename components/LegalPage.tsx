import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { LegalBlock, LegalSection } from "@/lib/legal";
import { LEGAL_ENTITY } from "@/lib/legal";
import { formatDate } from "@/lib/project";

/**
 * Shared shell for the Privacy Policy and Terms of Use.
 *
 * Both documents are long, unbroken walls of clause text, which is exactly the
 * shape people do not read. The layout leans on three things to make them
 * survivable: a fixed measure so no line runs past ~70 characters, a sticky
 * contents rail so any clause is one click away, and anchored headings so a
 * specific section can be linked to directly in an email.
 */

/** Turns bare URLs and email addresses in the source copy into real links. */
function linkify(text: string) {
  const pattern = /(https?:\/\/[^\s,)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.includes("@") ? `mailto:${part}` : part;
    return (
      <a
        key={i}
        href={href}
        className="text-mauve-deep underline decoration-mauve/50 underline-offset-2 transition-colors hover:decoration-mauve-deep"
        {...(part.includes("@") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {part}
      </a>
    );
  });
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    return (
      <h3 className="mt-10 font-serif text-xl leading-snug text-ink first:mt-0">{block.text}</h3>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((item) => (
          <li key={item} className="relative pl-6 text-[15px] leading-relaxed text-ash">
            <span
              aria-hidden
              className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-mauve"
            />
            {linkify(item)}
          </li>
        ))}
      </ul>
    );
  }

  return <p className="mt-4 text-[15px] leading-relaxed text-ash">{linkify(block.text)}</p>;
}

export function LegalPage({
  eyebrow,
  title,
  lede,
  sections,
  related,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: readonly LegalSection[];
  related: { href: string; label: string };
}) {
  return (
    <>
      <SiteHeader />

      <main className="bg-white">
        <section className="border-b border-black/10 bg-cream">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="eyebrow text-mauve-deep">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ash">{lede}</p>
            <p className="mt-6 text-xs text-ash">
              Last updated{" "}
              <time dateTime={LEGAL_ENTITY.effectiveDate}>
                {formatDate(LEGAL_ENTITY.effectiveDate)}
              </time>
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article>
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 pt-10 first:pt-0">
                <h2 className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}

            <div className="mt-16 border-t border-black/10 pt-8">
              <Link
                href={related.href}
                className="text-sm text-mauve-deep underline decoration-mauve/50 underline-offset-4 transition-colors hover:decoration-mauve-deep"
              >
                Read our {related.label} &rarr;
              </Link>
            </div>
          </article>

          {/* Contents rail. Hidden below lg, where the sticky column would eat
              most of the viewport and the document reads fine top to bottom. */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="eyebrow text-ash">On this page</p>
              <ul className="mt-4 space-y-2.5 border-l border-black/10 pl-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-[13px] leading-snug text-ash transition-colors hover:text-mauve-deep"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
