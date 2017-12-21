import React from "react";
import Button from "component/button";
import { CreditAmount } from "component/common";

const WalletBalance = props => {
  const { balance, navigate } = props;
  /*
<div className="help">
          <Button
            onClick={() => navigate("/backup")}
            label={__("Backup Your Wallet")}
          />
        </div>
 */
  return (
    <section className="card">
      <div className="card__title-primary">
        <h3>{__("Balance")}</h3>
      </div>
      <div className="card__content">
        {(balance || balance === 0) && (
          <CreditAmount amount={balance} precision={8} />
        )}
      </div>
      <div className="card__actions">
        <Button button="alt" navigate="/getcredits" label={__("Get Credits")} />
        <Button
          button="alt"
          disabled={balance === 0}
          navigate="/backup"
          label={__("Backup Wallet")}
        />
      </div>
    </section>
  );
};

export default WalletBalance;
