import HeaderBar from "../components/HeaderBar";
import React from "react";

const Page: React.FC = (props) => {
  return (
    <>
      <HeaderBar />
      {props.children}
    </>
  );
};
export default Page;
