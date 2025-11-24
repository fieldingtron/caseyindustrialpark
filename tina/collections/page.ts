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
      templates: [
        {
          name: "img",
          label: "Image",
          ui: {
            itemProps: (item) => {
              return { label: item?.alt || "Image" };
            },
          },
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
      ],
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
          ui: {
            itemProps: (item) => {
              const text = item?.body?.children?.[0]?.children?.[0]?.text;
              return { label: text ? (text.length > 30 ? text.slice(0, 30) + "..." : text) : "Content" };
            },
          },
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
          ui: {
            itemProps: (item) => {
              return { label: item?.src || "Image" };
            },
          },
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
          ui: {
            itemProps: (item) => {
              return { label: item?.title || "Heading" };
            },
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
            },
          ],
        },
        {
          name: "html",
          label: "HTML Code",
          ui: {
            itemProps: (item) => {
              return { label: "HTML Code" };
            },
          },
          fields: [
            {
              name: "code",
              label: "Code",
              type: "string",
              ui: {
                component: "textarea",
              },
            },
          ],
        },
      ],
    }
  ]
}
