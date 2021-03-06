import React from "react";
import { CreditAmount } from "component/common";
import { Form, FormRow, Submit } from "component/form.js";

class UserEmailNew extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  handleEmailChanged(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleSubmit() {
    const { email } = this.state;
    this.props.addUserEmail(email);
  }

  render() {
    const { cancelButton, errorMessage, isPending, rewardAmount } = this.props;

    return (
      <div>
        <p>
          Let us know your email and you'll receive{" "}
          <CreditAmount amount={rewardAmount} label="LBC" />, the blockchain
          token used by LBRY.
        </p>
        <p>
          {__(
            "We'll also let you know about LBRY updates, security issues, and great new content."
          )}
        </p>
        <p>
          {__("We'll never sell your email, and you can unsubscribe at any time.")}
        </p>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormRow
            type="text"
            label="Email"
            placeholder="youremail@example.org"
            name="email"
            value={this.state.email}
            errorMessage={errorMessage}
            onChange={event => {
              this.handleEmailChanged(event);
            }}
          />
          <div className="form-row-submit">
            <Submit label="Submit" disabled={isPending} />
            {cancelButton}
          </div>
        </Form>
      </div>
    );
  }
}

export default UserEmailNew;
