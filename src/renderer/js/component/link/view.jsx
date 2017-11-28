import React from "react";
import Icon from "component/icon";

const Link = props => {
  const {
    href,
    title,
    style,
    label,
    icon,
    button,
    disabled,
    children,
    navigate,
    navigateParams,
    doNavigate,
    actualButton,
    className,
    ...otherProps
  } = props;

  const combinedClassName =
    (className || "") +
    (!className && !button ? "button-text" : "") + // Non-button links get the same look as text buttons
    (button ? " button-block button-" + button + " button-set-item" : "") +
    (disabled ? " disabled" : "");

  const onClick =
    !props.onClick && navigate
      ? () => {
          doNavigate(navigate, navigateParams || {});
        }
      : props.onClick;

  let content;
  if (children) {
    content = children;
  } else {
    content = (
      <span {...("button" in props ? { className: "button__content" } : {})}>
        {"icon" in props ? <Icon icon={icon} fixed={true} /> : null}
        {label ? <span className="link-label">{label}</span> : null}
      </span>
    );
  }

  // needed for type="submit" form submission to work
  // this should probably just go off the "href" prop
  // when we do that we need to check all of the buttons/links that aren't supposed to look like buttons
  const WrapperEl = actualButton ? "button" : "a";

  return (
    <WrapperEl
      className={combinedClassName}
      href={href || "javascript:;"}
      title={title}
      onClick={onClick}
      {...("style" in props ? { style: style } : {})}
      {...otherProps}
    >
      {content}
    </WrapperEl>
  );
};

export default Link;
