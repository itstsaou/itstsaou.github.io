import * as React from "react";
import { Link } from "gatsby";
import { Breadcrumb } from "flowbite-react";
import Layout from "../../components/layout";
import PageHeader from "../../components/page-header";
import KeyboardModern from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const VirtualThaiKeyboard = () => {
  const thaiLayout = {
    layout: {
      default: [
        "\u005F \u0E45 \u002F \u002D \u0E20 \u0E16 \u0E38 \u0E36 \u0E04 \u0E15 \u0E08 \u0E02 \u0E0A {bksp}",
        "{tab} \u0E46 \u0E44 \u0E33 \u0E1E \u0E30 \u0E31 \u0E35 \u0E23 \u0E19 \u0E22 \u0E1A \u0E25 \u0E03",
        "{lock} \u0E1F \u0E2B \u0E01 \u0E14 \u0E40 \u0E49 \u0E48 \u0E32 \u0E2A \u0E27 \u0E07 {enter}",
        "{shift} \u0E1C \u0E1B \u0E41 \u0E2D \u0E34 \u0E37 \u0E17 \u0E21 \u0E43 \u0E1D {shift}",
        ".com @ {space}",
      ],
      shift: [
        "% + \u0E51 \u0E52 \u0E53 \u0E54 \u0E39 \u0E3F \u0E55 \u0E56 \u0E57 \u0E58 \u0E59 {bksp}",
        "{tab} \u0E50 \u0022 \u0E0E \u0E11 \u0E18 \u0E4D \u0E4A \u0E13 \u0E2F \u0E0D \u0E10 \u002C \u0E05",
        "{lock} \u0E24 \u0E06 \u0E0F \u0E42 \u0E0C \u0E47 \u0E4B \u0E29 \u0E28 \u0E0B \u002E {enter}",
        "{shift} ( ) \u0E09 \u0E2E \u0E3A \u0E4C \u003F \u0E12 \u0E2C \u0E26 {shift}",
        ".com @ {space}",
      ],
    },
  };
  return (
    <Layout pageTitle="Virtual Thai Keyboard">
      <Breadcrumb aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/tools">Tools</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Virtual Thai Keyboard</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        title="Virtual Thai Keyboard"
        description="Our in-house version of the virtual Thai keyboard."
      />
      <div className="mx-auto h-96 w-full md:w-9/12">
        <KeyboardModern {...thaiLayout} />
      </div>
    </Layout>
  );
};

export const Head = () => <title>Virtual Thai Keyboard</title>;

export default VirtualThaiKeyboard;
