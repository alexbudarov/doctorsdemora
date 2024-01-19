import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {ListProps} from "ra-ui-materialui";
import {Datagrid, List, TextField, TextInput} from "react-admin";
import {DeleteButtonSecured} from "../../../core/security/components/DeleteButtonSecured";
import {EditButtonSecured} from "../../../core/security/components/EditButtonSecured";
import {Secured} from "../../../core/security/components/Secured";

const PATIENT_LIST = gql(`query PatientList(
  $filter: PatientFilterInput
  $sort: [PatientOrderByInput]
  $page: OffsetPageInput
) {
  patientList(
    filter: $filter
    sort: $sort
    page: $page
  ) {
    content {
      firstName
      id
      lastName
    }
    totalElements
  }
}`);

const DELETE_PATIENT = gql(`mutation DeletePatient($id: ID!) {
  deletePatient(id: $id) 
}`);

export const PatientList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: PATIENT_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [<TextInput source="firstName" />, <TextInput source="lastName" />];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} label="Id"/>

        <TextField source="firstName" />
        <TextField source="lastName" />

        <EditButtonSecured />
        <DeleteButtonSecured
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_PATIENT } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PATIENT_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["patientList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
