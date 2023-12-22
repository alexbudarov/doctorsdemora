import { useACL } from "../useACL";

export type RouteSecuredProps = React.ComponentProps<any> & {
  name: string;
};

export const RouteSecured = ({ children, name }: RouteSecuredProps) => {
  const { enabled } = useACL(name);
  return enabled ? <>{children}</> : null;
};
