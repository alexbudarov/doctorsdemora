import { ComponentProps } from "react";
import { useCustomPermission } from "../useCustomPermission";

export type SecuredProps = ComponentProps<any> & {
  permission: string;
};

export const Secured = ({ children, permission }: SecuredProps): JSX.Element | null => {
  const allowed: boolean = useCustomPermission(permission);
  return allowed ? children : null;
};
