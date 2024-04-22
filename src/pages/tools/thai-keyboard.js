import * as React from "react";
import { useState, useMemo, useRef } from "react";
import { Link } from "gatsby";
import { Breadcrumb, Button } from "flowbite-react";
import { Switch } from "@headlessui/react";
import Layout from "../../components/layout";
import PageHeader from "../../components/page-header";
import KeyboardModern from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const generateMapping = (layoutA, layoutB) => {
  let mappings = {};
  if (layoutA.length !== layoutB.length) {
    throw new Error(
      `The two layouts do not have the same amount of row. Layout A has ${layoutA.length} rows but layout B has ${layoutB.length} rows.`,
    );
  } else {
    layoutA.forEach((val, idx) => {
      const keysA = val.split(" ");
      const keysB = layoutB[idx].split(" ");
      if (keysA.length != keysB.length) {
        throw new Error(
          `The two layouts do not have the same amount of column on a specific row. On row ${idx + 1}, layout A has ${keysA.length} keys but layout B has ${keysB.length} keys.`,
        );
      }
    });
  }

  layoutA.forEach((val, rowIdx) => {
    const keysA = val.split(" ");
    const keysB = layoutB[rowIdx].split(" ");

    keysA.forEach((key, keyIdx) => {
      mappings[key] = keysB[keyIdx];
    });
  });

  return mappings;
};

const isAllThaiChars = (text) => {
  for (let i = 0; i < text.length; i++) {
    let codePoint = text.charCodeAt(i);
    if (text.charAt(i) !== " " && (codePoint < 0x0e00 || codePoint > 0x0e5c)) {
      return false;
    }
  }
  return true;
};

