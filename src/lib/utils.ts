type ClassValue = string | false | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]) {
  return inputs
    .flat(4)
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .join(" ");
}
