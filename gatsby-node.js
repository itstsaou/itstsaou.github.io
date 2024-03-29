const path = require(`path`);

const createEventPages = async (graphql, createPage) => {
  const eventTemplate = path.resolve(`./src/templates/event.js`);
  const result = await graphql(`
    query {
      allMdx(
        filter: { internal: { contentFilePath: { regex: "/events/" } } }
        sort: { frontmatter: { begin: ASC } }
      ) {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `events/${node.frontmatter.slug}`,
      component: `${eventTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};

const createPostPages = async (graphql, createPage) => {
  const postTemplate = path.resolve(`./src/templates/post.js`);
  const result = await graphql(`
    query {
      allMdx(
        filter: { internal: { contentFilePath: { regex: "/posts/" } } }
        sort: { frontmatter: { begin: ASC } }
      ) {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `posts/${node.frontmatter.slug}`,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create pages from mdxs.
  await createEventPages(graphql, createPage);
  await createPostPages(graphql, createPage);
};
