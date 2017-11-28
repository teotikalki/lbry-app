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
        <span>{__("Exchange")} </span>
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
        <span> {__("for LBC")}</span>
        <p className="shapeshift__maxdeposit help">
          {!updating &&
            originCoinDepositLimit &&
            `The most you can exchange is ${originCoinDepositLimit} ${
              originCoin
            }`}
        </p>
      </div>

      <div>
        <label>
          {__("Return address")} ({__("optional but recommended")})
        </label>
        <input
          type="text"
          name="returnAddress"
          placeholder={getExampleAddress(originCoin)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.returnAddress}
          className="wunderbar__input wunderbar__input--shapeshift"
        />
        <span className="help">
          <span>
            We will return your {originCoin} to this address if the transaction
            doesn't go through.
          </span>
        </span>
        <p className="shapeshift__error">
          {touched.returnAddress &&
            errors.returnAddress &&
            errors.returnAddress}
        </p>
      </div>
      <div className="shapeshift__submit">
        <Link
          actualButton
          button="primary"
          type="submit"
          label={__("Begin Conversion")}
          disabled={isSubmitting || !!Object.keys(errors).length}
        />
      </div>
    </form>
  );
};
