import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/blog",
  docs: {
    // options for `doc` collection
  },
  meta: {
    // options for `meta` collection
  },
});

export default defineConfig();
