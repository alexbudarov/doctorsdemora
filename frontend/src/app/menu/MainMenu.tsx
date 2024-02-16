import { Menu } from "react-admin";
import { MenuResourceItemSecured } from "../../core/security/components/MenuResourceItemSecured";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <MenuResourceItemSecured name="Doctor" />
      <MenuResourceItemSecured name="Patient" />
      <MenuResourceItemSecured name="Appointment" />
      <MenuResourceItemSecured name="AuthorityDto" />
      <MenuResourceItemSecured name="UserDto" />
    </Menu>
  );
};
