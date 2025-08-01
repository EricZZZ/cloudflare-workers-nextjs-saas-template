import fs from "fs/promises";
import { marked } from "marked";
import path from "path";

// 检查是否在边缘运行时环境
const isEdgeRuntime = typeof process !== 'undefined' && process.env?.NEXT_RUNTIME === 'edge';

// 只在非边缘环境中导入fs模块
const contentDir = !isEdgeRuntime ? path.join(process.cwd(), "content") : "";

export interface Doc {
  slug: string;
  content: string;
  type: string;
  locale: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  author?: string;
  headings?: Heading[];
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export async function loadDocs(): Promise<Doc[]> {
  // 在边缘环境中返回空数组
  if (isEdgeRuntime) {
    return [];
  }

  const docs: Doc[] = [];

  try {
    // Read blog directory
    const blogLocales = await fs
      .readdir(path.join(contentDir, "blog"))
      .catch(() => []);

    for (const locale of blogLocales) {
      const localeDir = path.join(contentDir, "blog", locale);
      const files = await fs.readdir(localeDir).catch(() => []);

      for (const file of files) {
        if (file.endsWith(".mdx")) {
          const content = await fs.readFile(
            path.join(localeDir, file),
            "utf-8"
          );
          const slugWithoutExtension = file.replace(".mdx", "");

          // Parse frontmatter to get metadata
          const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
          const match = content.match(frontmatterRegex);
          let title = slugWithoutExtension;
          let description = "";
          let createdAt = "";
          let updatedAt = "";
          let tags: string[] = [];
          let author = "";

          if (match) {
            const frontmatter = match[1];

            // Extract fields from frontmatter
            const titleMatch = frontmatter.match(/title:\s*(.*)/);
            const descriptionMatch = frontmatter.match(/description:\s*(.*)/);
            const createdAtMatch = frontmatter.match(/createdAt:\s*(.*)/);
            const updatedAtMatch = frontmatter.match(/updatedAt:\s*(.*)/);
            const tagsMatch = frontmatter.match(/tags:\s*$(.*?)$/);
            const authorMatch = frontmatter.match(/author:\s*(.*)/);

            if (titleMatch) {
              title = titleMatch[1].replace(/['"]/g, "").trim();
            }
            if (descriptionMatch) {
              description = descriptionMatch[1].replace(/['"]/g, "").trim();
            }
            if (createdAtMatch) {
              createdAt = createdAtMatch[1].replace(/['"]/g, "").trim();
            }
            if (updatedAtMatch) {
              updatedAt = updatedAtMatch[1].replace(/['"]/g, "").trim();
            }
            if (tagsMatch) {
              tags = tagsMatch[1]
                .split(",")
                .map((tag) => tag.trim().replace(/['"]/g, ""));
            }
            if (authorMatch) {
              author = authorMatch[1].replace(/['"]/g, "").trim();
            }
          }

          // Extract content without frontmatter
          const contentWithoutFrontmatter = content
            .replace(frontmatterRegex, "")
            .trim();

          // Convert markdown to HTML
          const htmlContent = await marked(contentWithoutFrontmatter);

          // Extract headings for table of contents
          const headings: Heading[] = [];

          // Keep track of used IDs to ensure uniqueness
          const usedIds = new Set<string>();

          // Function to generate a unique ID
          const generateUniqueId = (baseId: string): string => {
            let uniqueId = baseId;
            let counter = 1;

            while (usedIds.has(uniqueId)) {
              uniqueId = `${baseId}-${counter}`;
              counter++;
            }

            usedIds.add(uniqueId);
            return uniqueId;
          };

          // First, let's add IDs to headings in the HTML content
          const processedHtml = htmlContent.replace(
            /<h([1-6])>(.*?)<\/h[1-6]>/g,
            (_match, level, content) => {
              // Create an ID from the heading content
              let id = content
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");

              // If ID is empty, use a default one
              if (!id) {
                id = `heading-${level}`;
              }

              // Ensure ID is unique
              const uniqueId = generateUniqueId(id);

              // Add the ID to the heading
              return `<h${level} id="${uniqueId}">${content}</h${level}>`;
            }
          );

          // Remove H1 headings from the content (but keep them for the title)
          const contentWithoutH1 = processedHtml.replace(
            /<h1[^>]*>.*?<\/h1>/g,
            ""
          );

          // Now extract the headings with IDs (excluding H1 for TOC)
          const extractHeadingRegex = /<h([1-6]) id="([^"]*)">(.*?)<\/h[1-6]>/g;
          let headingMatch: RegExpExecArray | null = null;

          // Use a while loop to extract all headings
          while (true) {
            headingMatch = extractHeadingRegex.exec(processedHtml);
            if (headingMatch === null) break;

            const level = parseInt(headingMatch[1], 10);
            const id = headingMatch[2];
            const text = headingMatch[3].replace(/<[^>]*>/g, ""); // Strip HTML tags from text

            // Only add heading if it has a valid ID and is not H1 (for TOC)
            if (id && level >= 2) {
              headings.push({
                level,
                text,
                id,
              });
            }
          }

          docs.push({
            slug: `blog/${locale}/${slugWithoutExtension}`,
            content: contentWithoutH1, // Use content without H1 headings
            type: "blog",
            locale,
            title,
            description,
            createdAt,
            updatedAt,
            tags,
            author,
            headings, // This will only contain H2-H6 headings
          });
        }
      }
    }
  } catch (error) {
    console.error("Error loading docs:", error);
  }

  return docs;
}

// Export a function to load docs instead of loading them immediately
export async function getAllDocs() {
  return await loadDocs();
}