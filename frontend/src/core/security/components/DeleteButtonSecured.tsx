import { DeleteButton, DeleteButtonProps, useRecordContext } from "react-admin";
import { useACL } from "../useACL";

export const DeleteButtonSecured = (props: DeleteButtonProps) => {
  const { __typename } = useRecordContext();
  const { delete: canDelete } = useACL(__typename);
  return canDelete ? <DeleteButton {...props} /> : null;
};
