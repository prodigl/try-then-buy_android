import parse from "html-react-parser";

const renderHTML = (__html) => {
    return <div>{parse(__html)}</div>;
  };
  export default renderHTML;