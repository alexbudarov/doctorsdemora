import { AuthorityDto } from "../../gql/graphql";

export function getAuthorityDtoRecordRepresentation(
  entityInstance?: Partial<AuthorityDto> | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.name != null) {
    return String(entityInstance.name);
  }
  if (entityInstance.description != null) {
    return String(entityInstance.description);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
