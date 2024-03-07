import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";

const EventPage = ({ data, children }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>My blog post contents will go here (eventually).</p>
      {children}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

export const Head = ({ data }) => <title>{data.mdx.frontmatter.title}</title>;

export default EventPage;
