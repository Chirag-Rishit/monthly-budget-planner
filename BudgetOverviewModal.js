import React from 'react';
import './BudgetOverviewModal.css';

const BudgetOverviewModal = ({ onClose, dashboardData }) => {
  const expenseBreakdown = [
    { category: 'Housing', amount: 1200, color: '#3b82f6' },
    { category: 'Food & Dining', amount: 400, color: '#10b981' },
    { category: 'Transportation', amount: 300, color: '#8b5cf6' },
    { category: 'Entertainment', amount: 200, color: '#f59e0b' },
    { category: 'Other', amount: 150, color: '#ef4444' }
  ];

  const totalExpenseBreakdown = expenseBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{maxWidth: '600px'}} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Budget Overview</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="overview-stats">
            <div className="overview-stat">
              <span className="overview-label">Monthly Income</span>
              <span className="overview-value income">${dashboardData.totalIncome.toLocaleString()}</span>
            </div>
            <div className="overview-stat">
              <span className="overview-label">Monthly Expenses</span>
              <span className="overview-value expense">${dashboardData.totalExpenses.toLocaleString()}</span>
            </div>
            <div className="overview-stat">
              <span className="overview-label">Net Savings</span>
              <span className="overview-value savings">${dashboardData.remainingBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="expense-breakdown">
            <h3>Expense Breakdown</h3>
            <div className="breakdown-list">
              {expenseBreakdown.map((item, index) => {
                const percentage = ((item.amount / totalExpenseBreakdown) * 100).toFixed(1);
                return (
                  <div key={index} className="breakdown-item">
                    <div className="breakdown-info">
                      <div 
                        className="breakdown-color" 
                        style={{backgroundColor: item.color}}
                      ></div>
                      <span className="breakdown-category">{item.category}</span>
                    </div>
                    <div className="breakdown-amount">
                      <span className="amount">${item.amount}</span>
                      <span className="percentage">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="budget-insights">
            <h3>Financial Insights</h3>
            <div className="insights-list">
              <div className="insight-item">
                <span className="insight-icon">📈</span>
                <div className="insight-content">
                  <strong>Good saving rate!</strong>
                  <p>You're saving {((dashboardData.remainingBudget / dashboardData.totalIncome) * 100).toFixed(1)}% of your income.</p>
                </div>
              </div>
              <div className="insight-item">
                <span className="insight-icon">🎯</span>
                <div className="insight-content">
                  <strong>Budget Goal Progress</strong>
                  <p>You're {((dashboardData.remainingBudget / dashboardData.savingsGoal) * 100).toFixed(1)}% towards your savings goal.</p>
                </div>
              </div>
              <div className="insight-item">
                <span className="insight-icon">💡</span>
                <div className="insight-content">
                  <strong>Tip</strong>
                  <p>Consider setting up automatic transfers to reach your savings goal faster.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            onClick={onClose}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>

    </div>
  );
};

export default BudgetOverviewModal;