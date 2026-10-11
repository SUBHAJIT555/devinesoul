const WHATSAPP = "917668648224";

function link(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function courseEnquiry(title: string) {
  return link(
    `Hello Priya, I would like to enquire about the ${title} course. Please let me know how to enroll and what I should prepare.`,
  );
}

export function serviceEnquiry(title: string) {
  return link(
    `Hello Priya, I would like to enquire about ${title}. Please let me know how a session works and how to begin.`,
  );
}

export function productOrder(name: string) {
  return link(
    `Hello Priya, I would like to order ${name}. Please let me know how to get it, and what I should share about my situation.`,
  );
}
