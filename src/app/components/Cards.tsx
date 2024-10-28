
import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "../lib/interface";
import {getData, urlFor } from "../sanity/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Cards = async () => {
    const data: simpleBlogCard[] = await getData();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-5 justify-center">
        {data.map((item, index) => (
          <Card key={index}>
            <Image
              src={urlFor(item.mainImage).url()}
              alt="image"
              width={500}
              height={500}
              className="object-cover rounded-lg h-[200px]"
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2">{item.title}</h3>
              <p className="text-sm line-clamp-2 mt-3 text-gray-600">{item.description}</p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${item.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
}

export default Cards