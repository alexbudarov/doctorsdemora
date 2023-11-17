/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type Appointment = {
  __typename?: "Appointment";
  doctor: Doctor;
  duration: Scalars["Int"];
  endTime?: Maybe<Scalars["LocalDateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  patient: Patient;
  startTime: Scalars["LocalDateTime"];
  status: Status;
};

export type AppointmentFilterInput = {
  doctorLastName?: InputMaybe<Scalars["String"]>;
  patientLastName?: InputMaybe<Scalars["String"]>;
  startTimeMax?: InputMaybe<Scalars["LocalDateTime"]>;
  startTimeMin?: InputMaybe<Scalars["LocalDateTime"]>;
};

export type AppointmentOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<AppointmentOrderByProperty>;
};

export enum AppointmentOrderByProperty {
  DoctorFirstName = "DOCTOR_FIRST_NAME",
  PatientFirstName = "PATIENT_FIRST_NAME",
  StartTime = "START_TIME",
}

export type AppointmentRequestInput = {
  doctorId: Scalars["ID"];
  durationMinutes: Scalars["Int"];
  patientId: Scalars["ID"];
  time: Scalars["LocalDateTime"];
};

export type AppointmentRequestResult = {
  __typename?: "AppointmentRequestResult";
  appointment?: Maybe<Appointment>;
  reserved: Scalars["Boolean"];
};

export type AppointmentResultPage = {
  __typename?: "AppointmentResultPage";
  content?: Maybe<Array<Maybe<Appointment>>>;
  totalElements: Scalars["Long"];
};

export type Doctor = {
  __typename?: "Doctor";
  firstName: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  specialty: Specialty;
};

export type DoctorFilterInput = {
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  specialty?: InputMaybe<Specialty>;
};

export type DoctorInput = {
  firstName: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  specialty: Specialty;
};

export type DoctorOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<DoctorOrderByProperty>;
};

export enum DoctorOrderByProperty {
  FirstName = "FIRST_NAME",
  LastName = "LAST_NAME",
}

export type DoctorResultPage = {
  __typename?: "DoctorResultPage";
  content?: Maybe<Array<Maybe<Doctor>>>;
  totalElements: Scalars["Long"];
};

export type FileUploadResponse = {
  __typename?: "FileUploadResponse";
  fileId: Scalars["String"];
  uploadUrl: Scalars["Url"];
};

export type Mutation = {
  __typename?: "Mutation";
  cancelAppointment?: Maybe<Scalars["Void"]>;
  deleteDoctor?: Maybe<Scalars["Void"]>;
  deletePatient?: Maybe<Scalars["Void"]>;
  requestAppointment: AppointmentRequestResult;
  updateDoctor: Doctor;
  updatePatient: Patient;
};

export type MutationCancelAppointmentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDoctorArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePatientArgs = {
  id: Scalars["ID"];
};

export type MutationRequestAppointmentArgs = {
  request: AppointmentRequestInput;
};

export type MutationUpdateDoctorArgs = {
  input: DoctorInput;
};

export type MutationUpdatePatientArgs = {
  input: PatientInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type Patient = {
  __typename?: "Patient";
  firstName: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
  lastName: Scalars["String"];
};

export type PatientFilterInput = {
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
};

export type PatientInput = {
  firstName: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
};

export type PatientOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<PatientOrderByProperty>;
};

export enum PatientOrderByProperty {
  FirstName = "FIRST_NAME",
  LastName = "LAST_NAME",
}

export type PatientResultPage = {
  __typename?: "PatientResultPage";
  content?: Maybe<Array<Maybe<Patient>>>;
  totalElements: Scalars["Long"];
};

export type Query = {
  __typename?: "Query";
  appointment: Appointment;
  appointmentList: AppointmentResultPage;
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  doctor: Doctor;
  doctorList: DoctorResultPage;
  patient: Patient;
  patientList: PatientResultPage;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryAppointmentArgs = {
  id: Scalars["ID"];
};

export type QueryAppointmentListArgs = {
  filter?: InputMaybe<AppointmentFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<AppointmentOrderByInput>>>;
};

export type QueryDoctorArgs = {
  id: Scalars["ID"];
};

export type QueryDoctorListArgs = {
  filter?: InputMaybe<DoctorFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<DoctorOrderByInput>>>;
};

export type QueryPatientArgs = {
  id: Scalars["ID"];
};

export type QueryPatientListArgs = {
  filter?: InputMaybe<PatientFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<PatientOrderByInput>>>;
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export enum Specialty {
  AllergyAndImmunology = "ALLERGY_AND_IMMUNOLOGY",
  Dermatology = "DERMATOLOGY",
  Gp = "GP",
  Neurology = "NEUROLOGY",
  Ophthalmology = "OPHTHALMOLOGY",
  Psychiatry = "PSYCHIATRY",
}

export enum Status {
  Cancelled = "CANCELLED",
  Finished = "FINISHED",
  InProgress = "IN_PROGRESS",
  Missed = "MISSED",
  Pending = "PENDING",
}

export type UserInfo = {
  __typename?: "UserInfo";
  avatar?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateDoctorMutationVariables = Exact<{
  input: DoctorInput;
}>;

export type UpdateDoctorMutation = {
  __typename?: "Mutation";
  updateDoctor: {
    __typename?: "Doctor";
    firstName: string;
    id?: string | null;
    lastName: string;
    specialty: Specialty;
  };
};

export type DoctorQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DoctorQuery = {
  __typename?: "Query";
  doctor: {
    __typename?: "Doctor";
    firstName: string;
    id?: string | null;
    lastName: string;
    specialty: Specialty;
  };
};

export type DoctorListQueryVariables = Exact<{
  filter?: InputMaybe<DoctorFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<DoctorOrderByInput>> | InputMaybe<DoctorOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type DoctorListQuery = {
  __typename?: "Query";
  doctorList: {
    __typename?: "DoctorResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Doctor";
      firstName: string;
      id?: string | null;
      lastName: string;
      specialty: Specialty;
    } | null> | null;
  };
};

export type DeleteDoctorMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteDoctorMutation = {
  __typename?: "Mutation";
  deleteDoctor?: any | null;
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserInfoQuery = {
  __typename?: "Query";
  userInfo?: {
    __typename?: "UserInfo";
    id: string;
    fullName?: string | null;
    avatar?: string | null;
  } | null;
};

export type CheckAuthenticatedQueryVariables = Exact<{ [key: string]: never }>;

export type CheckAuthenticatedQuery = {
  __typename?: "Query";
  checkAuthenticated?: any | null;
};

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type UserPermissionsQuery = {
  __typename?: "Query";
  userPermissions?: Array<string | null> | null;
};

export const UpdateDoctorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateDoctor" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DoctorInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateDoctor" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "specialty" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateDoctorMutation,
  UpdateDoctorMutationVariables
>;
export const DoctorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Doctor" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "doctor" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "specialty" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DoctorQuery, DoctorQueryVariables>;
export const DoctorListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "DoctorList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DoctorFilterInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DoctorOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "doctorList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "specialty" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DoctorListQuery, DoctorListQueryVariables>;
export const DeleteDoctorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteDoctor" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteDoctor" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDoctorMutation,
  DeleteDoctorMutationVariables
>;
export const UserInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userInfo" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userInfo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
export const CheckAuthenticatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "checkAuthenticated" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "checkAuthenticated" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CheckAuthenticatedQuery,
  CheckAuthenticatedQueryVariables
>;
export const UserPermissionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userPermissions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "userPermissions" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserPermissionsQuery,
  UserPermissionsQueryVariables
>;
