/**
 * Verbatim source of the two legal documents, transcribed from the copy supplied
 * by the brokerage ("privacy-policy.md" and "TERMS OF USE.md" at the repo root).
 *
 * The wording is deliberately NOT edited here. Legal copy is the client's to
 * approve, so this file's job is to carry it faithfully into the page, not to
 * improve it. The two exceptions are mechanical and noted inline: a broken
 * "laws of=" typo, and the operator/contact details below, which are lifted into
 * constants so a single edit corrects them everywhere once the entity question
 * is settled.
 *
 * OPEN ITEMS — see the notes on LEGAL_ENTITY. Do not publish these pages
 * without resolving them.
 */

import { CONTACT, DATES, PROJECT } from "./project";

/**
 * The party that operates this site, collects the data, and carries the
 * obligations in both documents.
 *
 * The supplied copy named "Aura Lakeview Village Communities" throughout, which
 * contradicted DISCLAIMER in project.ts and read as the developer — the exact
 * impression the disclaimer exists to prevent. Every such reference now resolves
 * to the brokerage, so the two documents and the disclaimer agree.
 *
 * Note the distinction held below: OPERATOR is the company, DEVELOPMENT is the
 * project being marketed. "Ads promoting Aura at Lakeview Village" is correct;
 * "servers belonging to Aura at Lakeview Village" was not.
 */
export const LEGAL_ENTITY = {
  operator: CONTACT.brokerage,
  /**
   * @verify — the supplied Terms give info@AuraLakeviewVillage.com, a .com
   * address on a domain this project does not control (ours is .org, and the
   * inbox itself is still a placeholder). A legal contact address that bounces
   * is worse than none, so this renders our own constant.
   */
  contactEmail: CONTACT.email,
  /**
   * Set to the brokerage's own jurisdiction. The supplied copy specified Ottawa,
   * which is the developer's seat — it would have obliged a Mississauga buyer to
   * litigate five hours away against a Mississauga brokerage.
   */
  venue: "Mississauga, Ontario",
  effectiveDate: DATES.modified,
} as const;

/** The company carrying the obligations. */
const OPERATOR = LEGAL_ENTITY.operator;
/** The development being marketed — not a legal party to either document. */
const DEVELOPMENT = PROJECT.name;

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "h3"; text: string };

export type LegalSection = {
  /** Anchor target, also used by the on-page table of contents. */
  id: string;
  heading: string;
  blocks: readonly LegalBlock[];
};

