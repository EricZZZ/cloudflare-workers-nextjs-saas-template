// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/blog",
  docs: {
    // options for `doc` collection
  },
  meta: {
    // options for `meta` collection
  }
});
var source_config_default = defineConfig();
export {
  source_config_default as default,
  docs
};
