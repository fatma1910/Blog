
import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/sanity/client";
import Image from "next/image";

// Define the type for the query result
type BlogData = {
  currentSlug: string;
  content: string;
  title: string;
  mainImage: any; // Adjust the type according to your mainImage data structure
};

async function getData(slug: string): Promise<BlogData> {
  const query = `*[_type == "blog" && slug.current == '${slug}'][0]{
    'currentSlug': slug.current,
    content,
    title,
    mainImage,
  }`;

  const data: BlogData = await client.fetch(query);
  return data;
}

// Define the type for the page props
type PageProps = {
  params: {
    slug: string;
  };
};

// Ensure the function is correctly typed and async
export default async function Blog({ params }: PageProps) {
  const data = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-center text-primary font-semibold tracking-wide uppercase">john Mike - Blog</span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.mainImage).url()}
        alt="image"
        width={800}
        height={800}
        priority
        className="rounded-lg mt-8 border"
      />
    </div>
  );
}
