export async function getNotes() {
  const res = fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  return res
}
