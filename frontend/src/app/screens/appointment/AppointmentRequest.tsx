import {Alert, Typography} from "@mui/material";
import {
  AutocompleteInput,
  DateTimeInput,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  Title,
  useNotify
} from "react-admin";
import {getDoctorRecordRepresentation} from "../../../core/record-representation/getDoctorRecordRepresentation";
import {getPatientRecordRepresentation} from "../../../core/record-representation/getPatientRecordRepresentation";
import dayjs from "dayjs";
import {gql} from "@amplicode/gql";
import {useMutation} from "@apollo/client";
import {LOCAL_DATE_TIME_FORMAT} from "../../../dataProvider/dataProviderFormats";
import {useCallback, useState} from "react";

const REQUEST_APPOINTMENT_APPOINTMENT_REQUEST = gql(`
mutation RequestAppointment_AppointmentRequest(
    $doctorId: ID!,
    $durationMinutes: Int!,
    $patientId: ID!,
    $time: LocalDateTime!
) {
    requestAppointment(request: {
        doctorId: $doctorId,
        durationMinutes: $durationMinutes,
        patientId: $patientId,
        time: $time
    }) {
        appointment {
            id
        }
        reserved
    }
}
`);

export function AppointmentRequest() {
  const [runRequestAppointment] = useMutation(REQUEST_APPOINTMENT_APPOINTMENT_REQUEST);

  const [success, setSuccess] = useState(false);
  const [unsuccess, setUnsuccess] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string>();

  const onFormSubmit = useCallback(function onFormSubmit(fields: Record<string, any>) {
    runRequestAppointment({
      variables: {
        doctorId: fields.doctor,
        patientId: fields.patient,
        time: dayjs(fields.time).format(LOCAL_DATE_TIME_FORMAT),
        durationMinutes: fields.durationMinutes
      }
    }).then(result => {
      const appointmentResult = result.data?.requestAppointment;
      if (appointmentResult?.reserved) {
        const appointmentId = appointmentResult?.appointment?.id || '';
        setAppointmentId(appointmentId);
        setUnsuccess(false);
        setSuccess(true);
      } else {
        setAppointmentId('');
        setSuccess(false);
        setUnsuccess(true);
      }
    });
  }, [runRequestAppointment, setAppointmentId, setUnsuccess, setSuccess]);

  return (
    <div>
      <Title title="pages.AppointmentRequest"/>
      <Typography variant="h4" gutterBottom component="h4">
        Request an appointment to the doctor
      </Typography>
      <SimpleForm onSubmit={onFormSubmit}
                  defaultValues={{durationMinutes: 15}}
      >
        <ReferenceInput source="patient" reference="Patient">
          <AutocompleteInput label="Choose patient"
                             optionText={getPatientRecordRepresentation}
                             validate={required()}
          />
        </ReferenceInput>
        <ReferenceInput source="doctor" reference="Doctor">
          <AutocompleteInput label="Choose doctor"
                             optionText={getDoctorRecordRepresentation}
                             validate={required()}
          />
        </ReferenceInput>
        <DateTimeInput source="time"
                       label="Choose appointment date & time"
                       validate={[required(), validateTomorrow]}
        />
        <NumberInput source="durationMinutes"
                     step={5}
                     min={5}
                     max={60}
                     label="Enter duration (minutes)"
                     validate={required()}
        />
      </SimpleForm>
      {success && <Alert severity="success">
        Appointment '{appointmentId}' reserved successfully
      </Alert>}
      {unsuccess && <Alert severity="warning">
        Could not reserve an appointment
      </Alert>}
    </div>
  );
}

const validateTomorrow = (value) => {
  const dateValue = dayjs(value);
  const tomorrow = dayjs().startOf('day').add(1, 'day');
  console.log('dv ' + dateValue.toISOString());
  if (dateValue.isBefore(tomorrow)) {
    return 'Must be tomorrow or later';
  }
  return undefined;
};
