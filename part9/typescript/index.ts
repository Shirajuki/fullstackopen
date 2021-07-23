import express, { Request, Response } from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercise from "./exerciseCalculator";
const app = express();
app.use(express.json()); // for parsing application/json
app.get("/ping", (_req, res) => {
  calculateExercise([1], 1);
  res.send("pong");
});

// http://localhost:3003/bmi?height=180&weight=72
app.get("/bmi", (req: Request, res: Response) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (height && weight) {
    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  const daily_exercises: number[] = req.body.daily_exercises;
  const target: number = req.body.target;
  if (!daily_exercises && !target)
    return res.status(400).json({ error: "parameters missing" });
  try {
    for (let i = 0; i < daily_exercises.length; i++) {
      if (isNaN(Number(daily_exercises[i])))
        throw new Error("Provided values were not numbers!");
    }
    if (isNaN(Number(target)))
      throw new Error("Provided values were not numbers!");
    const result = calculateExercise(daily_exercises, target);
    return res.status(200).json(result);
  } catch (exception) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
