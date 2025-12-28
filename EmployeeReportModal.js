import React from 'react';
import './EmployeeReportModal.css';

const EmployeeReportModal = ({ onClose, employee }) => {
  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3500, savings: 1500 },
    { month: 'Feb', income: 5200, expenses: 3600, savings: 1600 },
    { month: 'Mar', income: 5100, expenses: 3400, savings: 1700 },
    { month: 'Apr', income: 5300, expenses: 3800, savings: 1500 },
    { month: 'May', income: 5400, expenses: 3700, savings: 1700 },
    { month: 'Jun', income: 5500, expenses: 3900, savings: 1600 }
  ];

  const expenseCategories = [
    { category: 'Housing', amount: 1200, percentage: 32 },
    { category: 'Food', amount: 600, percentage: 16 },
    { category: 'Transportation', amount: 400, percentage: 11 },
    { category: 'Entertainment', amount: 300, percentage: 8 },
    { category: 'Healthcare', amount: 250, percentage: 7 },
    { category: 'Other', amount: 950, percentage: 26 }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
     <div
  className="modal-content"
  style={{
    maxWidth: "800px",
    backgroundColor: "black",
    color: "white", // so text is visible
  }}
  onClick={(e) => e.stopPropagation()}
>

        <div className="modal-header">
          <h2
  className="modal-title"
  style={{ color: "whitesmoke" }}
>
  Employee Report - {employee.name}
</h2>

          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="manager-employee-summary">
            <div className="manager-summary-stats">
              <div className="manager-summary-stat">
                <span className="manager-stat-label">Current Balance</span>
                <span className="manager-stat-value income">${employee.remainingBudget.toLocaleString()}</span>
              </div>
              <div className="manager-summary-stat">
                <span className="manager-stat-label">Savings Rate</span>
                <span className="manager-stat-value">{employee.savingsRate}%</span>
              </div>
              <div className="manager-summary-stat">
                <span className="manager-stat-label">Status</span>
                <span className={`manager-stat-value status-${employee.status}`}>
                  {employee.status === 'good' ? 'Healthy' : employee.status === 'warning' ? 'Needs Attention' : 'At Risk'}
                </span>
              </div>
            </div>
          </div>

          <div className="manager-report-section">
            <h3>6-Month Financial Trend</h3>
            <div className="manager-trend-chart">
              {monthlyData.map((data, index) => (
                <div key={index} className="manager-trend-item">
                  <div className="manager-trend-month">{data.month}</div>
                  <div className="manager-trend-bars">
                    <div className="manager-trend-bar income" style={{height: `${(data.income / 6000) * 80}px`}}></div>
                    <div className="manager-trend-bar expense" style={{height: `${(data.expenses / 6000) * 80}px`}}></div>
                    <div className="manager-trend-bar savings" style={{height: `${(data.savings / 6000) * 80}px`}}></div>
                  </div>
                  <div className="manager-trend-value">
                    <small>${data.savings}</small>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color income"></div>
                <span>Income</span>
              </div>
              <div className="legend-item">
                <div className="legend-color expense"></div>
                <span>Expenses</span>
              </div>
              <div className="legend-item">
                <div className="legend-color savings"></div>
                <span>Savings</span>
              </div>
            </div>
          </div>

          <div className="manager-report-section">
            <h3>Expense Breakdown</h3>
            <div className="manager-budget-breakdown">
              {expenseCategories.map((item, index) => (
                <div key={index} className="manager-budget-category">
                  <div className="manager-category-header">
                    <span className="manager-category-name">{item.category}</span>
                    <span className="manager-category-amount">${item.amount}</span>
                  </div>
                  <div className="manager-category-progress">
                    <div 
                      className="manager-category-progress-fill" 
                      style={{width: `${item.percentage}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h3>Recommendations</h3>
            <div className="recommendations-list">
              {employee.status === 'good' ? (
                <>
                  <div className="recommendation-item positive">
                    <span className="recommendation-icon">✅</span>
                    <div className="recommendation-content">
                      <strong>Excellent financial health!</strong>
                      <p>Employee maintains a healthy savings rate and budget balance.</p>
                    </div>
                  </div>
                  <div className="recommendation-item">
                    <span className="recommendation-icon">💡</span>
                    <div className="recommendation-content">
                      <strong>Investment opportunity</strong>
                      <p>Consider discussing investment options to maximize savings growth.</p>
                    </div>
                  </div>
                </>
              ) : employee.status === 'warning' ? (
                <>
                  <div className="recommendation-item warning">
                    <span className="recommendation-icon">⚠️</span>
                    <div className="recommendation-content">
                      <strong>Monitor spending patterns</strong>
                      <p>Some expense categories are above average. Consider budget review.</p>
                    </div>
                  </div>
                  <div className="recommendation-item">
                    <span className="recommendation-icon">📚</span>
                    <div className="recommendation-content">
                      <strong>Financial education</strong>
                      <p>Recommend budgeting workshops or financial planning resources.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="recommendation-item danger">
                    <span className="recommendation-icon">🚨</span>
                    <div className="recommendation-content">
                      <strong>Immediate attention required</strong>
                      <p>Schedule one-on-one financial counseling session.</p>
                    </div>
                  </div>
                  <div className="recommendation-item">
                    <span className="recommendation-icon">🤝</span>
                    <div className="recommendation-content">
                      <strong>Support resources</strong>
                      <p>Connect with HR for available financial assistance programs.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            onClick={onClose}
            className="btn btn-primary"
          >
            Close Report
          </button>
        </div>
      </div>

    </div>
  );
};

export default EmployeeReportModal;