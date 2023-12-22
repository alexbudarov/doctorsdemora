import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Show, ShowProps, SimpleShowLayout, TextField } from "react-admin";

const PATIENT = gql(`query Patient($id: ID!) {
  patient(id: $id) {
    firstName
    id
    lastName
  }
}`);

export const PatientShow = (props: Omit<ShowProps, "children">) => {
  const queryOptions = {
    meta: {
      query: PATIENT,
      resultDataPath: null,
    },
  };

  return (
    <Show<ItemType> queryOptions={queryOptions} {...props}>
      <SimpleShowLayout>
        <TextField source="id" />

        <TextField source="firstName" />
        <TextField source="lastName" />
      </SimpleShowLayout>
    </Show>
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
