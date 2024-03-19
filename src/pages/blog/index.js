import * as React from "react";
import { Link, graphql } from "gatsby";
import { DateTime } from "luxon";
import Layout from "../../components/layout";
import PageHeader from "../../components/page-header";

const PostEntry = ({ node }) => {
  const beginDateTime = DateTime.fromISO(node.frontmatter.begin, {
    zone: node.frontmatter.tz,
  });
  const endDateTime = DateTime.fromISO(node.frontmatter.end, {
    zone: node.frontmatter.tz,
  });
  return (
    <article>
      <h3>
        <Link to={`/events/${node.frontmatter.slug}`}>
          {node.frontmatter.title}
        </Link>
      </h3>
      <p>
        <span>
          {beginDateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </span>{" "}
        <span>{beginDateTime.toLocaleString(DateTime.TIME_SIMPLE)}</span>
      </p>
      <p>Location: {node.frontmatter.location}</p>
      <p>{node.excerpt}</p>
    </article>
  );
};

const BlogPostIndexPage = ({ data }) => {
  return (
    <Layout pageTitle="Events">
      <PageHeader title="Blog" description="Our little writing log." />
      {data.allMdx.nodes.map((node) => (
        <PostEntry key={node.id} node={node}></PostEntry>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/posts/" } } }
      sort: { frontmatter: { begin: ASC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          tz
        }
        id
        excerpt
      }
    }
  }
`;

export const Head = () => <title>Posts</title>;

export default BlogPostIndexPage;
