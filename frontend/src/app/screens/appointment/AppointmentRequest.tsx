import { Typography } from "@mui/material";
import {
  AutocompleteInput,
  DateTimeInput, NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  Title
} from "react-admin";
import {getDoctorRecordRepresentation} from "../../../core/record-representation/getDoctorRecordRepresentation";
import {getPatientRecordRepresentation} from "../../../core/record-representation/getPatientRecordRepresentation";

export function AppointmentRequest() {

  function onFormSubmit() {
    // todo
  }

  return (
    <div>
      <Title title="pages.AppointmentRequest" />
      <Typography variant="h4" gutterBottom component="h4">
        Request an appointment to the doctor
      </Typography>
      <SimpleForm onSubmit={onFormSubmit}>
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
                       validate={required()}
        />
        <NumberInput source="durationMinutes"
                     step={5}
                     min={5}
                     max={60}
                     label="Enter duration (minutes)"
                     validate={required()}
        />
      </SimpleForm>

    </div>
  );
}
