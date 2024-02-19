import { DevSupport } from "@amplicode/ide-toolbox";
import { AdminContext, AdminUI, CustomRoutes, Loading } from "react-admin";
import { Route } from "react-router";
import { useAuthProvider } from "../authProvider/useAuthProvider";
import { getAppointmentRecordRepresentation } from "../core/record-representation/getAppointmentRecordRepresentation";
import { getAuthorityDtoRecordRepresentation } from "../core/record-representation/getAuthorityDtoRecordRepresentation";
import { getDoctorRecordRepresentation } from "../core/record-representation/getDoctorRecordRepresentation";
import { getPatientRecordRepresentation } from "../core/record-representation/getPatientRecordRepresentation";
import { getUserDtoRecordRepresentation } from "../core/record-representation/getUserDtoRecordRepresentation";
import { ResourceSecured } from "../core/security/components/ResourceSecured";
import { RouteSecured } from "../core/security/components/RouteSecured";
import { dataProvider } from "../dataProvider/graphqlDataProvider";
import { ComponentPreviews, useInitial } from "../dev";
import { i18nProvider } from "../i18nProvider";
import { AdminLayout } from "./AdminLayout";
import { AppointmentList } from "./screens/appointment/AppointmentList";
import { AuthorityCreate } from "./screens/authority/AuthorityCreate";
import { AuthorityEdit } from "./screens/authority/AuthorityEdit";
import { AuthorityList } from "./screens/authority/AuthorityList";
import { DoctorCreate } from "./screens/doctor/DoctorCreate";
import { DoctorEdit } from "./screens/doctor/DoctorEdit";
import { DoctorList } from "./screens/doctor/DoctorList";
import { PatientCreate } from "./screens/patient/PatientCreate";
import { PatientEdit } from "./screens/patient/PatientEdit";
import { PatientList } from "./screens/patient/PatientList";
import { PasswordChange } from "./screens/user/PasswordChange";
import { UserCreate } from "./screens/user/UserCreate";
import { UserEdit } from "./screens/user/UserEdit";
import { UserList } from "./screens/user/UserList";
import { activeAppTheme } from "./themes/appThemeConfig";
import { getStoredThemeMode } from "./themes/getStoredThemeMode";

const themeMode = getStoredThemeMode();

export const App = () => {
  const { authProvider, loading } = useAuthProvider();

  if (loading) {
    return (
      <Loading
        loadingPrimary="Loading"
        loadingSecondary="The page is loading, just a moment please"
      />
    );
  }

  return (
    <AdminContext
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      lightTheme={activeAppTheme.light}
      darkTheme={activeAppTheme.dark}
      defaultTheme={themeMode}
    >
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <AdminUI layout={AdminLayout} requireAuth={true}>
          <ResourceSecured
            name="Doctor"
            list={DoctorList}
            recordRepresentation={getDoctorRecordRepresentation}
            create={DoctorCreate}
            edit={DoctorEdit}
          />
          <ResourceSecured
            name="Patient"
            list={PatientList}
            recordRepresentation={getPatientRecordRepresentation}
            create={PatientCreate}
            edit={PatientEdit}
          />
          <ResourceSecured
            name="Appointment"
            list={AppointmentList}
            recordRepresentation={getAppointmentRecordRepresentation}
          />
          <ResourceSecured
            name="AuthorityDto"
            list={AuthorityList}
            recordRepresentation={getAuthorityDtoRecordRepresentation}
            create={AuthorityCreate}
            edit={AuthorityEdit}
          />
          <ResourceSecured
            name="UserDto"
            list={UserList}
            recordRepresentation={getUserDtoRecordRepresentation}
            create={UserCreate}
            edit={UserEdit}
          />
          <CustomRoutes>
            <Route
              path="/pass-change/:userId"
              element={
                <RouteSecured name="PasswordChange">
                  <PasswordChange />
                </RouteSecured>
              }
            />
          </CustomRoutes>
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
