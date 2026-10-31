import data from "@/data/contact.json";

const email = data.email;
const phone = data.phone.replace(/\D/g, "");
const countryCode = data.countryCode.replace(/\D/g, "");
const whatsapp = `${countryCode}${phone}`;
const phoneDisplay = `+${countryCode} ${phone}`;

export const contact = {
  email,
  phone,
  countryCode,
  phoneDisplay,
  whatsapp,
  whatsappHref: `https://wa.me/${whatsapp}`,
  telHref: `tel:+${whatsapp}`,
  mailtoHref: `mailto:${email}`,
};

const tokens: [string, string][] = [
  ["{whatsappHref}", contact.whatsappHref],
  ["{mailtoHref}", contact.mailtoHref],
  ["{telHref}", contact.telHref],
  ["{email}", contact.email],
  ["{phone}", contact.phoneDisplay],
  ["{whatsapp}", contact.whatsapp],
];

export function fillContact<T>(value: T): T {
  if (typeof value === "string") {
    let text = value as string;
    for (const [token, next] of tokens) {
      text = text.replaceAll(token, next);
    }
    return text as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => fillContact(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, next]) => [key, fillContact(next)])) as T;
  }

  return value;
}
