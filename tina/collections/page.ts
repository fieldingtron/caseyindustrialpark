import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true
    },
    {
      name: "body",
      type: "rich-text",
      isBody: true,
    },
    {
      name: "blocks",
      label: "Blocks",
      type: "object",
      list: true,
      templates: [
        {
          name: "content",
          label: "Content",
          fields: [
            {
              name: "body",
              label: "Body",
              type: "rich-text",
            },
          ],
        },
        {
          name: "image",
          label: "Image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image",
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string",
            },
          ],
        },
        {
          name: "heading",
          label: "Heading",
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
            },
          ],
        },
      ],
    }
  ]
}
