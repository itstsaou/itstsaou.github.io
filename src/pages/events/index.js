import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout";

const EventIndexPage = ({ data }) => {
  return (
    <Layout pageTitle="Events">
      <p>My cool posts will go in here</p>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/events/${node.frontmatter.slug}`}>
              {node.frontmatter.title}
            </Link>
          </h2>
          <p>Date: {node.frontmatter.beginDateTime}</p>
          <p>{node.excerpt}</p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/events/" } } }
      sort: { frontmatter: { beginDateTime: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          beginDateTime
        }
        id
        excerpt
        internal {
          contentFilePath
        }
      }
    }
  }
`;

export const Head = () => <title>Events</title>;

export default EventIndexPage;
