import { DevSupport } from "@amplicode/ide-toolbox";
import { AdminContext, AdminUI, Loading } from "react-admin";
import { useAuthProvider } from "../authProvider/useAuthProvider";
import { getDoctorRecordRepresentation } from "../core/record-representation/getDoctorRecordRepresentation";
import { getPatientRecordRepresentation } from "../core/record-representation/getPatientRecordRepresentation";
import { ResourceSecured } from "../core/security/components/ResourceSecured";
import { dataProvider } from "../dataProvider/graphqlDataProvider";
import { ComponentPreviews, useInitial } from "../dev";
import { i18nProvider } from "../i18nProvider";
import { AdminLayout } from "./AdminLayout";
import { DoctorCreate } from "./screens/doctor/DoctorCreate";
import { DoctorEdit } from "./screens/doctor/DoctorEdit";
import { DoctorList } from "./screens/doctor/DoctorList";
import { DoctorShow } from "./screens/doctor/DoctorShow";
import { PatientCreate } from "./screens/patient/PatientCreate";
import { PatientEdit } from "./screens/patient/PatientEdit";
import { PatientList } from "./screens/patient/PatientList";
import { PatientShow } from "./screens/patient/PatientShow";
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
            show={DoctorShow}
          />
          <ResourceSecured
            name="Patient"
            list={PatientList}
            recordRepresentation={getPatientRecordRepresentation}
            create={PatientCreate}
            edit={PatientEdit}
            show={PatientShow}
          />
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
