import React from "react";
import { Modal } from "modal/modal";

class ModalUploadThumbnail extends React.PureComponent {
  render() {
    const { abortFileSelection, uploadFile } = this.props;

    return (
      <Modal
        isOpen={true}
        contentLabel={__("Image will be public")}
        onConfirmed={uploadFile}
        onAborted={abortFileSelection}
        type="confirm"
        confirmButtonLabel={__("Upload")}
        abortButtonLabel={__("Cancel")}
      >
        <section>
          <h3 className="modal__header">
            {__("Do you want to continue?")}
          </h3>
          <p>
            {__("Your thumbnail will also be publicly available in LBRY.")}
          </p>
        </section>
      </Modal>
    );
  }
}

export default ModalUploadThumbnail;