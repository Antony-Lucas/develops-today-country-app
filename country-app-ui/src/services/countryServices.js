import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCountryList = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching country list:", error);
    throw error;
  }
};

export const getCountryDetails = async (name, code) => {
  try {
    console.log(name, code);
    const response = await axios.get(
      `${API_URL}/detail?name=${name}&&code=${code}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};
