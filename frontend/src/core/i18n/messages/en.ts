import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...englishMessages,

  pages: {
    AppointmentRequest: "Appointment Request"
  },

  resources: {
    Appointment: {
      name: "Appointment |||| Appointments",

      fields: {
        doctor: {
          id: "Doctor"
        },

        duration: "Duration",
        endTime: "End Time",

        patient: {
          id: "Patient"
        },

        startTime: "Start Time",
        status: "Status"
      }
    },

    Patient: {
      name: "Patient |||| Patients",

      fields: {
        firstName: "First Name",
        lastName: "Last Name"
      }
    },

    Doctor: {
      name: "Doctor |||| Doctors",

      fields: {
        firstName: "First Name",
        lastName: "Last Name",
        specialty: "Specialty"
      }
    }
  },

  enums: {
    Status: {
      PENDING: "Pending",
      MISSED: "Missed",
      IN_PROGRESS: "In progress",
      CANCELLED: "Cancelled",
      FINISHED: "Finished"
    },

    Specialty: {
      GP: "Gp",
      ALLERGY_AND_IMMUNOLOGY: "Allergy and immunology",
      DERMATOLOGY: "Dermatology",
      OPHTHALMOLOGY: "Ophthalmology",
      NEUROLOGY: "Neurology",
      PSYCHIATRY: "Psychiatry"
    }
  },

  amplicode: {
    not_set: "Not set"
  }
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
