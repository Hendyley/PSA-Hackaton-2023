import React from "react";

function DescriptorText({ title, subtext }) {
    return (
      <div className="descriptor-text-div content-box">
        <div className="xlarge-text centered-text" id="descriptor-text-title">
          {title}
        </div>
        <div className="centered-text" id="descriptor-text-subtext">
          {subtext}
        </div>
      </div>
    );
  }

export default DescriptorText;