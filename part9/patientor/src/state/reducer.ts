import { State } from "./state";
import { Patient, Diagnosis, AddEntryType } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: AddEntryType;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      const patient = Object.values(state.patients).find(
        (p) => p.id === action.payload.id
      );
      if (patient) {
        const npatient = {
          ...patient,
          entries: [...(patient.entries || []), action.payload.entry],
        };
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: npatient,
          },
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
export const setPatientListAction = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};
export const setDiagnosisListAction = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis,
  };
};
