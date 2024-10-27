
import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./sanity/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


async function getData() {
  const query = `*[_type == "blog"] | order(_createdAt desc) {
  title,
    description,
    "currentSlug" : slug.current,
    mainImage,
}`;
const data = await client.fetch(query);
return data;
}



export default async function Home() {
  const data:simpleBlogCard[] = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 justify-center ">
      {
        data.map((item, index) => (
          <Card key={index}>
            <Image src={urlFor(item.mainImage).url()}  alt="image"
            width={500}
            height={500}
            className="object-cover rounded-lg h-[200px] " 
            />

            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2">{item.title}</h3>
              <p className="text-sm line-clamp-3 mt-3 text-gray-600">{item.description}</p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${item.currentSlug}`}>Read More</Link>
                </Button>

            </CardContent>

          </Card>
        ))}
    </div>
  );
}
