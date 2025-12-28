import React, { useState, useEffect } from 'react';
import './CustomerDashboard.css';
import IncomeModal from './IncomeModal';
import ExpenseModal from './ExpenseModal';
import BudgetOverviewModal from './BudgetOverviewModal';
import api from "../services/api"; 

const CustomerDashboard = ({ user: propUser, onLogout }) => {
  // Get user from props OR localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = propUser || storedUser || { id: null, name: "Guest", role: "customer" };

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBudget: 0,
    savingsGoal: 5000,
    recentTransactions: []
  });

  useEffect(() => {
    if (user.id) {
      loadDashboardData();
    }
  }, [user.id]);

  const loadDashboardData = async () => {
    try {
      const data = await api.getDashboardData(user.id);
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleIncomeAdded = () => {
    setShowIncomeModal(false);
    loadDashboardData();
  };

  const handleExpenseAdded = () => {
    setShowExpenseModal(false);
    loadDashboardData();
  };

  const savingsPercentage = Math.min(
    (dashboardData.remainingBudget / dashboardData.savingsGoal) * 100,
    100
  );

  return (
    <div className="customer-dashboard-container">
      <header className="customer-dashboard-header">
        <div className="container">
          <div className="customer-header-content">
            <div>
              <h1>Welcome back, {user.name}!</h1>
              <p>Here's your financial overview for this month</p>
            </div>
            {onLogout && (
              <button onClick={onLogout} className="btn btn-outline">
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="customer-dashboard-main">
        <div className="container">
          <div className="customer-stats-grid">
            <div className="customer-stat-card income-card">
              <div className="customer-stat-value" style={{ color: 'var(--secondary-green)' }}>
                ${dashboardData.totalIncome.toLocaleString()}
              </div>
              <div className="customer-stat-label">Total Income</div>
            </div>
            
            <div className="customer-stat-card expense-card">
              <div className="customer-stat-value" style={{ color: 'var(--error-red)' }}>
                ${dashboardData.totalExpenses.toLocaleString()}
              </div>
              <div className="customer-stat-label">Total Expenses</div>
            </div>
            
            <div className="customer-stat-card budget-card">
              <div className="customer-stat-value" style={{ color: 'var(--primary-blue)' }}>
                ${dashboardData.remainingBudget.toLocaleString()}
              </div>
              <div className="customer-stat-label">Remaining Budget</div>
            </div>
          </div>

          <div className="customer-dashboard-grid">
            <div className="card customer-quick-actions">
              <h2>Quick Actions</h2>
              <div className="customer-action-buttons">
                <button 
                  onClick={() => setShowIncomeModal(true)}
                  className="btn btn-secondary"
                >
                  Add Income
                </button>
                <button 
                  onClick={() => setShowExpenseModal(true)}
                  className="btn btn-primary"
                >
                  Add Expense
                </button>
                <button 
                  onClick={() => setShowOverviewModal(true)}
                  className="btn btn-outline"
                >
                  Budget Overview
                </button>
              </div>
            </div>

            <div className="card customer-savings-progress">
              <h2>Savings Goal Progress</h2>
              <div className="customer-progress-info">
                <div className="customer-progress-bar">
                  <div 
                    className="customer-progress-fill" 
                    style={{ width: `${savingsPercentage}%` }}
                  ></div>
                </div>
                <div className="customer-progress-text">
                  <span>${dashboardData.remainingBudget.toLocaleString()}</span>
                  <span>of ${dashboardData.savingsGoal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="card customer-recent-transactions">
              <h2>Recent Transactions</h2>
              <div className="customer-transaction-list">
                {dashboardData.recentTransactions.length > 0 ? (
                  dashboardData.recentTransactions.map((transaction, index) => (
                    <div key={index} className="customer-transaction-item">
                      <div className="customer-transaction-info">
                        <span className="customer-transaction-name">{transaction.description}</span>
                        <span className="customer-transaction-date">{transaction.date}</span>
                      </div>
                      <span className={`customer-transaction-amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="customer-no-transactions">No recent transactions</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showIncomeModal && (
        <IncomeModal 
          onClose={() => setShowIncomeModal(false)}
          onIncomeAdded={handleIncomeAdded}
          userId={user.id}
        />
      )}

      {showExpenseModal && (
        <ExpenseModal 
          onClose={() => setShowExpenseModal(false)}
          onExpenseAdded={handleExpenseAdded}
          userId={user.id}
        />
      )}

      {showOverviewModal && (
        <BudgetOverviewModal 
          onClose={() => setShowOverviewModal(false)}
          dashboardData={dashboardData}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
