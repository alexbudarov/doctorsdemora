import {Typography} from "@mui/material";
import {PasswordInput, SimpleForm, TextField, Title} from "react-admin";
import {FieldValues} from "react-hook-form";
import {useCallback, useMemo} from "react";
import {gql} from "@amplicode/gql";
import {useQuery} from "@apollo/client";

const USER_PASSWORD_CHANGE = gql(`
query User_PasswordChange($id: ID!) {
    user(id: $id) {
        id
        username
    }
}
`);

export function PasswordChange() {

  const validateForm = useCallback((data: FieldValues) => {
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
  }, []);

  const {data: userData} = useQuery(USER_PASSWORD_CHANGE, {
    variables: {
      id: 1 + ''// todo
    }
  });

  return (
    <div>
      <Title title="Change User Password" />
      <Typography>
        Change User Password for: <b>{userData?.user.username}</b>
      </Typography>
      <SimpleForm
        onSubmit={() => {
      }}
        validate={validateForm}
      >
        <PasswordInput label="New password" source="password" required />
        <PasswordInput label="Repeat new password" source="repeatPassword" required />
      </SimpleForm>
    </div>
  );
}
