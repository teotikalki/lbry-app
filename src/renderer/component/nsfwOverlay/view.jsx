import React from "react";
import Button from "component/button";

const NsfwOverlay = props => {
  return (
    <div className="card-overlay">
      <p>
        {__(
          "This content is Not Safe For Work. To view adult content, please change your"
        )}{" "}
        <Button
          className="button-text"
          onClick={() => props.navigateSettings()}
          label={__("Settings")}
        />.
      </p>
    </div>
  );
};

export default NsfwOverlay;
