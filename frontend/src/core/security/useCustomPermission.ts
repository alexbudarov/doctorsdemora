import { usePermissions } from "react-admin";
import { ACL } from "./ACL";
import { getPermission } from "./getPermission";

export const useCustomPermission = (permission: string) => {
  const { permissions: roles } = usePermissions();
  return getPermission(ACL, roles, permission) !== "disabled";
};
