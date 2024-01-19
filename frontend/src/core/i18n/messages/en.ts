import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...englishMessages,

  resources: {
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
