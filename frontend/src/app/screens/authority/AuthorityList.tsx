import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import { Datagrid, List, TextField, TextInput } from "react-admin";
import { DeleteButtonSecured } from "../../../core/security/components/DeleteButtonSecured";
import { EditButtonSecured } from "../../../core/security/components/EditButtonSecured";

const AUTHORITY_LIST = gql(`query AuthorityList(
  $filter: AuthorityFilterInput
  $sort: [AuthorityOrderByInput]
  $page: OffsetPageInput
) {
  authorityList(
    filter: $filter
    sort: $sort
    page: $page
  ) {
    content {
      description
      id
      name
    }
    totalElements
  }
}`);

const DELETE_AUTHORITY = gql(`mutation DeleteAuthority($id: ID!) {
  deleteAuthority(id: $id) 
}`);

export const AuthorityList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: AUTHORITY_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [<TextInput source="name" />, <TextInput source="description" />];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="description" sortable={false} />

        <EditButtonSecured />
        <DeleteButtonSecured
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_AUTHORITY } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof AUTHORITY_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["authorityList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
