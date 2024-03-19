import * as React from "react";

const Head = (props) => {
  console.log(props);
  return <title>{props.pageContext.frontmatter.title}</title>;
};

export default Head;
