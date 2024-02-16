import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  BooleanInput,
  Create,
  CreateProps,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { LongNumberInput } from "../../../core/components/number/LongNumberInput";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_USER = gql(`mutation UpdateUser($input: UserDtoInput!) {
  updateUser(input: $input) {
    authorityIds
    email
    enabled
    fullName
    id
    username
  }
}`);

export const UserCreate = (props: CreateProps) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_USER } };
        const options = { returnPromise: true };

        await create("UserDto", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "UserDto");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [create, notify, redirect]
  );

  return (
    <Create<ItemType> redirect="list" {...props}>
      <SimpleForm onSubmit={save}>
        <TextInput source="username" />
        <TextInput source="fullName" />
        <TextInput source="email" />
        <BooleanInput source="enabled" />
        <LongNumberInput source="authorityIds" />
      </SimpleForm>
    </Create>
  );
};

const USER_TYPE = gql(`query User($id: ID!) {
  user(id: $id) {
    authorityIds
    email
    enabled
    fullName
    id
    username
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof USER_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["user"], undefined>;
