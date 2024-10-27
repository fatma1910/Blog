// Import necessary modules and types
import { GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from 'next';
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

// Define the type for the static props result
type StaticPropsResult = {
  data: BlogData;
};

// Fetch data based on the slug
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

// Define the `getStaticProps` function
export async function getStaticProps(context: GetStaticPropsContext<{ slug: string }>): Promise<GetStaticPropsResult<StaticPropsResult>> {
  const { slug } = context.params!;
  const data = await getData(slug);

  return {
    props: {
      data,
    },
  };
}

// Define the `getStaticPaths` function
export async function getStaticPaths() {
  const query = `*[_type == "blog"]{ 'slug': slug.current }`;
  const blogs = await client.fetch(query);

  const paths = blogs.map((blog: { slug: string }) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Define the page component
export default function Blog({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
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
