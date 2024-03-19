import * as React from "react";
import { MDXProvider } from "@mdx-js/react";

import NavBar from "./nav-bar";

const Layout = ({ pageTitle, children }) => {
  return (
    <div className="container mx-auto">
      <header className="absolute inset-x-0 top-0 z-50">
        <NavBar></NavBar>
      </header>
      <main>
        <MDXProvider>{children}</MDXProvider>
      </main>
    </div>
  );
};

export default Layout;
