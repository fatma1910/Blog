import { PortableTextBlock } from "next-sanity";

export interface simpleBlogCard {
    title: string;
    description: string;
    currentSlug: string;
    mainImage: any;
    
}


export interface fullBlog {
    currentSlug:string;
    title: string;
    description: string;
    mainImage: any;
    content:PortableTextBlock[];
}

