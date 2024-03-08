import * as React from "react";

const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-14">
      <p className="sm: text-3xl md:text-6xl">{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default PageHeader;
