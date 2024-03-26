import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Footer } from "flowbite-react";
import { Link } from "gatsby";

import NavBar from "./nav-bar";
import PageHeader from "./page-header";

const shortcodes = { PageHeader };

const Layout = ({ pageTitle, children }) => {
  return (
    <div className="container mx-auto">
      <header className="absolute inset-x-0 top-0 z-50">
        <NavBar></NavBar>
      </header>
      <main className="mt-32 px-3">
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </main>
      <Footer container>
        <Footer.Copyright href="/" by="TSA @ OU" year={2024} />
        <Footer.LinkGroup>
          <Footer.Link>
            <Link to="/about">About</Link>
          </Footer.Link>
          <Footer.Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
};

export default Layout;
