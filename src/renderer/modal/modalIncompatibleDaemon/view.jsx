import React from "react";
import { Modal } from "modal/modal";
import Button from "component/button/index";

class ModalIncompatibleDaemon extends React.PureComponent {
  render() {
    const { quit } = this.props;

    return (
      <Modal
        isOpen={true}
        contentLabel={__("Incompatible daemon running")}
        type="alert"
        confirmButtonLabel={__("Quit")}
        onConfirmed={quit}
      >
        {__(
          "This browser is running with an incompatible version of the LBRY protocol and your install must be repaired. "
        )}
        <Button
          label={__("Learn more")}
          href="https://lbry.io/faq/incompatible-protocol-version"
        />
      </Modal>
    );
  }
}

export default ModalIncompatibleDaemon;
