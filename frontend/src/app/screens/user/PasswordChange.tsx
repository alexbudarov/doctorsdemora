import {Typography} from "@mui/material";
import {PasswordInput, SimpleForm, Title, useNotify, useRedirect} from "react-admin";
import {FieldValues} from "react-hook-form";
import {useCallback} from "react";
import {gql} from "@amplicode/gql";
import {useMutation, useQuery} from "@apollo/client";
import {useParams} from "react-router";

const USER_PASSWORD_CHANGE = gql(`
query User_PasswordChange($id: ID!) {
    user(id: $id) {
        id
        username
    }
}
`);

const CHANGE_PASSWORD_PASSWORD_CHANGE = gql(`
mutation ChangePassword_PasswordChange(
    $userId: Long!,
    $newPassword: String!
) {
    changePassword(
        userId: $userId,
        newPassword: $newPassword
)
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

  const { userId } = useParams();

  const {data: userData} = useQuery(USER_PASSWORD_CHANGE, {
    variables: {
      id: userId || ''
    }
  });

  const [runChangePassword] = useMutation(CHANGE_PASSWORD_PASSWORD_CHANGE);
  const redirect = useRedirect();
  const notify = useNotify();

  const onFormSubmit = useCallback((data: FieldValues) => {
    runChangePassword({
      variables: {
        userId: userId,
        newPassword: data.password
      }
    })
      .then(answer => {
        redirect("list", "UserDto");
        notify(`Password changed`, {type: "success"});
      });
  }, [runChangePassword, userId, redirect, notify]);

  return (
    <div>
      <Title title="Change User Password" />
      <Typography>
        Change User Password for: <b>{userData?.user.username}</b>
      </Typography>
      <SimpleForm
        onSubmit={onFormSubmit}
        validate={validateForm}
      >
        <PasswordInput label="New password" source="password" required />
        <PasswordInput label="Repeat new password" source="repeatPassword" required />
      </SimpleForm>
    </div>
  );
}
