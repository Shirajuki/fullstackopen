import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, PublicPatient, NewPatientEntry } from "../types";

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPublicEntries = (): Array<PublicPatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }: PublicPatient) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      };
    }
  );
};
const addEntry = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getPublicEntries,
  addEntry,
};
