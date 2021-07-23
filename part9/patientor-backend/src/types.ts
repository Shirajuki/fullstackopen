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
export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderType;
  occupation: string;
};
export type PublicPatient = Omit<Patient, "ssn">;
export type NewPatientEntry = Omit<Patient, "id">;
