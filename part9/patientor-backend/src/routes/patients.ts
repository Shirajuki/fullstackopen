import express from "express";
import patientsService from "../services/patientsService";
import utils from "../utils/patients";
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

export default router;
