export type AclType = Record<string, AclRoleResource>;
export type AclRoleResource = Record<string, ResourcePermission>;

type ResourcePermission = {
  enabled?: boolean;
  list?: boolean;
  create?: boolean;
  edit?: boolean;
  show?: boolean;
  delete?: boolean;
} & Record<string, boolean>; // type extended for custom permissions

export const ACL: AclType = {
  "ROLE_ADMIN": {
    "Doctor": {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true,
      viewSpecialty: true
    }
  },
  "ROLE_USER": {
    "Doctor": {
      enabled: true,
      list: true,
      create: false,
      edit: true,
      show: true,
      delete: false,
      viewSpecialty: false
    }
  }
};
