import express from "express";
import patientsService from "../services/patientsService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsService.getPublicEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
