/**
 * @type {import('gatsby').GatsbyConfig}
 */
import { dirname } from "path";
import { fileURLToPath } from "url";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  siteMetadata: {
    title: `OU Thai Student Association`,
    siteUrl: `https://tsaou.page/`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 70,
          formats: ["auto", "webp", "avif"],
          placeholder: "blurred",
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: { trackingIds: ["G-WQ161LH8W7", "AW-390929899"] },
      gtagConfig: {
        anonymize_ip: true,
        cookie_expires: 0,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        rehypePlugins: [
          // Generate heading ids for rehype-autolink-headings
          rehypeSlug,
          // To pass options, use a 2-element array with the
          // configuration in an object in the second element
          [rehypeAutolinkHeadings, { behavior: `wrap` }],
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "events",
        path: `${__dirname}/events`,
      },
      __key: "events",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
      __key: "images",
    },
  ],
};

export default config;