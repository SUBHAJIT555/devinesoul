import { LegalDocument, legalMetadata } from "@/components/legal-document";

export function generateMetadata() {
  return legalMetadata("cookies");
}

export default function CookiePage() {
  return <LegalDocument pageKey="cookies" />;
}
