import React from "react";
import { connect } from "react-redux";
import ModalAutoUpdateDownloaded from "./view";

const perform = dispatch => ({
  closeModal: () => dispatch(doCloseModal()),
});

export default connect(null, perform)(ModalAutoUpdateDownloaded);
