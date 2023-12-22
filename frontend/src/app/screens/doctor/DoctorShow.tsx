import { gql } from "@amplicode/gql";
import { Specialty } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Show, ShowProps, SimpleShowLayout, TextField } from "react-admin";
import { EnumField } from "../../../core/components/enum/EnumField";

const DOCTOR = gql(`query Doctor($id: ID!) {
  doctor(id: $id) {
    firstName
    id
    lastName
    specialty
  }
}`);

export const DoctorShow = (props: Omit<ShowProps, "children">) => {
  const queryOptions = {
    meta: {
      query: DOCTOR,
      resultDataPath: null,
    },
  };

  return (
    <Show<ItemType> queryOptions={queryOptions} {...props}>
      <SimpleShowLayout>
        <TextField source="id" />

        <TextField source="firstName" />
        <TextField source="lastName" />
        <EnumField source="specialty" enumTypeName="Specialty" enum={Specialty} />
      </SimpleShowLayout>
    </Show>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof DOCTOR>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["doctor"], undefined>;
