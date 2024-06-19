import { getSanityPosts } from "./sanity";

// Log content to console
getSanityPosts().then(content => console.log(JSON.stringify(content, null, 4)));

let number = 1;
number += "2";
number += "hi";
