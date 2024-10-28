
import { fullBlog } from "@/app/lib/interface";
import {  getPost, urlFor } from "@/app/sanity/client";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function Blog({ params }: { params: { slug: string } }) {
  const data:fullBlog  = await getPost(params.slug);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-center text-primary font-semibold tracking-wide uppercase">John Mike - Blog</span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
      </h1>
      <Image src={urlFor(data.mainImage).url()} alt="image" width={800} height={800} priority className="rounded-lg mt-8 border" />

      <div className="mt-16 prose prose-blue prose-xl mb-16 dark:prose-invert prose-li:marker:text-primary">
        <PortableText value={data.content}/>

      </div>
    </div>
  );
}
