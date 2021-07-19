import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const usersService = { getAll, getById };
export default usersService;
