import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {useCallback, useMemo} from "react";
import {
  BooleanInput,
  Edit,
  EditProps,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {useQuery} from "@apollo/client";

const USER = gql(`query User($id: ID!) {
  user(id: $id) {
    authorityIds
    email
    enabled
    fullName
    id
    username
  }
}`);
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

const AUTHORITY_LIST_USER_EDIT = gql(`
query AuthorityList_UserEdit {
    authorityList {
        content {
            description
            id
            name
        }
        totalElements
    }
}
`);

type AdvancedEditProps = Omit<EditProps, "id" | "queryOptions" | "mutationOptions"> & {
  id?: string;
};

export const UserEdit = (props: AdvancedEditProps) => {
  const queryOptions = {
    meta: {
      query: USER,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const {
    data: authorityListQueryResult
  } = useQuery(AUTHORITY_LIST_USER_EDIT);

  const authorityList = useMemo(
    () => authorityListQueryResult?.authorityList?.content || [],
    [authorityListQueryResult?.authorityList]
  )

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_USER } };
        const options = { returnPromise: true };

        await update("UserDto", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "UserDto");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions} {...props}>
      <SimpleForm onSubmit={save}>
        <TextInput source="username" />
        <TextInput source="fullName" />
        <TextInput source="email" />
        <BooleanInput source="enabled" />
        <SelectArrayInput
          source="authorityIds"
          choices={authorityList}
          optionText="name"
        />
        {/*<ReferenceArrayInput source="authorityIds" reference="AuthorityDto">
          <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>*/}
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof USER>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["user"], undefined>;
