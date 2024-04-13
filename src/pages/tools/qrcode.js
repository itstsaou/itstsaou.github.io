import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "gatsby";
import {
  Button,
  Breadcrumb,
  Dropdown,
  Label,
  RangeSlider,
} from "flowbite-react";
import { Switch } from "@headlessui/react";
import Layout from "../../components/layout";
import PageHeader from "../../components/page-header";

import { QRCodeCanvas } from "@cheprasov/qrcode";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(1024);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("H");
  const [qrCodeDataURI, setQrCodeDataURI] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const textDefault = params.get("text") || "";
    const sizeDefault = parseInt(params.get("size") || "1024");

    setText(textDefault);
    setSize(sizeDefault);
  }, []);

  return (
    <Layout pageTitle="QR Code Generator">
      <Breadcrumb aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/tools">Tools</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>QR Code Generator</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        title="QR Code Generator"
        description="Our internal tool for generating a QR code."
      />
      <div className="mb-6">
        <label
          for="content-txt"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Content
        </label>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          id="content-txt"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="my-2">
        <div>
          <div className="mb-1 block">
            <Label htmlFor="default-range" value={`Size: ${size} px`} />
          </div>
          <RangeSlider
            id="default-range"
            min="230"
            max="2048"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
        </div>
      </div>
      <div className="my-2 flex flex-row gap-2">
        <div className="pt-2">
          <Switch
            checked={includeLogo}
            onChange={setIncludeLogo}
            className={`${
              includeLogo ? "bg-tsaou" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                includeLogo ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="px-1">Include TSA's Logo</span>
        </div>
        <Dropdown
          label={`Error Correction Level: ${errorCorrectionLevel}`}
          color="gray"
        >
          <Dropdown.Item onClick={() => setErrorCorrectionLevel("L")}>
            L
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setErrorCorrectionLevel("M")}>
            M
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setErrorCorrectionLevel("Q")}>
            Q
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setErrorCorrectionLevel("H")}>
            H
          </Dropdown.Item>
        </Dropdown>
        <Button
          color="success"
          onClick={async (event) => {
            const qrCanvas = new QRCodeCanvas(text, {
              level: errorCorrectionLevel,
              size: size,
              image: !includeLogo
                ? null
                : {
                    source: "/img/icon.png",
                    width: "20%",
                    height: "20%",
                    x: "center",
                    y: "center",
                  },
            });
            const dataUrlWithQRCode = await qrCanvas.toDataUrl();
            setQrCodeDataURI(dataUrlWithQRCode);
          }}
        >
          Generate
        </Button>
      </div>
      <div>
        {text !== "" && <img src={qrCodeDataURI} alt="QR Code Result"></img>}
      </div>
    </Layout>
  );
};

export const Head = () => <title>QR Code Generator</title>;

export default QRCodeGenerator;
