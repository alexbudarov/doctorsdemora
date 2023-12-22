import get from "lodash.get";
import { AclType } from "./ACL";

export type Permission = "unknown" | "enabled" | "disabled";

export function getPermission(
  acl: AclType,
  userRoles: string[] | null,
  permission: string
): Permission {
  if (userRoles == null) return "unknown";

  const resource: string = permission.split(".")[0];
  // check that resource exist at least in one role in ACL
  const isResourceInAcl: boolean = Object.values(acl).some((rolePerms: Record<string, unknown>) =>
    isResourceInRole(rolePerms, resource)
  );

  if (!isResourceInAcl) {
    return "unknown";
  }

  // if at least one user role has enabled permission - "enabled" will be returned
  const enabled: boolean = Object.keys(acl)
    .filter((aclRole: string) => userRoles.includes(aclRole))
    .some((aclRole: string) => get(acl[aclRole], permission));

  return enabled ? "enabled" : "disabled";
}

function isResourceInRole(rolePerms: Record<string, unknown>, resource: string): boolean {
  return Object.keys(rolePerms).includes(resource);
}
