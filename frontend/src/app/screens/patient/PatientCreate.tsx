import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  Create,
  CreateProps,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_PATIENT = gql(`mutation UpdatePatient($input: PatientInput!) {
  updatePatient(input: $input) {
    firstName
    id
    lastName
  }
}`);

export const PatientCreate = (props: CreateProps) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_PATIENT } };
        const options = { returnPromise: true };

        await create("Patient", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "Patient");
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
        <TextInput source="firstName" required={true} />
        <TextInput source="lastName" required={true} />
      </SimpleForm>
    </Create>
  );
};

const PATIENT_TYPE = gql(`query Patient($id: ID!) {
  patient(id: $id) {
    firstName
    id
    lastName
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PATIENT_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["patient"], undefined>;
