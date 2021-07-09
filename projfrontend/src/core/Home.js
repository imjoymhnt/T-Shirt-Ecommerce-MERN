import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";

function Home() {
  return (
    <Base title="Home page" description="A T-shirt selling website">
      <h1 className="text-white">Home Component</h1>
    </Base>
  );
}

export default Home;
