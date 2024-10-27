

import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/sanity/client";
import Image from "next/image";

async function getData(slug:string) {
    const query = `*[_type == "blog" && slug.current== '${slug}' ]{
  'currentSlug' : slug.current,
    content,
    title,
    mainImage,
}[0]`;

const data:fullBlog = await client.fetch(query);
return data;

}
type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Blog ({ params }: PageProps)  {
    const data:fullBlog = await getData(params.slug);
  return (
    <div className="mt-8">
        <h1>
            <span className="block text-center text-primary font-semibold tracking-wide uppercase"> john Mike - Blog</span>
            <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
        </h1>
        <Image src={urlFor(data.mainImage).url()} alt="image" width={800} height={800} priority className="rounded-lg mt-8 border" /> 
    </div>
  )
}
