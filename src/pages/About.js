import React from "react";

const About = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="about">
        <img src={require("../picture/about2.jpg")} alt="" />
      </div>
      <div className="about">
        <img src={require("../picture/about.jpg")} alt="" />
      </div>
    </div>
  );
};

export default About;
