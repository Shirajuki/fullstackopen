interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface Rating {
  num: number;
  desc: string;
}
const getRating = (hours: number): Rating => {
  if (hours > 24) return { num: 3, desc: "good stuff!" };
  else if (hours > 15)
    return { num: 2, desc: "not too bad but could be better." };
  else return { num: 1, desc: "are you even trying?" };
};
const calculateExercise = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const totalHours = dailyExerciseHours.reduce(
    (a: number, b: number) => a + b,
    0
  );
  const average = totalHours / periodLength;
  const rating: Rating = getRating(totalHours);
  const result: Result = {
    periodLength,
    trainingDays: dailyExerciseHours.filter((h) => h !== 0).length,
    success: average >= target,
    rating: rating.num,
    ratingDescription: rating.desc,
    target,
    average,
  };
  return result;
};
interface Values {
  hours: number[];
  target: number;
}
export const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hours = [];
  for (let i = 2; i < args.length - 1; i++) {
    if (isNaN(Number(args[i])))
      throw new Error("Provided values were not numbers!");
    else hours.push(Number(args[i]));
  }
  if (isNaN(Number(args[args.length - 1])))
    throw new Error("Provided values were not numbers!");
  return {
    hours,
    target: Number(args[args.length - 1]),
  };
};
try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercise(hours, target));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
export default calculateExercise;
