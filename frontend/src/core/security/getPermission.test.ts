import { AclType } from "./ACL";
import { getPermission, Permission } from "./getPermission";

const ACL: AclType = {
  ROLE_VETERINARIAN: {
    PetDTO: {
      delete: false,
      edit: false,
      list: true,
      show: true,
      enabled: true,
    },
    OwnerDTO: {
      enabled: false,
    },
    UserDTO: {
      enabled: false,
    },
  },
  ROLE_ADMIN: {
    PetDTO: {
      create: true,
      delete: true,
      edit: true,
      show: true,
      list: true,
      enabled: true,
    },
    OwnerDTO: {
      create: true,
      delete: true,
      edit: true,
      show: true,
      list: true,
      enabled: true,
      blockOwner: true,
    },
    BlankScreen: {
      enabled: true,
    },
    UserDTO: {
      enabled: false,
    },
  },
};

describe("getPermission", () => {
  it('should return "unknown" if resource not exist in acl roles', () => {
    const perm: Permission = getPermission(ACL, ["ROLE_ADMIN"], "UnknownDTO.delete");
    expect(perm).toEqual("unknown");
  });

  it('should return "enabled" if action is allowed for resource', () => {
    const perm: Permission = getPermission(ACL, ["ROLE_ADMIN"], "PetDTO.delete");
    expect(perm).toEqual("enabled");
  });

  it('should return "disabled" if action is disabled for resource', () => {
    const perm: Permission = getPermission(ACL, ["ROLE_VETERINARIAN"], "PetDTO.delete");
    expect(perm).toEqual("disabled");
  });

  it('should return "disabled" if resource not exist in user roles, but exist in acl roles', () => {
    const perm: Permission = getPermission(ACL, ["ROLE_VETERINARIAN"], "BlankScreen.enabled");
    expect(perm).toEqual("disabled");
  });

  it('should return "enabled" if action is allowed at least in one role', () => {
    const perm: Permission = getPermission(
      ACL,
      ["ROLE_ADMIN", "ROLE_VETERINARIAN"],
      "OwnerDTO.enabled"
    );
    expect(perm).toEqual("enabled");
  });

  it('should return "disabled" if action is disabled in all user roles', () => {
    const perm: Permission = getPermission(
      ACL,
      ["ROLE_ADMIN", "ROLE_VETERINARIAN"],
      "UserDTO.enabled"
    );
    expect(perm).toEqual("disabled");
  });
});
