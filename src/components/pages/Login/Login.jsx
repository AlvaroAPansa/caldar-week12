import React from "react";
import styles from "./Login.module.css";
import { Field, Form } from "react-final-form";
import { bindActionCreators } from "redux";
import Card from "../../shared/Card/Card";
import { TextInput } from "../../shared/FormInputs/FormInputs";
import { required } from "../../shared/FormInputs/formsValidations";
import Header from "../../shared/Header/Header";
import { loginWithFirebase } from "../../../redux/actions/authActions";
import { connect } from "react-redux";

const Login = ({
  login
}) => {
  const onSubmitLogin = (values) => {
    login(values);
  };

  return (
    <React.Fragment>
      <Header title="Caldar APP" />
      <Card title={"Login"}>
        <div className={styles.container}>
          <Form 
            onSubmit={onSubmitLogin}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Field name="email" validate={required}>
                  {(props) => <TextInput {...props} label="Email" />}
                </Field>
                <Field name="password" validate={required}>
                  {(props) => <TextInput {...props} label="Password" />}
                </Field>
                <div className={styles.buttons}>
                  <button type="submit" disabled={submitting || pristine}>
                    Login
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </Card>
    </React.Fragment>
  )
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login: loginWithFirebase
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);