export const PRIVACY_POLICY = {
  slug: "/privacy-policy",
  title: "Privacy Policy",
  lede: "This Policy is subject to change due to changes in organizational practices or legal and regulatory requirements. We encourage you to periodically check our website for updates to this Policy.",
  sections: [
    {
      id: "information-we-collect",
      heading: "What personal information do we collect?",
      blocks: [
        {
          type: "p",
          text: `“Personal information” is any information about an identifiable individual, other than an individual’s business contact information that is used to communicate with the individual in relation to their business, employment or profession. Thus, personal information includes, but is not limited to, your name, contact information, date of birth, credit card details or other financial information, hours of availability, schedule, personal preferences, family size, income, employment details, opinions, purchase patterns and other demographics that help ${OPERATOR} service your specific needs.`,
        },
        {
          type: "p",
          text: "Personal information does not include anonymous or aggregated information that cannot be tracked back to you personally. For example, we may use aggregate data to improve the quality and efficiency of our products and services, and to enhance our marketing efforts.",
        },
        {
          type: "p",
          text: "When registering on Contact page, as appropriate, you will be asked to enter your first name, last name, email address, phone, city, and ZIP/postal code in order to complete your registration.",
        },
      ],
    },
    {
      id: "how-we-use-it",
      heading: "How do we use your personal information?",
      blocks: [
        { type: "p", text: "Personal information is collected for purposes such as the following:" },
        {
          type: "ul",
          items: [
            "To understand the needs of individuals and respond to requests for information, products or services;",
            "To verify an individual’s identity;",
            "To complete a business transaction such as purchase or sale of a property;",
            `To establish relationships, provide support, as well as communicate about ${DEVELOPMENT} project updates, service developments or other ${OPERATOR} news;`,
            "To conduct customer satisfaction surveys;",
            "To facilitate financing or approval of an application, or process financial transactions;",
            "To provide safety and security services; and",
            `To meet legal or regulatory requirements imposed upon ${OPERATOR} from time to time.`,
          ],
        },
      ],
    },
    {
      id: "general-information",
      heading: "What general information do we collect?",
      blocks: [
        { type: "h3", text: "Usage tracking" },
        {
          type: "p",
          text: `Our websites may automatically record some general information about your visit in order for ${OPERATOR} to engage in web statistical analysis using Google Analytics and other web analytics services. We want to make sure our sites are useful to visitors, and ensure we engage in targeted advertising responsibly, such that customers receive information that is relevant to their needs and interests. User information gathered may include the:`,
        },
        {
          type: "ul",
          items: [
            `Internet domain for your Internet service provider, such as “company.com” or “service.ca” and the IP address of the computer you are using to access ${OPERATOR}’s website;`,
            "Type of browser you are using, such as Internet Explorer, Firefox or Chrome;",
            "Type of device used to access our websites;",
            "Type of operating system you are using such as Windows or Macintosh;",
            "Date and time of the visit to our site, the pages of our site that were visited, and the address of the previous website you were visiting if you linked to us from another website; and",
            "Age category, gender, and affinity interests as determined by demographic and interest reports available through web analytics.",
          ],
        },
        {
          type: "p",
          text: `We make no effort to personally identify you based on your visit to our site. If you wish, you may opt out of being tracked by a web analytics service by disabling or refusing cookies; by disabling JavaScript within your browser; or in the case of ${OPERATOR}’s use of Google Analytics, you may get the Google Analytics Opt-Out Browser Add-On.`,
        },
        { type: "h3", text: "Cookies" },
        {
          type: "p",
          text: "We also use “cookies” that identify you as a return visitor and which can help us tailor information to suit your individual preferences. A cookie is a small text file that a website can send to your browser, which may then store the cookie on your hard drive. The goal is to save you time next time you visit, provide you with a more meaningful visit, and measure website activity. Cookies in and of themselves cannot be used to reveal your identity. Many browsers, however, allow you to disable cookie collection if you wish, or inform you when a cookie is being stored on your hard drive.",
        },
        { type: "h3", text: "Targeted advertising" },
        {
          type: "p",
          text: `As you interact with ${OPERATOR}’s websites, third party advertising partners may use cookies, tracking pixels, web beacons and similar technologies to identify you as a visitor to our websites and present you with targeted ads to help promote ${DEVELOPMENT}. You can opt-out of the use of your information for select ad targeting by visiting this site: http://youradchoices.ca/choices, and also by setting up “Do Not Track” options available through your browser. We also occasionally provide your personal information to trusted advertising partners for the purpose of presenting you with targeted ads on behalf of ${OPERATOR}.`,
        },
        { type: "h3", text: "Third party social media" },
        {
          type: "p",
          text: `We receive information from Third Party Services (like social media, live chat support etc.) as an extension of its presence on the Internet. Third Party Services are public and are not hosted on ${OPERATOR}’s servers.`,
        },
      ],
    },
    {
      id: "information-security",
      heading: "Information security",
      blocks: [
        {
          type: "p",
          text: `No method of transmitting or storing data is 100% secure. As a result, although we strive to protect your personal information, we cannot guarantee the security of any information you transmit to us through or in connection with ${OPERATOR} websites. If you have reason to believe that your interaction with us is no longer secure (for example, if you feel that the security of any account you might have with us has been compromised), you must immediately notify us of the problem in order for ${OPERATOR} to resolve the issue in a timely manner. Also keep in mind that e-mail is not a secure form of communication so never send sensitive personal information to us via e-mail.`,
        },
      ],
    },
    {
      id: "how-we-share",
      heading: "How do we share your information?",
      blocks: [
        {
          type: "p",
          text: "The data shall not be sold to third parties. We shall not share or pass on any personal information without your explicit consent, unless: We are legally obligated to do so.",
        },
      ],
    },
  ],
} as const satisfies { slug: string; title: string; lede: string; sections: readonly LegalSection[] };

