/** "(973) 444-4996" -> "tel:+19734444996"; vanity numbers like 833-KEVA-HOME are converted to digits. */
export function telHref(phone: string): string {
  const keypad: Record<string, string> = {
    A: "2", B: "2", C: "2", D: "3", E: "3", F: "3", G: "4", H: "4", I: "4", J: "5", K: "5", L: "5",
    M: "6", N: "6", O: "6", P: "7", Q: "7", R: "7", S: "7", T: "8", U: "8", V: "8", W: "9", X: "9", Y: "9", Z: "9",
  };
  const digits = phone
    .toUpperCase()
    .replace(/[A-Z]/g, (c) => keypad[c])
    .replace(/\D/g, "")
    .slice(0, 10);
  return `tel:+1${digits}`;
}

/** E.164-style number for structured data, e.g. "+1-973-444-4996". */
export function schemaPhone(phone: string): string {
  const d = telHref(phone).replace("tel:+1", "");
  return `+1-${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}
