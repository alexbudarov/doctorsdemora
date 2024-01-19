import {gql} from "@amplicode/gql";
import {Status} from "@amplicode/gql/graphql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {ListProps} from "ra-ui-materialui";
import {Button, Datagrid, Link, List, TextField, TextInput, useNotify, useRecordContext, useRefresh} from "react-admin";
import {LocalDateTimeField} from "../../../core/components/datetime/LocalDateTimeField";
import {LocalDateTimeInput} from "../../../core/components/datetime/LocalDateTimeInput";
import {EnumField} from "../../../core/components/enum/EnumField";
import {SingleReferenceField} from "../../../core/components/reference/SingleReferenceField";
import {getDoctorRecordRepresentation} from "../../../core/record-representation/getDoctorRecordRepresentation";
import {getPatientRecordRepresentation} from "../../../core/record-representation/getPatientRecordRepresentation";
import {useMutation} from "@apollo/client";

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

const CANCEL_APPOINTMENT_CANCEL_BUTTON = gql(`
mutation CancelAppointment_CancelButton($appointmentId: ID!) {
    cancelAppointment(id: $appointmentId)
}
`);

const CancelButton = () => {
  const record = useRecordContext();
  const refresh = useRefresh();
  const notify = useNotify();

  const [runCancelAppointment] = useMutation(CANCEL_APPOINTMENT_CANCEL_BUTTON, {
    variables: {
      appointmentId: record.id as string
    }
  });

  function onButtonClick(event) {
    event.stopPropagation();

    runCancelAppointment()
      .then(answer => {
        notify(`Cancelled`, {type: "success"});
        refresh();
      })
      .catch (error => {
        notify(`Cancellation error`, {type: "error"});
      })
  }

  return <>
    <Button
      label="Cancel"
      component={Link}
      
      onClick={onButtonClick}
    />
  </>
};

export const AppointmentList = (props: Omit<ListProps, "children">) => {
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
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters} {...props}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <SingleReferenceField
          source="doctor"
          recordRepresentation={getDoctorRecordRepresentation}
          sortable={false}
        />
        <SingleReferenceField
          source="patient"
          recordRepresentation={getPatientRecordRepresentation}
          sortable={false}
        />
        <LocalDateTimeField source="startTime" />
        <LocalDateTimeField source="endTime" sortable={false} />
        <EnumField source="status" enumTypeName="Status" enum={Status} sortable={false} />
        <CancelButton />
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