const KeyboardAndInputEntry = () => {
  const layouts = {
    layout: {
      defaultTh: [
        "\u005F \u0E45 \u002F \u002D \u0E20 \u0E16 \u0E38 \u0E36 \u0E04 \u0E15 \u0E08 \u0E02 \u0E0A {bksp}",
        "{tab} \u0E46 \u0E44 \u0E33 \u0E1E \u0E30 \u0E31 \u0E35 \u0E23 \u0E19 \u0E22 \u0E1A \u0E25 \u0E03",
        "{lock} \u0E1F \u0E2B \u0E01 \u0E14 \u0E40 \u0E49 \u0E48 \u0E32 \u0E2A \u0E27 \u0E07 {enter}",
        "{shift} \u0E1C \u0E1B \u0E41 \u0E2D \u0E34 \u0E37 \u0E17 \u0E21 \u0E43 \u0E1D {shift}",
        ".com @ {space}",
      ],
      shiftTh: [
        "% + \u0E51 \u0E52 \u0E53 \u0E54 \u0E39 \u0E3F \u0E55 \u0E56 \u0E57 \u0E58 \u0E59 {bksp}",
        "{tab} \u0E50 \u0022 \u0E0E \u0E11 \u0E18 \u0E4D \u0E4A \u0E13 \u0E2F \u0E0D \u0E10 \u002C \u0E05",
        "{lock} \u0E24 \u0E06 \u0E0F \u0E42 \u0E0C \u0E47 \u0E4B \u0E29 \u0E28 \u0E0B \u002E {enter}",
        "{shift} ( ) \u0E09 \u0E2E \u0E3A \u0E4C \u003F \u0E12 \u0E2C \u0E26 {shift}",
        ".com @ {space}",
      ],
      defaultEn: [
        "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{lock} a s d f g h j k l ; ' {enter}",
        "{shift} z x c v b n m , . / {shift}",
        ".com @ {space}",
      ],
      shiftEn: [
        "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
        "{tab} Q W E R T Y U I O P { } |",
        '{lock} A S D F G H J K L : " {enter}',
        "{shift} Z X C V B N M < > ? {shift}",
        ".com @ {space}",
      ],
    },
  };
  const defaultThToEn = useMemo(
    () => generateMapping(layouts.layout.defaultTh, layouts.layout.defaultEn),
    [layouts],
  );
  const shiftThToEn = useMemo(
    () => generateMapping(layouts.layout.shiftTh, layouts.layout.shiftEn),
    [layouts],
  );
  const mappingThToEn = { ...defaultThToEn, ...shiftThToEn };

  const defaultEnToTh = useMemo(
    () => generateMapping(layouts.layout.defaultEn, layouts.layout.defaultTh),
    [layouts],
  );
  const shiftEnToTh = useMemo(
    () => generateMapping(layouts.layout.shiftEn, layouts.layout.shiftTh),
    [layouts],
  );
  const mappingEnToTh = { ...defaultEnToTh, ...shiftEnToTh };

  const [isHoldingShiftKey, setIsHoldingShiftKey] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [layoutName, setLayoutName] = useState("defaultTh");
  const [text, setText] = useState("");

  const contentTextareaRef = useRef(null);
  const keyboardRef = useRef(null);

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="content-txt"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Content
        </label>
        <textarea
          ref={contentTextareaRef}
          rows={3}
          value={text}
          onChange={(e) => {
            let newValue = e.target.value;
            const rawNewChar = e.target.value.slice(text.length);

            if (rawNewChar && rawNewChar !== "\n") {
              // Convert rawNewChar depending on the language and layout.
              if (enabled && !isAllThaiChars(rawNewChar)) {
                const newChar = mappingEnToTh[rawNewChar];
                newValue = text + newChar;
              } else if (!enabled && isAllThaiChars(rawNewChar)) {
                const newChar = mappingThToEn[rawNewChar];
                newValue = text + newChar;
              }
              setText(newValue);
            } else {
              setText(newValue);
            }

            keyboardRef.current.replaceInput({ default: newValue });
          }}
          onKeyDown={(e) => {
            if (e.shiftKey && !isHoldingShiftKey) {
              setIsHoldingShiftKey(true);
              if (enabled) {
                setLayoutName(
                  layoutName === "defaultTh" ? "shiftTh" : "defaultTh",
                );
              } else {
                setLayoutName(
                  layoutName === "defaultEn" ? "shiftEn" : "defaultEn",
                );
              }
            }
          }}
          onKeyUp={(e) => {
            if (!e.shiftKey && isHoldingShiftKey) {
              setIsHoldingShiftKey(false);
              if (enabled) {
                setLayoutName(
                  layoutName === "defaultTh" ? "shiftTh" : "defaultTh",
                );
              } else {
                setLayoutName(
                  layoutName === "defaultEn" ? "shiftEn" : "defaultEn",
                );
              }
            }
          }}
          id="content-txt"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="my-2 flex flex-row gap-2">
        <div className="pt-2">
          <Switch
            checked={enabled}
            onChange={(value) => {
              setEnabled(value);

              if (value && layoutName.startsWith("default")) {
                setLayoutName("defaultTh");
              } else if (value && layoutName.startsWith("shift")) {
                setLayoutName("shiftTh");
              } else if (layoutName.startsWith("default")) {
                setLayoutName("defaultEn");
              } else if (layoutName.startsWith("shift")) {
                setLayoutName("shiftEn");
              }
            }}
            className={`${
              enabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="px-1">Thai Layout</span>
        </div>
        <Button
          color="failure"
          onClick={(event) => {
            setText("");
            keyboardRef.current.clearInput();
          }}
        >
          Clear
        </Button>
        <Button
          className="ml-auto"
          color="success"
          onClick={async (event) => {
            try {
              await navigator.clipboard.writeText(text);
            } catch (err) {
              console.error("Failed to copy: ", err);
            }
          }}
        >
          Copy
        </Button>
      </div>
      <div className="mx-auto h-96 w-full md:w-9/12">
        <KeyboardModern
          {...layouts}
          keyboardRef={(r) => {
            keyboardRef.current = r;
          }}
          preventMouseDownDefault={true}
          preventMouseUpDefault={true}
          newLineOnEnter={true}
          layoutName={layoutName}
          onChange={(input) => {
            setText(input);
          }}
          onKeyPress={(button) => {
            if (button === "{shift}" || button === "{lock}") {
              if (enabled) {
                setLayoutName(
                  layoutName === "defaultTh" ? "shiftTh" : "defaultTh",
                );
              } else {
                setLayoutName(
                  layoutName === "defaultEn" ? "shiftEn" : "defaultEn",
                );
              }
            }
          }}
        />
      </div>
    </>
  );
};

const VirtualThaiKeyboard = () => {
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
      <KeyboardAndInputEntry />
    </Layout>
  );
};

export const Head = () => <title>Virtual Thai Keyboard</title>;

export default VirtualThaiKeyboard;
