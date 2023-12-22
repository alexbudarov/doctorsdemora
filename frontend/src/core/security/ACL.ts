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
    "Patient": {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    },
    "Doctor": {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    }
  },
  "ROLE_USER": {
    "Patient": {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: false
    },
    "Doctor": {
      enabled: true,
      list: true,
      show: true
    }
  }
};
