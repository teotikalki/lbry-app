import React from "react";
import lbryuri from "lbryuri.js";
import classnames from "classnames";
import Link from "component/link";
import Autocomplete from "./internal/autocomplete";

class WunderBar extends React.PureComponent {
  constructor() {
    super();
    this._input = undefined;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { updateSearchQuery, getSearchSuggestions } = this.props;
    const value = e.target.value;

    updateSearchQuery(value);
    //TODO: throttle this
    getSearchSuggestions(value);
  }

  handleSubmit(value) {
    const { onSubmit, onSearch } = this.props;
    if (!value) {
      return;
    }

    this._input.blur();

    try {
      const uri = lbryuri.normalize(value);
      onSubmit(uri);
    } catch (e) {
      // search query isn't a valid uri
      onSearch(value);
    }
  }

  render() {
    const { searchQuery, isActive, address, suggestions } = this.props;

    // if we are on the file/channel page
    // use the address in the history stack
    const wunderbarValue = isActive ? searchQuery : searchQuery || address;

    return (
      <div
        className={classnames("header__wunderbar", {
          "header__wunderbar--active": isActive,
        })}
      >
        <Autocomplete
          autoHighlight
          ref={ref => (this._input = ref)}
          wrapperStyle={{ height: "100%", width: "100%" }}
          value={wunderbarValue}
          items={suggestions}
          getItemValue={item => item.value}
          onChange={this.handleChange}
          onSelect={this.handleSubmit}
          renderInput={props => (
            <input
              {...props}
              className="wunderbar__input"
              placeholder="Search for videos, movies, and more"
            />
          )}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.value}
              className={classnames("wunderbar__suggestion", {
                "wunderbar__active-suggestion": isHighlighted,
              })}
            >
              {item.label}
            </div>
          )}
        />
      </div>
    );
  }
}

export default WunderBar;
