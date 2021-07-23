import patientsData from "../../data/patients";
import { Patient, PublicPatient } from "../types";

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getPublicEntries,
  addEntry,
};
