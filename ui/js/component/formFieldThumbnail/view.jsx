import React from "react";
import FormField from "component/formField";
import ModalUploadThumbnail from '../../modal/modalUploadThumbnail/view'

class FormFieldThumbnail extends React.Component {

  constructor(props) {
    super(props);
    // Use action instead for managing the Modal?
    this.state = { modalActive: false }

    this.toggleModalActive = this.toggleModalActive.bind(this);
    this.onFileChoosen = this.onFileChoosen.bind(this);
  }

  //Maybe the file upload to Speech should be handled in the PublishForm component
  onFileChoosen(event) {
    this.toggleModalActive();

    this.toggleModalActive();
  }

  toggleModalActive() {
    this.setState({ modalActive: !this.state.modalActive });
  }

  // This doesn't seem to be right way to display Modals. I didn't correctly understand how it should work in our app.
  renderModal() {
    if (this.state.modalActive) {
      return (
        <ModalUploadThumbnail abortFileSelection={} uploadFile={} />
      );
    }
  }

  render() {
    return (
      <div>
        <FormField
          name="thumbnailFromFile"
          type="text"
          trim />
        <FormField
          onChange={(e) => { this.onFileChoosen(e) }}
          name="thumbnailFromUrl"
          type="file" />
        {this.renderModal()}
      </div>
    );
  }
}

export default FormFieldThumbnail;