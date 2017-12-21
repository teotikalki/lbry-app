import React from "react";
import Button from "component/button";

const Theme = props => {
  const { themePath } = props;

  if (!themePath) {
    return null;
  }

  return (
    <Button
      href={themePath}
      rel="stylesheet"
      type="text/css"
      media="screen,print"
    />
  );
};

export default Theme;
