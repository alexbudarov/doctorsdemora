import { WebAsset } from "@mui/icons-material";
import { Menu } from "react-admin";
import { MenuItemSecured } from "../../core/security/components/MenuItemSecured";
import { MenuResourceItemSecured } from "../../core/security/components/MenuResourceItemSecured";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <MenuResourceItemSecured name="Doctor" />
      <MenuResourceItemSecured name="Patient" />
      <MenuResourceItemSecured name="Appointment" />
      <MenuItemSecured
        name="AppointmentRequest"
        to="appointment-req"
        primaryText="pages.AppointmentRequest"
        leftIcon={<WebAsset />}
      />
    </Menu>
  );
};
