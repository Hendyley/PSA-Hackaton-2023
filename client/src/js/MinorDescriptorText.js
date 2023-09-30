import React from "react";

import "../css/components.css";

function MinorDescriptorText({ title, subtext }) {
    return (
      <div className="descriptor-text-div content-box">
        <div className="large-text centered-text" id="descriptor-text-title">
          {title}
        </div>
        <div className="centered-text" id="descriptor-text-subtext">
          {subtext}
        </div>
      </div>
    );
  }

export default MinorDescriptorText;