import { createClient } from "@sanity/client";

const client = createClient({
   projectId: "g2vupslg", 
   dataset: "production", 
   apiVersion: "2024-03-11",
   // Set to `true` for production environments
   useCdn: false, 
});

// Fetch content with GROQ
async function getBlogPosts() {
  const CONTENT_QUERY = `*[_type == "post"] {
  ...,
  author->,
  mainImage {
    ...,
    asset->
  },
  categories[]->,
  body
}
`;
  const content = await client.fetch(CONTENT_QUERY);
  return content;
}

// Log content to console
getBlogPosts().then(content => console.log(JSON.stringify(content, null, 4)));
