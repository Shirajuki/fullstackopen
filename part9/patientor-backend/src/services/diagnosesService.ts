import diagnosesData from "../../data/diagnoses";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnosesData;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
