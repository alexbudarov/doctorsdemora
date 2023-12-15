import { gql } from "@amplicode/gql";
import { Specialty } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import { Datagrid, DeleteButton, EditButton, List, TextField, TextInput } from "react-admin";
import { EnumField } from "../../../core/components/enum/EnumField";

const DOCTOR_LIST = gql(`query DoctorList_DoctorList(
  $filter: DoctorFilterInput
  $sort: [DoctorOrderByInput]
  $page: OffsetPageInput
) {
  doctorList(
    filter: $filter
    sort: $sort
    page: $page
  ) {
    content {
      firstName
      id
      lastName
      specialty
    }
    totalElements
  }
}`);

const DELETE_DOCTOR = gql(`mutation DeleteDoctor_DoctorList($id: ID!) {
  deleteDoctor(id: $id) 
}`);

export const DoctorList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: DOCTOR_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="firstName" />,
    <TextInput source="lastName" />,
    <TextInput source="specialty" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <TextField source="firstName" />
        <TextField source="lastName" />
        <EnumField source="specialty" enumTypeName="Specialty" enum={Specialty} sortable={false} />

        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_DOCTOR } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof DOCTOR_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["doctorList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
