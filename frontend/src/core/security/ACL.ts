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
    AuthorityDto: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    },
    UserDto: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true,
      changePassword: true
    }
  },
  "ROLE_USER": {
    AuthorityDto: {
      enabled: false,
      list: false,
      create: false,
      edit: false,
      show: false,
      delete: false
    },
    UserDto: {
      enabled: true,
      list: true,
      create: false,
      edit: false,
      show: false,
      delete: false,
      changePassword: false
    }
  }
};
