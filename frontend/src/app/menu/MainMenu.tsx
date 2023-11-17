import { Menu } from "react-admin";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="Doctor" />
      <Menu.ResourceItem name="Patient" />
      <Menu.ResourceItem name="Appointment" />
    </Menu>
  );
};
