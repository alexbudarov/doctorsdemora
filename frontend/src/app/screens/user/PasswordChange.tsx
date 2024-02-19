import {Typography} from "@mui/material";
import {PasswordInput, SimpleForm, TextField, Title} from "react-admin";
import {FieldValues} from "react-hook-form";

export function PasswordChange() {

  function validateForm(data: FieldValues) {
    const errors: any = {};
    if (!data.password) {
      errors.password = "New password is mandatory";
    }
    if (!data.repeatPassword) {
      errors.repeatPassword = "Repeat new password is mandatory";
    }
    if (data.password && data.repeatPassword && data.password !== data.repeatPassword) {
      errors.repeatPassword = "Passwords don't match";
    }
    return errors;
  }

  return (
    <div>
      <Title title="Change User Password" />
      <Typography>Change User Password</Typography>
      <SimpleForm
        onSubmit={() => {
      }}
        validate={validateForm}
      >
        <TextField source="username"/>
        <TextField source="fullName"/>
        <PasswordInput label="New password" source="password" required />
        <PasswordInput label="Repeat new password" source="repeatPassword" required />
      </SimpleForm>
    </div>
  );
}
