import * as React from "react";
import { useEffect } from "react";
import Layout from "../components/layout";
import PageHeader from "../components/page-header";
import { Link, navigate } from "gatsby";

const RedirectToThaiNight = () => {
  useEffect(() => {
    navigate("/events/2024-04-14-thai-night");
  });
  return (
    <Layout pageTitle="Redirect">
      <PageHeader title="Redirect" description="" />
      <p>
        If the redirect is not happen automatically, please visit{" "}
        <Link to="/events/2024-04-14-thai-night">this link</Link>
      </p>
    </Layout>
  );
};

export const Head = () => <title>Redirect</title>;

export default RedirectToThaiNight;
