import * as React from "react";
import { Link, graphql } from "gatsby";
import { DateTime } from "luxon";
import { Breadcrumb } from "flowbite-react";
import Layout from "../../components/layout";
import PageHeader from "../../components/page-header";

const EventEntry = ({ node }) => {
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

const PastEventPage = ({ data }) => {
  return (
    <Layout pageTitle="Past Events">
      <Breadcrumb aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/events">Events</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Past Events</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        title="Our Past Events"
        description="A look through our past work."
      />
      {data.allMdx.nodes
        .filter((node) => {
          const todayDateTime = DateTime.local()
            .setZone(node.frontmatter.tz)
            .startOf("day");
          const beginDateTime = DateTime.fromISO(node.frontmatter.begin, {
            zone: node.frontmatter.tz,
          });
          return beginDateTime < todayDateTime;
        })
        .map((node) => (
          <EventEntry key={node.id} node={node}></EventEntry>
        ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/events/" } } }
      sort: { frontmatter: { begin: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          begin
          end
          tz
          location
        }
        id
        excerpt
      }
    }
  }
`;

export const Head = () => <title>Past Events</title>;

export default PastEventPage;
