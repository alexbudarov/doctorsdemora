import { EditButtonProps } from "ra-ui-materialui/src/button/EditButton";
import { EditButton, useRecordContext } from "react-admin";
import { useACL } from "../useACL";

export const EditButtonSecured = (props: EditButtonProps) => {
  const { __typename } = useRecordContext();
  const { edit: canEdit } = useACL(__typename);
  return canEdit ? <EditButton {...props} /> : null;
};
