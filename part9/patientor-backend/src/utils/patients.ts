import { NewPatientEntry, GenderType } from "../types";
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parsePatient = (
  name: string,
  ssn: string,
  dateOfBirth: string,
  occupation: string,
  gender: string
): NewPatientEntry | null => {
  if (
    isString(name) &&
    isString(ssn) &&
    isString(occupation) &&
    isString(gender)
  ) {
    const ppatient: NewPatientEntry = {
      name,
      ssn,
      dateOfBirth,
      occupation,
      gender: gender as GenderType,
    };
    return ppatient;
  }
  return null;
};
export default { parsePatient };
