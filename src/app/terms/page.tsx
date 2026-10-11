import { LegalDocument, legalMetadata } from "@/components/legal-document";

export function generateMetadata() {
  return legalMetadata("terms");
}

export default function TermsPage() {
  return <LegalDocument pageKey="terms" />;
}
