import * as React from "react";
import Layout from "../../components/layout";
import PageHeader from "../../components/page-header";
import { Link } from "gatsby";
import { Card } from "flowbite-react";

const ToolIndexPage = () => {
  return (
    <Layout pageTitle="Tools">
      <PageHeader
        title="List of our tools"
        description="Where our developers have been sinking the time into 😂"
      />

      <div className="flex flex-row flex-wrap gap-2">
        <Card href="#" className="basis-80">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <Link to="qrcode">QR Code Generator</Link>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Our in-house QR code generator.
          </p>
        </Card>
        <Card href="#" className="basis-80">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <Link to="thai-keyboard">Virtual Thai Keyboard</Link>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Our in-house version of the virtual Thai keyboard.
          </p>
        </Card>
        <Card href="#" className="basis-80">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <Link to="names">Names App</Link>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            An application that guides the user on how to write their name in
            Thai.
          </p>
        </Card>
        <Card href="#" className="basis-80">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <Link to="meeting-checklist">Meeting Checklist</Link>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Our checklist for the general body meeting.
          </p>
        </Card>
      </div>

      <div>
        <h2>Quick Links</h2>
        <ul className="list-inside list-disc">
          <li>
            <a
              href="https://obiprd.oit.ohio.edu/analytics/saw.dll?bieehome"
              target="_blank"
            >
              Funds Available View
            </a>
          </li>
          <li>
            <a href="https://www.ohio.edu/engagement/resources" target="_blank">
              Student Organization Resources & Trainings
            </a>
          </li>
          <li>
            <a
              href="https://help.ohio.edu/TDClient/38/OHIOBSC/Home/"
              target="_blank"
            >
              Reimbursement System (OHIO BSC Client Portal Home)
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export const Head = () => <title>Tools</title>;

export default ToolIndexPage;
