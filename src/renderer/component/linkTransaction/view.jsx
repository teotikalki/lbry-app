import React from "react";
import Button from "component/button";

const LinkTransaction = props => {
  const { id } = props;
  const linkProps = Object.assign({}, props);

  linkProps.href = "https://explorer.lbry.io/#!/transaction/" + id;
  linkProps.label = id.substr(0, 7);

  return <Button {...linkProps} />;
};

export default LinkTransaction;
