import * as React from "react";
import { Link, graphql } from "gatsby";
import { DateTime } from "luxon";
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

const EventIndexPage = ({ data }) => {
  return (
    <Layout pageTitle="Events">
      <PageHeader
        title="Our Events"
        description="Browse through our upcoming and past events."
      />
      <h1>Upcoming Events</h1>
      <p>This semester, we have a ton of events lined up! Come join us!</p>
      {data.allMdx.nodes
        .filter((node) => {
          const todayDateTime = DateTime.local()
            .setZone(node.frontmatter.tz)
            .startOf("day");
          const beginDateTime = DateTime.fromISO(node.frontmatter.begin, {
            zone: node.frontmatter.tz,
          });
          return beginDateTime >= todayDateTime;
        })
        .map((node) => (
          <EventEntry key={node.id} node={node}></EventEntry>
        ))}
      <hr className="my-8 h-px border-0 bg-gray-300" />
      <h1>Past Events</h1>
      <p>Want to browse through our history instead?</p>
      <Link to="past" className="text-sm font-semibold leading-6">
        List of past events <span aria-hidden="true">→</span>
      </Link>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/events/" } } }
      sort: { frontmatter: { begin: ASC } }
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

export const Head = () => <title>Events</title>;

export default EventIndexPage;
