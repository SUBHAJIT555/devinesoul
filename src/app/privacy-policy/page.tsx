import { LegalDocument, legalMetadata } from "@/components/legal-document";

export function generateMetadata() {
  return legalMetadata("privacy");
}

export default function PrivacyPage() {
  return <LegalDocument pageKey="privacy" />;
}
