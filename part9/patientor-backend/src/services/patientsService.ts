import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, PublicPatient, NewPatientEntry, Entry } from "../types";

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
const getPublicEntryById = (id: string): Patient | null => {
  const patient: Patient | undefined = patients.find(
    (p: Patient) => p.id === id
  );
  if (patient) return { ...patient, entries: patient.entries || [] };
  return null;
};
const addEntry = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addPatientEntry = (patientId: string, entry: Entry): Entry => {
  const newPatientEntry: Entry = {
    ...entry,
    id: uuid(),
  };
  const patient = patients.find((p) => p.id === patientId);
  if (patient) {
    patients.splice(patients.indexOf(patient), 1);
    patients.push({
      ...patient,
      entries: [...patient.entries, newPatientEntry],
    });
  }
  return newPatientEntry;
};

export default {
  getEntries,
  getPublicEntries,
  getPublicEntryById,
  addEntry,
  addPatientEntry,
};
