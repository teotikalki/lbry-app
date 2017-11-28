import React, { PureComponent } from "react";
import { shell, clipboard } from "electron";
import QRCode from "qrcode-react";
import Link from "component/link";
import * as statuses from "constants/shape_shift";

export default class ActiveShapeShift extends PureComponent {
  constructor() {
    super();
    this.continousFetch = undefined;
  }

  componentDidMount() {
    const { getActiveShift, shiftDepositAddress } = this.props;

    getActiveShift(shiftDepositAddress);
    this.continousFetch = setInterval(() => {
      getActiveShift(shiftDepositAddress);
    }, 10000);
  }

  componentWillUpdate(nextProps) {
    const { shiftState } = nextProps;
    if (shiftState === STATUSES.COMPLETE) {
      this.clearContinuousFetch();
    }
  }

  componentWillUnmount() {
    this.clearContinuousFetch();
  }

  clearContinuousFetch() {
    clearInterval(this.continousFetch);
    this.continousFetch = null;
  }

  render() {
    const {
      shiftCoinType,
      shiftDepositAddress,
      shiftReturnAddress,
      shiftOrderId,
      shiftState,
      shiftDepositLimit,
      clearShapeShift,
    } = this.props;

    return (
      <div className="shapeshift__active-shift">
        {shiftState === statuses.NO_DEPOSITS && (
          <div>
            <p>
              Send up to{" "}
              <span className="font-bold">
                {shiftDepositLimit}{" "}
                <span className="shapeshift__success">{shiftCoinType}</span>
              </span>{" "}
              to the address below
            </p>

            <div className="shapeshift__deposit-address-wrapper">
              <span className="shapeshift__deposit-address font-bold">
                {shiftDepositAddress}
              </span>
              {/* the header__item class should be a generic button class */}
              <span className="header__item">
                <Link
                  button="alt button--flat"
                  icon="clipboard"
                  onClick={() => {
                    // TODO: add popup saying "copied"
                    // in snackbar?
                    clipboard.writeText(shiftDepositAddress);
                  }}
                />
              </span>
              <div className="shapeshift__qrcode">
                <QRCode value={shiftDepositAddress} />
              </div>
            </div>
          </div>
        )}

        {shiftState === statuses.RECEIVED && (
          <div className="shapeshift__received">
            <div>
              ShapeShift has received your payment and is sending the LBC to
              your wallet
            </div>
            <div>(this can take a while)</div>
          </div>
        )}

        {shiftState === statuses.COMPLETE && (
          <div>
            <div>Shift complete. Check your wallet to see your new funds</div>
          </div>
        )}
        <div className="shapeshift__actions">
          <Link
            button="primary"
            label={__("Cancel")}
            onClick={clearShapeShift}
          />
          <Link
            button="alt"
            label={__("View the status on Shapeshift.io")}
            onClick={() =>
              shell.openExternal(
                `https://shapeshift.io/#/status/${shiftOrderId}`
              )
            }
          />
          {shiftState === statuses.NO_DEPOSITS &&
            shiftReturnAddress && (
              <div className="help">
                If the transaction doesn't go through, ShapeShift will return
                your {shiftCoinType} back to{" "}
                <span className="shapeshift__return-adr">
                  {shiftReturnAddress}
                </span>
              </div>
            )}
        </div>
      </div>
    );
  }
}
