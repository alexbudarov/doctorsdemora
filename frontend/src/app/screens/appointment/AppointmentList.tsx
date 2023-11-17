import { gql } from "@amplicode/gql";
import { Status } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, EditButton, List, NumberField, TextField, TextInput } from "react-admin";
import { LocalDateTimeField } from "../../../core/components/datetime/LocalDateTimeField";
import { LocalDateTimeInput } from "../../../core/components/datetime/LocalDateTimeInput";
import { EnumField } from "../../../core/components/enum/EnumField";
import { SingleReferenceField } from "../../../core/components/reference/SingleReferenceField";
import { getDoctorRecordRepresentation } from "../../../core/record-representation/getDoctorRecordRepresentation";
import { getPatientRecordRepresentation } from "../../../core/record-representation/getPatientRecordRepresentation";

const APPOINTMENT_LIST = gql(`query AppointmentList_AppointmentList(
  $filter: AppointmentFilterInput
  $sort: [AppointmentOrderByInput]
  $page: OffsetPageInput
) {
  appointmentList(
    filter: $filter
    sort: $sort
    page: $page
  ) {
    content {
      doctor {
        firstName
        id
        lastName
      }
      duration
      endTime
      id
      patient {
        firstName
        id
        lastName
      }
      startTime
      status
    }
    totalElements
  }
}`);

export const AppointmentList = () => {
  const queryOptions = {
    meta: {
      query: APPOINTMENT_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="doctorLastName" />,
    <TextInput source="patientLastName" />,
    <LocalDateTimeInput source="startTimeMin" />,
    <LocalDateTimeInput source="startTimeMax" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <SingleReferenceField
          source="doctor"
          recordRepresentation={getDoctorRecordRepresentation}
          sortable={false}
        />
        <NumberField source="duration" sortable={false} />
        <LocalDateTimeField source="endTime" sortable={false} />
        <SingleReferenceField
          source="patient"
          recordRepresentation={getPatientRecordRepresentation}
          sortable={false}
        />
        <LocalDateTimeField source="startTime" />
        <EnumField source="status" enumTypeName="Status" enum={Status} sortable={false} />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof APPOINTMENT_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["appointmentList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
