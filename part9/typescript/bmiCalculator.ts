const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  let output: string = "";
  if (bmi < 16) output = "Underweight (severe thinness)";
  else if (bmi < 17) output = "Underweight (moderate thinness)";
  else if (bmi < 18.5) output = "Underweight (mild thinness)";
  else if (bmi < 25) output = "Normal (healthy weight)";
  else if (bmi < 30) output = "Overweight (pre-obese)";
  else if (bmi < 35) output = "Obese (class I)";
  else if (bmi < 40) output = "Obese (class II)";
  else output = "Obese (class III)";
  return output;
};

interface Values {
  value1: number;
  value2: number;
}
const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
/*
BMI TABLE
------------------------------------------------
Underweight (Severe thinness) 	   < 16 	< 0.64
Underweight (Moderate thinness) 	16–17 	0.64–0.68
Underweight (Mild thinness) 	   17–18.5 	0.68–0.74
Normal range (healthy weight) 	18.5–25    	0.74–1
Overweight (Pre-obese) 	25–30 	1–1.2
Obese (Class I) 	30–35 	1.2–1.4
Obese (Class II) 	35–40 	1.4–1.6
Obese (Class III) 	   ≥ 40 	≥ 1.6 
*/
