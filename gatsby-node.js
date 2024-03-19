const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
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
