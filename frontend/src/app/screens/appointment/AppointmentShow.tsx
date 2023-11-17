import { gql } from "@amplicode/gql";
import { Status } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { NumberField, Show, SimpleShowLayout, TextField } from "react-admin";
import { LocalDateTimeField } from "../../../core/components/datetime/LocalDateTimeField";
import { EnumField } from "../../../core/components/enum/EnumField";
import { SingleReferenceField } from "../../../core/components/reference/SingleReferenceField";
import { getDoctorRecordRepresentation } from "../../../core/record-representation/getDoctorRecordRepresentation";
import { getPatientRecordRepresentation } from "../../../core/record-representation/getPatientRecordRepresentation";

const APPOINTMENT = gql(`query Appointment($id: ID!) {
  appointment(id: $id) {
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
}`);

export const AppointmentShow = () => {
  const queryOptions = {
    meta: {
      query: APPOINTMENT,
      resultDataPath: null,
    },
  };

  return (
    <Show<ItemType> queryOptions={queryOptions}>
      <SimpleShowLayout>
        <TextField source="id" />

        <SingleReferenceField
          source="doctor"
          recordRepresentation={getDoctorRecordRepresentation}
        />
        <NumberField source="duration" />
        <LocalDateTimeField source="endTime" />
        <SingleReferenceField
          source="patient"
          recordRepresentation={getPatientRecordRepresentation}
        />
        <LocalDateTimeField source="startTime" />
        <EnumField source="status" enumTypeName="Status" enum={Status} />
      </SimpleShowLayout>
    </Show>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof APPOINTMENT>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["appointment"], undefined>;
