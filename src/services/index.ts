export const API_BASE_URL = process.env.API_BASE_URL;

export async function revalidateApiTag(tag: string) {
  const test = await fetch(`/api/revalidate?tag=${tag}`);
  console.log(test, "revalidateApiTag");
}
