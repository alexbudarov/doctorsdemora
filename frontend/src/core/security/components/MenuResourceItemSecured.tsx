import { Menu } from "react-admin";
import { useACL } from "../useACL";

export type MenuResourceItemSecuredProps = {
  name: string;
};

export const MenuResourceItemSecured = ({ name }: MenuResourceItemSecuredProps) => {
  const { enabled } = useACL(name);
  return enabled ? <Menu.ResourceItem name={name} /> : null;
};
