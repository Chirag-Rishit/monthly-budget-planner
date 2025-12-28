import api from "./api";

export const getExpenses = async (userId) => {
  const response = await api.get(`/expenses/${userId}`);
  return response.data;
};

export const addExpense = async (expenseData) => {
  const response = await api.post("/expenses", expenseData);
  return response.data;
};
