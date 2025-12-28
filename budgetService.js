import api from "./api";

export const getBudgets = async () => {
  const response = await api.get("/budgets");
  return response.data;
};

export const addBudget = async (budgetData) => {
  const response = await api.post("/budgets", budgetData);
  return response.data;
};
