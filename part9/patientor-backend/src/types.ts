// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};
export enum GenderType {
  OTHER = "other",
  MALE = "male",
  FEMALE = "female",
}
export interface Entry {}
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
