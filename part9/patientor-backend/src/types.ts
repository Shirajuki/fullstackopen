// Diagnosis
export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

// Entry
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

// Patient
export enum GenderType {
  OTHER = "other",
  MALE = "male",
  FEMALE = "female",
}
export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderType;
  occupation: string;
  entries: Entry[];
};
export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type NewPatientEntry = Omit<Patient, "id">;
