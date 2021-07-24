import express from "express";
import patientsService from "../services/patientsService";
import utils from "../utils/patients";
import { Entry } from "../types";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsService.getPublicEntries());
});
router.get("/:id", (req, res) => {
  const id: string | undefined = req.params.id;
  if (!id) return res.status(400).json({ error: "malformatted parameter" });
  return res.json(patientsService.getPublicEntryById(id));
});
router.post("/", (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const parsedPatient = utils.parsePatient(
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
  );
  if (parsedPatient) {
    const newPatientEntry = patientsService.addEntry(parsedPatient);
    res.json(newPatientEntry);
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});
router.post("/:id/entries", (req, res) => {
  const id: string | undefined = req.params.id;
  if (!id) return res.status(400).json({ error: "malformatted parameter" });
  const {
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
    healthCheckRating,
    employerName,
    sickLeave,
    discharge,
  } = req.body;

  console.log(req.body);
  const parsedEntry: Entry | null = utils.parseEntry(
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
    healthCheckRating,
    employerName,
    sickLeave,
    discharge
  );
  if (parsedEntry) {
    const newPatientEntry = patientsService.addPatientEntry(id, parsedEntry);
    return res.json(newPatientEntry);
  } else {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

export default router;
