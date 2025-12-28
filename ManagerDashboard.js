import React, { useState, useEffect } from 'react';
import './ManagerDashboard.css';
import EmployeeReportModal from './EmployeeReportModal';
import EmployeeReports from './EmployeeReports';
import api from "../services/api"; 

const ManagerDashboard = ({ user: propUser, onLogout }) => {
  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = propUser || storedUser || { id: null, name: "Guest Manager", role: "manager" };

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showEmployeeReports, setShowEmployeeReports] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [managerData, setManagerData] = useState({
    totalEmployees: 8,
    totalBudgetManaged: 125000,
    averageSavingsRate: 23,
    topPerformers: [
      { name: "Sarah Johnson", savingsRate: 35 },
      { name: "Mike Chen", savingsRate: 28 },
      { name: "Emily Davis", savingsRate: 25 }
    ],
    employeeList: [
      { 
        id: 1,
        name: "Sarah Johnson", 
        remainingBudget: 3500, 
        savingsRate: 35, 
        status: "good",
        department: "Finance",
        monthlyIncome: 5000,
        monthlyExpenses: 1500,
        lastUpdated: "2023-10-27"
      },
      { 
        id: 2,
        name: "Mike Chen", 
        remainingBudget: 2800, 
        savingsRate: 28, 
        status: "good",
        department: "Marketing",
        monthlyIncome: 4500,
        monthlyExpenses: 1700,
        lastUpdated: "2023-10-26"
      },
      { 
        id: 3,
        name: "Emily Davis", 
        remainingBudget: 2500, 
        savingsRate: 25, 
        status: "good",
        department: "HR",
        monthlyIncome: 4000,
        monthlyExpenses: 1500,
        lastUpdated: "2023-10-25"
      },
      { 
        id: 4,
        name: "David Wilson", 
        remainingBudget: 1800, 
        savingsRate: 18, 
        status: "warning",
        department: "IT",
        monthlyIncome: 3500,
        monthlyExpenses: 1700,
        lastUpdated: "2023-10-24"
      },
      { 
        id: 5,
        name: "Lisa Brown", 
        remainingBudget: 1200, 
        savingsRate: 12, 
        status: "warning",
        department: "Finance",
        monthlyIncome: 3000,
        monthlyExpenses: 1800,
        lastUpdated: "2023-10-23"
      },
      { 
        id: 6,
        name: "Tom Anderson", 
        remainingBudget: 800, 
        savingsRate: 8, 
        status: "danger",
        department: "Marketing",
        monthlyIncome: 2500,
        monthlyExpenses: 1900,
        lastUpdated: "2023-10-22"
      }
    ]
  });

  useEffect(() => {
    if (user.id) {
      loadManagerData();
    }
  }, [user.id]);

  const loadManagerData = async () => {
    try {
      const data = await api.getManagerData(user.id);
      setManagerData(data);
    } catch (error) {
      console.error('Failed to load manager data:', error);
    }
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'danger': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'good': return 'Healthy';
      case 'warning': return 'Needs Attention';
      case 'danger': return 'At Risk';
      default: return 'Unknown';
    }
  };

  return (
    <div className="manager-dashboard-container">
      <header className="manager-dashboard-header">
        <div className="container">
          <div className="manager-header-content">
            <div>
              <h1>Manager Dashboard</h1>
              <p>Welcome, {user.name}! Monitor your team's financial health</p>
            </div>
            {onLogout && (
              <button onClick={onLogout} className="btn btn-outline">
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="manager-dashboard-main">
        <div className="container">
          <div className="manager-stats-grid">
            <div className="manager-stat-card">
              <div className="manager-stat-value" style={{color: 'var(--primary-blue)'}}>
                {managerData.totalEmployees}
              </div>
              <div className="manager-stat-label">Total Employees</div>
            </div>
            
            <div className="manager-stat-card">
              <div className="manager-stat-value" style={{color: 'var(--secondary-green)'}}>
                ${managerData.totalBudgetManaged.toLocaleString()}
              </div>
              <div className="manager-stat-label">Total Budget Managed</div>
            </div>
            
            <div className="manager-stat-card">
              <div className="manager-stat-value" style={{color: '#a855f7'}}>
                {managerData.averageSavingsRate}%
              </div>
              <div className="manager-stat-label">Average Savings Rate</div>
            </div>
          </div>

          <div className="manager-dashboard-grid">
            <div className="card manager-top-performers" style={{ background: "linear-gradient(135deg, #DC143C, #FF8C00)" }}>


              <h2>Top Performers</h2>
              <div className="manager-performers-list">
                {managerData.topPerformers.length > 0 ? (
                  managerData.topPerformers.map((performer, index) => (
                    <div key={index} className="manager-performer-item">
                      <div className="manager-performer-rank">#{index + 1}</div>
                      <div className="manager-performer-info">
                        <span className="manager-performer-name">{performer.name}</span>
                        <span className="manager-performer-savings">{performer.savingsRate}% savings rate</span>
                      </div>
                      <div className="manager-performer-badge">
                        {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="manager-no-data">No top performers available</p>
                )}
              </div>
            </div>

            <div className="card manager-employee-overview" style={{ background: "linear-gradient(135deg, #1E90FF, #8A2BE2)" }}>
              <h2>Employee Overview</h2>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '12px', 
                marginBottom: '16px',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                💡 Click on any employee to view their detailed financial report
              </p>
              <div className="manager-employee-list">
                {managerData.employeeList.length > 0 ? (
                  managerData.employeeList.map((employee, index) => (
                    <div 
                      key={employee.id} 
                      className="manager-employee-item"
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      <div className="manager-employee-info">
                        <span className="manager-employee-name">{employee.name}</span>
                        <span className="manager-employee-status">
                          Budget: ${employee.remainingBudget.toLocaleString()}
                        </span>
                      </div>
                      <div className="manager-employee-metrics">
                        <span className="manager-savings-rate">{employee.savingsRate}%</span>
                        <span className="manager-status-indicator" data-status={employee.status}></span>
                        <span style={{ 
                          fontSize: '14px', 
                          color: 'rgba(255, 255, 255, 0.6)',
                          marginLeft: '8px'
                        }}>
                          📊
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="manager-no-data">No employees available</p>
                )}
              </div>
              
              {/* Reports Button */}
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                  className="manager-reports-button"
                  onClick={() => setShowEmployeeReports(true)}
                >
                  📊 View All Reports
                </button>
              </div>
            </div>

            <div className="card manager-team-insights" style={{ background: "linear-gradient(135deg, #FFD700, #FF4500)" }}>
              <h2>Team Insights</h2>
              <div className="manager-insights-grid">
                <div className="manager-insight-item">
                  <div className="manager-insight-icon">📊</div>
                  <div className="manager-insight-content">
                    <span className="manager-insight-title">Budget Health</span>
                    <span className="manager-insight-value">85% Positive</span>
                  </div>
                </div>
                <div className="manager-insight-item">
                  <div className="manager-insight-icon">💰</div>
                  <div className="manager-insight-content">
                    <span className="manager-insight-title">Avg. Monthly Savings</span>
                    <span className="manager-insight-value">$1,250</span>
                  </div>
                </div>
                <div className="manager-insight-item">
                  <div className="manager-insight-icon">🎯</div>
                  <div className="manager-insight-content">
                    <span className="manager-insight-title">Goal Achievement</span>
                    <span className="manager-insight-value">72%</span>
                  </div>
                </div>
                <div className="manager-insight-item">
                  <div className="manager-insight-icon">📈</div>
                  <div className="manager-insight-content">
                    <span className="manager-insight-title">Improvement Rate</span>
                    <span className="manager-insight-value">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showEmployeeModal && selectedEmployee && (
        <EmployeeReportModal 
          onClose={() => setShowEmployeeModal(false)}
          employee={selectedEmployee}
        />
      )}

      {showEmployeeReports && (
        <EmployeeReports
          onClose={() => setShowEmployeeReports(false)}
          employees={managerData.employeeList}
        />
      )}
    </div>
  );
};

export default ManagerDashboard;
