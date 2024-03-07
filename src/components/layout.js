import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";

const Layout = ({ pageTitle, children }) => {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className="my-3">{pageTitle}</h1>
        <MDXProvider>{children}</MDXProvider>
      </main>
    </div>
  );
};

export default Layout;
