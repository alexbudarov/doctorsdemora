import { usePermissions } from "react-admin";
import { ACL } from "./ACL";
import { getPermission } from "./getPermission";

export interface ResourcePermission {
  enabled: boolean;
  list: boolean;
  create: boolean;
  edit: boolean;
  show: boolean;
  delete: boolean;
}

export function useACL(resourceName: string): ResourcePermission {
  const { permissions: roles } = usePermissions();

  return {
    enabled: getPermission(ACL, roles, `${resourceName}.enabled`) !== `disabled`,
    list: getPermission(ACL, roles, `${resourceName}.list`) !== `disabled`,
    create: getPermission(ACL, roles, `${resourceName}.create`) !== `disabled`,
    edit: getPermission(ACL, roles, `${resourceName}.edit`) !== `disabled`,
    show: getPermission(ACL, roles, `${resourceName}.show`) !== `disabled`,
    delete: getPermission(ACL, roles, `${resourceName}.delete`) !== `disabled`,
  };
}
