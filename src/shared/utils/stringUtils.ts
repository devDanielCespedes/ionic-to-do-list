// Recursive type to capitalize each word of a string literal.
export type CapitalizeWords<S extends string> = S extends `${infer First} ${infer Rest}`
  ? `${Capitalize<First>} ${CapitalizeWords<Rest>}`
  : Capitalize<S>;

/**
 * Capitalizes the first letter of each word in the string.
 * @param string - The input string.
 * @returns The string with each word capitalized.
 */
export function capitalizeWords<T extends string>(string: T): CapitalizeWords<T> {
  // The runtime implementation cannot automatically infer the result,
  // so we use "as" to align with the type.
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") as CapitalizeWords<T>;
}
