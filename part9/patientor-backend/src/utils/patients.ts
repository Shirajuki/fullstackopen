import {
  NewPatientEntry,
  GenderType,
  Entry,
  Diagnose,
  HealthCheckRating,
  HealthCheckEntry,
  OccupationalHealthCareEntry,
  HospitalEntry,
} from "../types";
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
      entries: [],
    };
    return ppatient;
  }
  return null;
};

const parseEntry = (
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes: Array<Diagnose["code"]>,
  healthCheckRating: HealthCheckRating,
  sickLeave: {
    startDate: string;
    endDate: string;
  },
  discharge: {
    date: string;
    criteria: string;
  }
): Entry | null => {
  if (isString(description) && isString(date) && isString(specialist)) {
    for (const code of diagnosisCodes) if (!isString(code)) return null;
    if (healthCheckRating) {
      if (!Object.values(HealthCheckRating).includes(healthCheckRating))
        return null;
      const entry: HealthCheckEntry = {
        id: "0",
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes || [],
        healthCheckRating,
      };
      return entry;
    } else if (sickLeave) {
      if (!isString(sickLeave.endDate) && !isString(sickLeave.startDate))
        return null;
      const entry: OccupationalHealthCareEntry = {
        id: "0",
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes || [],
        sickLeave,
      };
      return entry;
    } else if (discharge) {
      if (!isString(discharge.date) && !isString(discharge.criteria))
        return null;
      const entry: HospitalEntry = {
        id: "0",
        type: "Hospital",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes || [],
        discharge,
      };
      return entry;
    }
  }
  return null;
};
export default { parsePatient, parseEntry };
