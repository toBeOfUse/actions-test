import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "g2vupslg",
  dataset: "production",
  apiVersion: "2024-03-11",
  // Set to `true` for production environments
  useCdn: false,
});

export type SanityPost = {
  author: { bio: string; name: string };
  authorImage: string;
  catgories: { title: string; description: string }[];
  body: { children: { text: string }[] }[];
  publishedAt: string;
  title: string;
};

export async function getSanityPosts(): Promise<SanityPost[]> {
  const CONTENT_QUERY = `*[_type == "post"] {
    author->,
    "authorImage": author->image.asset->url,
    categories[]->,
    body,
    publishedAt,
    title
}
`;
  const content = await client.fetch(CONTENT_QUERY);
  return content;
}
