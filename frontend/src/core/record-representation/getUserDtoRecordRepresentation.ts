import { UserDto } from "../../gql/graphql";

export function getUserDtoRecordRepresentation(entityInstance?: Partial<UserDto> | null): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