export const TERMS_OF_USE = {
  slug: "/terms-of-use",
  title: "Terms of Use",
  lede: `The use of our website is subject to the following terms and conditions of use, as amended from time to time. Please review them carefully — by accessing this website you accept and agree to be bound by them and by our Privacy Policy.`,
  sections: [
    {
      id: "introduction",
      heading: "1. Introduction",
      blocks: [
        {
          type: "p",
          text: `This website is operated by ${LEGAL_ENTITY.operator}. The terms “we”, “us”, and “our” refer to ${LEGAL_ENTITY.operator}. The use of our website is subject to the following terms and conditions of use, as amended from time to time (the “Terms”). The Terms are to be read together by you with any terms, conditions or disclaimers provided in the pages of our website. Please review the Terms carefully. The Terms apply to all users of our website, including without limitation, users who are browsers, customers, merchants, vendors and/or contributors of content. If you access and use this website, you accept and agree to be bound by and comply with the Terms and our Privacy Policy. If you do not agree to the Terms or our Privacy Policy, you are not authorized to access our website, use any of our website’s services or place an order on our website.`,
        },
      ],
    },
    {
      id: "use-of-our-website",
      heading: "2. Use of our Website",
      blocks: [
        {
          type: "p",
          text: "You agree to use our website for legitimate purposes and not for any illegal or unauthorized purpose, including without limitation, in violation of any intellectual property or privacy law. By agreeing to the Terms, you represent and warrant that you are at least the age of majority in your state or province of residence and are legally capable of entering into a binding contract.",
        },
        {
          type: "p",
          text: "You agree to not use our website to conduct any activity that would constitute a civil or criminal offence or violate any law. You agree not to attempt to interfere with our website’s network or security features or to gain unauthorized access to our systems.",
        },
        {
          type: "p",
          text: "You agree to provide us with accurate personal information, such as your email address, mailing address and other contact details in order to complete your order or contact you as needed. You agree to promptly update your account and information. You authorize us to collect and use this information to contact you in accordance with our Privacy Policy.",
        },
      ],
    },
    {
      id: "general-conditions",
      heading: "3. General Conditions",
      blocks: [
        {
          type: "p",
          text: "We reserve the right to refuse service to anyone, at any time, for any reason. We reserve the right to make any modifications to the website, including terminating, changing, suspending or discontinuing any aspect of the website at any time, without notice. We may impose additional rules or limits on the use of our website. You agree to review the Terms regularly and your continued access or use of our website will mean that you agree to any changes.",
        },
        {
          type: "p",
          text: "You agree that we will not be liable to you or any third party for any modification, suspension or discontinuance of our website or for any service, content, feature or product offered through our website.",
        },
      ],
    },
    {
      id: "products-or-services",
      heading: "4. Products or Services",
      blocks: [
        {
          type: "p",
          text: "All purchases through our website are subject to product availability. We may, in our sole discretion, limit or cancel the quantities offered on our website or limit the sales of our products or services to any person, household, geographic region or jurisdiction.",
        },
        {
          type: "p",
          text: "Prices for our products are subject to change, without notice. Unless otherwise indicated, prices displayed on our website are quoted in Canadian dollars.",
        },
        {
          type: "p",
          text: "We reserve the right, in our sole discretion, to refuse orders, including without limitation, orders that appear to be placed by distributors or resellers. If we believe that you have made a false or fraudulent order, we will be entitled to cancel the order and inform the relevant authorities.",
        },
        {
          type: "p",
          text: "We do not guarantee the accuracy of the colour or design of the products on our website. We have made efforts to ensure the colour and design of our products are displayed as accurately as possible on our website.",
        },
      ],
    },
    {
      id: "third-party-links",
      heading: "5. Links to Third-Party Websites",
      blocks: [
        {
          type: "p",
          text: "Links from or to websites outside our website are meant for convenience only. We do not review, endorse, approve or control, and are not responsible for any sites linked from or to our website, the content of those sites, the third parties named therein, or their products and services. Linking to any other site is at your sole risk and we will not be responsible or liable for any damages in connection with linking. Links to downloadable software sites are for convenience only and we are not responsible or liable for any difficulties or consequences associated with downloading the software. Use of any downloaded software is governed by the terms of the license agreement, if any, which accompanies or is provided with the software.",
        },
      ],
    },
    {
      id: "submissions",
      heading: "6. Use Comments, Feedback, and Other Submissions",
      blocks: [
        {
          type: "p",
          text: "You acknowledge that you are responsible for the information, profiles, opinions, messages, comments and any other content (collectively, the “Content”) that you post, distribute or share on or through our website or services available in connection with our website. You further acknowledge that you have full responsibility for the Content, including but limited to, with respect to its legality, and its trademark, copyright and other intellectual property ownership.",
        },
        {
          type: "p",
          text: "You agree that any Content submitted by you in response to a request by us for a specific submission may be edited, adapted, modified, recreated, published, or distributed by us. You further agree that we are under no obligation to maintain any Content in confidence, to pay compensation for any Content or to respond to any Content.",
        },
        {
          type: "p",
          text: "You agree that you will not post, distribute or share any Content on our website that is protected by copyright, trademark, patent or any other proprietary right without the express consent of the owner of such proprietary right. You further agree that your Content will not be unlawful, abusive or obscene nor will it contain any malware or computer virus that could affect our website’s operations. You will be solely liable for any Content that you make and its accuracy. We have no responsibility and assume no liability for any Content posted by you or any third-party.",
        },
        {
          type: "p",
          text: "We reserve the right to terminate your ability to post on our website and to remove and/or delete any Content that we deem objectionable. You consent to such removal and/or deletion and waive any claim against us for the removal and/or deletion of your Content.",
        },
      ],
    },
    {
      id: "your-personal-information",
      heading: "7. Your Personal Information",
      blocks: [
        {
          type: "p",
          text: "Please see our Privacy Policy to learn about how we collect, use, and share your personal information.",
        },
      ],
    },
    {
      id: "errors-and-omissions",
      heading: "8. Errors and Omissions",
      blocks: [
        {
          type: "p",
          text: "Please note that our website may contain typographical errors or inaccuracies and may not be complete or current. We reserve the right to correct any errors, inaccuracies or omissions and to change or update information at any time, without prior notice (including after an order has been submitted). Such errors, inaccuracies or omissions may relate to product description, pricing, promotion and availability and we reserve the right to cancel or refuse any order placed based on incorrect pricing or availability information, to the extent permitted by applicable law.",
        },
        {
          type: "p",
          text: "We do not undertake to update, modify or clarify information on our website, except as required by law.",
        },
      ],
    },
    {
      id: "disclaimer",
      heading: "9. Disclaimer and Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: "You assume all responsibility and risk with respect to your use of our website, which is provided “as is” without warranties, representations or conditions of any kind, either express or implied, with regard to information accessed from or via our website, including without limitation, all content and materials, and functions and services provided on our website, all of which are provided without warranty of any kind, including but not limited to warranties concerning the availability, accuracy, completeness or usefulness of content or information, uninterrupted access, and any warranties of title, non-infringement, merchantability or fitness for a particular purpose. We do not warrant that our website or its functioning or the content and material of the services made available thereby will be timely, secure, uninterrupted or error-free, that defects will be corrected, or that our websites or the servers that make our website available are free of viruses or other harmful components.",
        },
        {
          type: "p",
          text: "The use of our website is at your sole risk and you assume full responsibility for any costs associated with your use of our website. We will not be liable for any damages of any kind related to the use of our website.",
        },
        {
          type: "p",
          text: "In no event will we, or our affiliates, our or their respective content or service providers, or any of our or their respective directors, officers, agents, contractors, suppliers or employees be liable to you for any direct, indirect, special, incidental, consequential, exemplary or punitive damages, losses or causes of action, or lost revenue, lost profits, lost business or sales, or any other type of damage, whether based in contract or tort (including negligence), strict liability or otherwise, arising from your use of, or the inability to use, or the performance of, our website or the content or material or functionality through our website, even if we are advised of the possibility of such damages.",
        },
        {
          type: "p",
          text: "Certain jurisdictions do not allow limitation of liability or the exclusion or limitation of certain damages. In such jurisdictions, some or all of the above disclaimers, exclusions, or limitations, may not apply to you and our liability will be limited to the maximum extent permitted by law.",
        },
      ],
    },
    {
      id: "indemnification",
      heading: "10. Indemnification",
      blocks: [
        {
          type: "p",
          text: "You agree to defend and indemnify us, and hold us and our affiliates harmless, and our and their respective directors, officers, agents, contractors, and employees against any losses, liabilities, claims, expenses (including legal fees) in any way arising from, related to or in connection with your use of our website, your violation of the Terms, or the posting or transmission of any materials on or through the website by you, including but not limited to, any third party claim that any information or materials provided by you infringe upon any third party proprietary rights.",
        },
      ],
    },
    {
      id: "entire-agreement",
      heading: "11. Entire Agreement",
      blocks: [
        {
          type: "p",
          text: "The Terms and any documents expressly referred to in them represent the entire agreement between you and us in relation to the subject matter of the Terms and supersede any prior agreement, understanding or arrangement between you and us, whether oral or in writing. Both you and we acknowledge that, in entering into these Terms, neither you nor we have relied on any representation, undertaking or promise given by the other or implied from anything said or written between you and us prior to such Terms, except as expressly stated in the Terms.",
        },
      ],
    },
    {
      id: "waiver",
      heading: "12. Waiver",
      blocks: [
        {
          type: "p",
          text: "Our failure to exercise or enforce any right or provision of the Terms will not constitute a waiver of such right or provision. A waiver by us of any default will not constitute a waiver of any subsequent default. No waiver by us is effective unless it is communicated to you in writing.",
        },
      ],
    },
    {
      id: "headings",
      heading: "13. Headings",
      blocks: [{ type: "p", text: "Any headings and titles herein are for convenience only." }],
    },
    {
      id: "severability",
      heading: "14. Severability",
      blocks: [
        {
          type: "p",
          text: "If any of the provisions of the Terms are determined by any competent authority to be invalid, unlawful or unenforceable, such provision will to that extent be severed from the remaining Terms, which will continue to be valid and enforceable to the fullest extent permitted by law.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "15. Governing Law",
      blocks: [
        {
          // Source read "the laws of= the Province of Ontario" — stray "=" removed.
          type: "p",
          text: `Any disputes arising out of or relating to the Terms, the Privacy Policy, use of our website, or our products or services offered on our website will be resolved in accordance with the laws of the Province of Ontario without regard to its conflict of law rules. Any disputes, actions or proceedings relating to the Terms or your access to or use of our website must be brought before the courts of the Province of Ontario in ${LEGAL_ENTITY.venue} and you irrevocably consent to the exclusive jurisdiction and venue of such courts.`,
        },
      ],
    },
    {
      id: "questions",
      heading: "16. Questions or Concerns",
      blocks: [
        {
          type: "p",
          text: `Please send all questions, comments and feedback to us at ${LEGAL_ENTITY.contactEmail}`,
        },
      ],
    },
  ],
} as const satisfies { slug: string; title: string; lede: string; sections: readonly LegalSection[] };

/** Footer legal row. Kept out of NAV so these stay off the main navigation. */
export const LEGAL_NAV = [
  { href: PRIVACY_POLICY.slug, label: PRIVACY_POLICY.title },
  { href: TERMS_OF_USE.slug, label: TERMS_OF_USE.title },
] as const;
