import React from "react";
import Link from "component/link";
import { CreditAmount } from "component/common";
import { Form, FormRow, Submit } from "component/form.js";

const sitekey =
  process.env.NODE_ENV === "development"
    ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    : "6LcWvj0UAAAAAGBAEp6-UDoe0_iSAn8IZW0GDcf0";

class UserEmailVerify extends React.PureComponent {
  constructor(props) {
    super(props);

    this.eleId = "recaptcha-" + Date.now();

    this.state = {
      code: "",
      recaptcha: "",
    };
  }

  componentDidMount() {
    grecaptcha.render(this.eleId, {
      sitekey: sitekey,
      callback: this.verifyCallback.bind(this),
      theme: "light",
      type: "image",
      badge: "bottomright",
    });
  }

  handleCodeChanged(event) {
    this.setState({
      code: String(event.target.value).trim(),
    });
  }

  handleSubmit() {
    const { code, recaptcha } = this.state;
    this.props.verifyUserEmail(code, recaptcha);
  }

  verifyCallback(response) {
    this.setState({
      recaptcha: String(response),
    });
  }

  render() {
    const {
      cancelButton,
      errorMessage,
      email,
      isPending,
      rewardAmount,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <p>Please enter the verification code emailed to {email}.</p>
        <FormRow
          type="text"
          label={__("Verification Code")}
          name="code"
          value={this.state.code}
          onChange={event => {
            this.handleCodeChanged(event);
          }}
          errorMessage={errorMessage}
        />
        <div className="form-row form-row--field-only">
          <div className="form-field">
            <div id={this.eleId} className="g-recaptcha" />
          </div>
          <div className="form-field__helper">
            <p>
              {__("Email")}{" "}
              <Link href="mailto:help@lbry.io" label="help@lbry.io" /> or join
              our <Link href="https://chat.lbry.io" label="chat" />{" "}
              {__("if you encounter any trouble with your code.")}
            </p>
          </div>
        </div>
        <div className="form-row-submit">
          <Submit
            label={__("Verify")}
            disabled={isPending || !this.state.code || !this.state.recaptcha}
          />
          {cancelButton}
        </div>
      </Form>
    );
  }
}

export default UserEmailVerify;
