const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // Create a page for an event.
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

  // Create redirects for 2024 Thai Night.
  const thaiNight2024Aliases = ["/2024-thai-night", "/thai-night"];
  thaiNight2024Aliases.forEach((alias) =>
    createRedirect({
      fromPath: alias,
      toPath: `/events/2024-04-14-thai-night`,
      redirectInBrowser: true,
    }),
  );
};

exports.onPostBuild = ({ store }) => {
  const { redirects } = store.getState();

  console.log(redirects);
};
