import { Resource, ResourceProps } from "react-admin";
import { ACL } from "../ACL";
import { getPermission } from "../getPermission";
import { useACL } from "../useACL";

export const ResourceSecured = (props: ResourceProps) => {
  const {
    enabled,
    create: canCreate,
    edit: canEdit,
    list: canViewList,
    show: canShow,
  } = useACL(props.name);

  return enabled ? (
    <Resource
      name={props.name}
      list={canViewList ? props.list : undefined}
      recordRepresentation={props.recordRepresentation}
      create={canCreate ? props.create : undefined}
      edit={canEdit ? props.edit : undefined}
      show={canShow ? props.show : undefined}
    />
  ) : null;
};

ResourceSecured.raName = Resource.raName;

ResourceSecured.registerResource = (
  { create, edit, icon, list, name, options, show }: ResourceProps,
  permissions: any
) => {
  const resourcePermission = {
    list: getPermission(ACL, permissions, `${name}.list`) !== `disabled`,
    create: getPermission(ACL, permissions, `${name}.create`) !== `disabled`,
    edit: getPermission(ACL, permissions, `${name}.edit`) !== `disabled`,
    show: getPermission(ACL, permissions, `${name}.show`) !== `disabled`,
  };

  return {
    name,
    options,
    hasList: list != null && permissions && resourcePermission?.list,
    hasCreate: create != null && permissions && resourcePermission?.create,
    hasEdit: edit != null && permissions && resourcePermission?.edit,
    hasShow: show != null && permissions && resourcePermission?.show,
    icon,
  };
};
