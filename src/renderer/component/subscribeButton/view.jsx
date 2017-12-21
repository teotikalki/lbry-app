import React from "react";
import Button from "component/button";

export default ({
  channelName,
  uri,
  subscriptions,
  doChannelSubscribe,
  doChannelUnsubscribe,
}) => {
  const isSubscribed =
    subscriptions
      .map(subscription => subscription.channelName)
      .indexOf(channelName) !== -1;

  const subscriptionHandler = isSubscribed
    ? doChannelUnsubscribe
    : doChannelSubscribe;

  const subscriptionLabel = isSubscribed ? __("Unsubscribe") : __("Subscribe");

  return channelName && uri ? (
    <div className="card__actions">
      <Button
        iconRight={isSubscribed ? "" : "at"}
        button={isSubscribed ? "alt" : "primary"}
        label={subscriptionLabel}
        onClick={() =>
          subscriptionHandler({
            channelName,
            uri,
          })
        }
      />
    </div>
  ) : null;
};
