import * as React from "react";
import { Link, graphql } from "gatsby";
import { DateTime } from "luxon";
import { Carousel, Breadcrumb } from "flowbite-react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXProvider } from "@mdx-js/react";

import NavBar from "../components/nav-bar";

const EventPageTemplate = ({ data, children }) => {
  const { frontmatter } = data.mdx;

  const todayDateTime = DateTime.local().setZone(frontmatter.tz).startOf("day");
  const beginDateTime = DateTime.fromISO(frontmatter.begin, {
    zone: frontmatter.tz,
  });
  const endDateTime = DateTime.fromISO(frontmatter.end, {
    zone: frontmatter.tz,
  });

  let carousel;
  if (frontmatter.embeddedImagesLocal) {
    carousel = (
      <div className="mx-auto h-56 w-9/12 sm:h-128 xl:h-128">
        <Carousel>
          {frontmatter.embeddedImagesLocal.map((item, idx) => (
            <GatsbyImage
              key={idx}
              image={getImage(item.childImageSharp.gatsbyImageData)}
              alt={frontmatter.embeddedImagesLocalAlts[idx]}
            />
          ))}
        </Carousel>
      </div>
    );
  }
  const shortcodes = {
    Carousel() {
      return carousel;
    },
  };

  return (
    <div className="container mx-auto">
      <header className="absolute inset-x-0 top-0 z-50">
        <NavBar></NavBar>
      </header>
      <main className="mt-32 px-3">
        <Breadcrumb aria-label="Breadcrumb">
          <Breadcrumb.Item>
            <Link to="/events">Events</Link>
          </Breadcrumb.Item>
          {beginDateTime < todayDateTime ? (
            <Breadcrumb.Item>
              <Link to="/events/past">Past Events</Link>
            </Breadcrumb.Item>
          ) : null}
          <Breadcrumb.Item>{frontmatter.title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="mb-14">
          <p className="mb-5 text-3xl md:text-6xl">{frontmatter.title}</p>
          <p>
            <span>
              {beginDateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </span>{" "}
            <span>{beginDateTime.toLocaleString(DateTime.TIME_SIMPLE)}</span>
          </p>
          <p>Location: {frontmatter.location}</p>
        </div>
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </main>
    </div>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        begin
        end
        tz
        location
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
        embeddedImagesLocalAlts
      }
    }
  }
`;

export const Head = ({ data }) => (
  <title>{data.mdx.frontmatter.title} | Event</title>
);

export default EventPageTemplate;
