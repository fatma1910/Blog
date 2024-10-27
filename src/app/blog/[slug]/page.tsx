
import {  getPost, urlFor } from "@/app/sanity/client";
import Image from "next/image";

// Define the type for your page props
interface PageProps {
  params: Params;
}

// Interface for Params
interface Params {
  slug: string;
}

// Define the Blog component with correct types
export default async function Blog({ params }: { params: { slug: string } }) {
  const data = await getPost(params.slug);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-center text-primary font-semibold tracking-wide uppercase">John Mike - Blog</span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
      </h1>
      <Image src={urlFor(data.mainImage).url()} alt="image" width={800} height={800} priority className="rounded-lg mt-8 border" />
    </div>
  );
}
