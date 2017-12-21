import React from "react";
import Button from "component/button";
import WunderBar from "component/wunderbar";

export const Header = props => {
  const {
    balance,
    back,
    forward,
    isBackDisabled,
    isForwardDisabled,
    isUpgradeAvailable,
    navigate,
    downloadUpgrade,
  } = props;
  return (
    <header id="header">
      <div className="header__actions-left">
        <Button
          alt
          circle
          onClick={back}
          disabled={isBackDisabled}
          icon="arrow-left"
          title={__("Back")}
        />

        <Button
          alt
          circle
          onClick={forward}
          disabled={isForwardDisabled}
          icon="arrow-right"
          title={__("Forward")}
        />

        <Button
          alt
          onClick={() => navigate("/discover")}
          icon="home"
          title={__("Discover Content")}
        />
      </div>

      <WunderBar />

      <div className="header__actions-right">
        <Button
          inverse
          onClick={() => navigate("/wallet")}
          icon="user"
          label={<span>You have {balance} LBC</span>}
          title={__("Wallet")}
        />

        <Button
          onClick={() => navigate("/publish")}
          icon="cloud-upload"
          label={__("Publish")}
        />

        <Button
          alt
          onClick={() => navigate("/settings")}
          icon="gear"
          title={__("Help")}
        />

        <Button
          alt
          onClick={() => navigate("/help")}
          icon="question"
          title={__("Help")}
        />
      </div>
    </header>
  );
};

export default Header;
