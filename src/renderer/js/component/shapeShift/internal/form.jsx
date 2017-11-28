import React from "react";
import Link from "component/link";
import { getExampleAddress } from "util/shape_shift";

export default ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  resetForm,
  isSubmitting,
  shiftSupportedCoins,
  originCoin,
  originCoinDepositLimit,
  updating,
  getCoinStats,
  receiveAddress,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <span>Exchange </span>
        <select
          className="form-field__input form-field__input-select"
          name="originCoin"
          onChange={e => {
            getCoinStats(e.target.value);
            handleChange(e);
          }}
        >
          {shiftSupportedCoins.map(coin => (
            <option key={coin} value={coin}>
              {coin}
            </option>
          ))}
        </select>
        <span> for LBC</span>
        <p className="shapeshift__maxdeposit help">
          {!updating &&
            originCoinDepositLimit &&
            `The most you can exchange is ${originCoinDepositLimit} ${
              originCoin
            }`}
        </p>
      </div>

      <div className="shapeshift__origin-address">
        <input
          type="text"
          name="returnAddress"
          placeholder={getExampleAddress(originCoin)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.returnAddress}
          className="wunderbar__input wunderbar__input--shapeshift"
        />
        <label>
          <span className="help">
            {__("Return address")}
            <br />
            <span>moar label</span>
          </span>
        </label>
        <p className="shapeshift__error">
          {touched.returnAddress &&
            errors.returnAddress &&
            errors.returnAddress}
        </p>
      </div>

      <Link
        actualButton
        button="primary"
        type="submit"
        label={__("Begin Conversion")}
        disabled={isSubmitting}
      />
    </form>
  );
};
