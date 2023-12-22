import { gql } from "@amplicode/gql";
import { Specialty } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  TextField,
  TextInput, TopToolbar
} from "react-admin";
import { EnumField } from "../../../core/components/enum/EnumField";
import { DeleteButtonSecured } from "../../../core/security/components/DeleteButtonSecured";
import { EditButtonSecured } from "../../../core/security/components/EditButtonSecured";
import {Secured} from "../../../core/security/components/Secured";

const DOCTOR_LIST = gql(`query DoctorList(
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

const DELETE_DOCTOR = gql(`mutation DeleteDoctor($id: ID!) {
  deleteDoctor(id: $id) 
}`);

const DoctorListActions = () => {
  return (
    <TopToolbar>
      <FilterButton/>
      <Secured permission="Doctor.create">
        <CreateButton/>
      </Secured>
      <Secured permission="Doctor.export">
        <ExportButton/>
      </Secured>
    </TopToolbar>
  )
}

export const DoctorList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: DOCTOR_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [<TextInput source="specialty" />];

  return (
    <List<ItemType> queryOptions={queryOptions} filters={filters} actions={<DoctorListActions/>} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false} >
        <TextField source="id" sortable={false} />

        <TextField source="firstName" />
        <TextField source="lastName" />
        <EnumField source="specialty" enumTypeName="Specialty" enum={Specialty} sortable={false} />

        <EditButtonSecured />
        <DeleteButtonSecured
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
