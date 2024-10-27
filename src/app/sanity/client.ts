
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "a8msafdq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client) ;

export function urlFor (source: any) {
  return builder.image(source)
}

export const getPost = async (slug: string) => {
  const query = `*[_type == "blog" && slug.current== '${slug}' ][0]{
    'currentSlug' : slug.current,
      content,
      title,
      mainImage,
  }`;
  
  const data = await client.fetch(query);
  return data;
}