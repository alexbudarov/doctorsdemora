import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {ListProps} from "ra-ui-materialui";
import {
  BooleanField,
  BooleanInput,
  CreateButton,
  Datagrid, FilterButton,
  List,
  TextField,
  TextInput,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import {DeleteButtonSecured} from "../../../core/security/components/DeleteButtonSecured";
import {EditButtonSecured} from "../../../core/security/components/EditButtonSecured";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";
import {useCallback} from "react";
import {Secured} from "../../../core/security/components/Secured";
import {useACL} from "../../../core/security/useACL";

const USER_LIST = gql(`query UserList(
  $filter: UserFilterInput
  $sort: [UserOrderByInput]
  $page: OffsetPageInput
) {
  userList(
    filter: $filter
    sort: $sort
    page: $page
  ) {
    content {
      authorityIds
      authorityNames
      email
      enabled
      fullName
      id
      username
    }
    totalElements
  }
}`);

const DELETE_USER = gql(`mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) 
}`);

function ChangePasswordButton() {
  const record = useRecordContext();
  const navigate = useNavigate();

  const onButtonClick = useCallback(event => {
    event.stopPropagation();
    navigate(`/pass-change/${record.id}`);
  }, [navigate, record.id]);

  return <>
    <Button
      variant="text"
      onClick={onButtonClick}
    >
      Change Password
    </Button>
  </>
}

function MyActions() {
  const { create } = useACL("UserDto");

  return (
    <TopToolbar>
      <FilterButton/>
      {create && <CreateButton/>}
    </TopToolbar>
    )
}

export const UserList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: USER_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="username" />,
    <TextInput source="fullName" />,
    <TextInput source="email" />,
    <BooleanInput source="enabled" options={{}} />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters}
                    actions={<MyActions/>}
                    {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="username" />
        <TextField source="fullName" />
        <TextField source="email" sortable={false} />
        <BooleanField source="enabled" sortable={false} />
        <TextField label="Authorities" source="authorityNames" sortable={false} />

        <Secured permission="UserDto.changePassword">
          <ChangePasswordButton/>
        </Secured>
        <EditButtonSecured />
        <DeleteButtonSecured
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_USER } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof USER_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["userList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
