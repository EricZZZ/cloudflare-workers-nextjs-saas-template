import type { Doc } from "@/lib/mdx";
import { getAllDocs } from "@/lib/mdx";

export async function generateStaticParams() {
  // Load docs
  let allDocs: Doc[] | undefined;
  try {
    allDocs = await getAllDocs();
  } catch (error) {
    console.error("Failed to load docs:", error);
    // Return empty array if there's an error
    return [];
  }

  // Check if allDocs is available
  if (!allDocs) {
    return [];
  }

  // For default locale (en), generate paths for all blog posts
  const slugs = allDocs
    .filter((doc) => doc.type === "blog" && doc.locale === "en")
    .map((post) => {
      // Format: blog/en/my-first-post
      const parts = post.slug.split("/");
      return parts.slice(2).join("/"); // Get the slug part without locale
    });

  // Generate paths for each slug
  const paths = [];
  for (const slug of slugs) {
    paths.push({
      slug: [slug], // slug needs to be an array for [...slug]
    });
  }

  console.log("Generated static paths for default locale blog posts:", paths);
  return paths;
}