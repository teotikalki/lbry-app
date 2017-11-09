import React from "react";
import { connect } from "react-redux";
import { doCloseModal } from "actions/app";
//import { doUploadFile } from "actions/";
import ModalUploadThumbnail from "./view";

const perform = dispatch => ({
  doAuth: () => {
    dispatch(doCloseModal());
    dispatch(doUploadFile());
  },
  closeModal: () => dispatch(doCloseModal()),
});

export default connect(null, perform)(ModalUploadThumbnail);
