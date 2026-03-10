import { NdaFormData } from "@/types/nda";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "_______________";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function blank(value: string, placeholder = "_______________"): string {
  const escaped = escapeHtml(value.trim());
  return escaped || placeholder;
}

function validatedYears(value: string, placeholder = "___"): string {
  const n = parseInt(value, 10);
  return n > 0 ? String(n) : placeholder;
}

export function generateCoverPage(data: NdaFormData): string {
  const mndaTerm =
    data.mndaTermType === "expires"
      ? `Expires ${validatedYears(data.mndaTermYears)} year(s) from Effective Date.`
      : "Continues until terminated in accordance with the terms of the MNDA.";

  const confidentialityTerm =
    data.confidentialityTermType === "years"
      ? `${validatedYears(data.confidentialityTermYears)} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
      : "In perpetuity.";

  return `
<h1>Mutual Non-Disclosure Agreement</h1>

<h2>USING THIS MUTUAL NON-DISCLOSURE AGREEMENT</h2>

<p>This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1) this Cover Page ("<strong>Cover Page</strong>") and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 ("<strong>Standard Terms</strong>") identical to those posted at <a href="https://commonpaper.com/standards/mutual-nda/1.0">commonpaper.com/standards/mutual-nda/1.0</a>. Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.</p>

<h3>Purpose</h3>
<p><em>How Confidential Information may be used</em></p>
<p>${blank(data.purpose)}</p>

<h3>Effective Date</h3>
<p>${formatDate(data.effectiveDate)}</p>

<h3>MNDA Term</h3>
<p><em>The length of this MNDA</em></p>
<p>${mndaTerm}</p>

<h3>Term of Confidentiality</h3>
<p><em>How long Confidential Information is protected</em></p>
<p>${confidentialityTerm}</p>

<h3>Governing Law &amp; Jurisdiction</h3>
<p>Governing Law: ${blank(data.governingLaw)}</p>
<p>Jurisdiction: ${blank(data.jurisdiction)}</p>

${data.modifications.trim() ? `<h3>MNDA Modifications</h3>\n<p>${escapeHtml(data.modifications)}</p>` : ""}

<p>By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.</p>

<table>
  <thead>
    <tr><th></th><th>PARTY 1</th><th>PARTY 2</th></tr>
  </thead>
  <tbody>
    <tr><td>Signature</td><td></td><td></td></tr>
    <tr><td>Print Name</td><td>${blank(data.party1Name)}</td><td>${blank(data.party2Name)}</td></tr>
    <tr><td>Title</td><td>${blank(data.party1Title)}</td><td>${blank(data.party2Title)}</td></tr>
    <tr><td>Company</td><td>${blank(data.party1Company)}</td><td>${blank(data.party2Company)}</td></tr>
    <tr><td>Notice Address</td><td>${blank(data.party1Address)}</td><td>${blank(data.party2Address)}</td></tr>
    <tr><td>Date</td><td>${formatDate(data.effectiveDate)}</td><td>${formatDate(data.effectiveDate)}</td></tr>
  </tbody>
</table>

<p class="attribution">Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
`;
}

export function generateStandardTerms(data: NdaFormData): string {
  const governingLaw = blank(data.governingLaw, "[Governing Law]");
  const jurisdiction = blank(data.jurisdiction, "[Jurisdiction]");

  return `
<h1>Standard Terms</h1>

<p><strong>1. Introduction.</strong> This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) ("<strong>MNDA</strong>") allows each party ("<strong>Disclosing Party</strong>") to disclose or make available information in connection with the Purpose which (1) the Disclosing Party identifies to the receiving party ("<strong>Receiving Party</strong>") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("<strong>Confidential Information</strong>"). Each party's Confidential Information also includes the existence and status of the parties' discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating these Standard Terms ("<strong>Cover Page</strong>"). Each party is identified on the Cover Page and capitalized terms have the meanings given herein or on the Cover Page.</p>

<p><strong>2. Use and Protection of Confidential Information.</strong> The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Purpose, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.</p>

<p><strong>3. Exceptions.</strong> The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.</p>

<p><strong>4. Disclosures Required by Law.</strong> The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.</p>

<p><strong>5. Term and Termination.</strong> This MNDA commences on the Effective Date and expires at the end of the MNDA Term. Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party's obligations relating to Confidential Information will survive for the Term of Confidentiality, despite any expiration or termination of this MNDA.</p>

<p><strong>6. Return or Destruction of Confidential Information.</strong> Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.</p>

<p><strong>7. Proprietary Rights.</strong> The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.</p>

<p><strong>8. Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.</p>

<p><strong>9. Governing Law and Jurisdiction.</strong> This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of ${governingLaw}, without regard to the conflict of laws provisions of such state. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in ${jurisdiction}. Each party irrevocably submits to the exclusive jurisdiction of such courts in any such suit, action, or proceeding.</p>

<p><strong>10. Equitable Relief.</strong> A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.</p>

<p><strong>11. General.</strong> Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. Waivers must be signed by the waiving party's authorized representative and cannot be implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of which is deemed an original and which together form the same agreement.</p>

<p class="attribution">Common Paper Mutual Non-Disclosure Agreement <a href="https://commonpaper.com/standards/mutual-nda/1.0/">Version 1.0</a> free to use under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
`;
}

export function generateFullNda(data: NdaFormData): string {
  return generateCoverPage(data) + "\n<hr />\n" + generateStandardTerms(data);
}
