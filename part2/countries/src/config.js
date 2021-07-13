import { config } from "dotenv";
config({ path: __dirname + "/env" });

const env = {
  api_key: process.env.REACT_APP_API_KEY,
};
export default env;
