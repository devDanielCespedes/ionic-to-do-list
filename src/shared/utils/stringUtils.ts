// Tipo recursivo para capitalizar cada palavra de um string literal.
export type CapitalizeWords<S extends string> = S extends `${infer First} ${infer Rest}`
  ? `${Capitalize<First>} ${CapitalizeWords<Rest>}`
  : Capitalize<S>;

/**
 * Capitaliza a primeira letra de cada palavra da string.
 * @param string - A string de entrada.
 * @returns A string com cada palavra capitalizada.
 */
export function capitalizeWords<T extends string>(string: T): CapitalizeWords<T> {
  // A implementação no runtime não consegue inferir o resultado de forma automática,
  // por isso é necessário usar "as" para alinhar com o tipo.
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") as CapitalizeWords<T>;
}
