import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Edit, SimpleForm, TextInput, useNotify, useRedirect, useUpdate } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const PATIENT = gql(`query Patient($id: ID!) {
  patient(id: $id) {
    firstName
    id
    lastName
  }
}`);
const UPDATE_PATIENT = gql(`mutation UpdatePatient($input: PatientInput!) {
  updatePatient(input: $input) {
    firstName
    id
    lastName
  }
}`);

export const PatientEdit = () => {
  const queryOptions = {
    meta: {
      query: PATIENT,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_PATIENT } };
        const options = { returnPromise: true };

        await update("Patient", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "Patient");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="firstName" required={true} />
        <TextInput source="lastName" required={true} />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PATIENT>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["patient"], undefined>;
