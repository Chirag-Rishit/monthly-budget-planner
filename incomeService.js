import api from "./api";

export const getIncomes = async (userId) => {
  const response = await api.get(`/income/${userId}`);
  return response.data;
};

export const addIncome = async (incomeData) => {
  const response = await api.post("/income", incomeData);
  return response.data;
};
