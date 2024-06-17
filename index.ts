import { getSanityPosts } from "./sanity";

// Log content to console
getSanityPosts().then(content => console.log(JSON.stringify(content, null, 4)));
