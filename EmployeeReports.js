import React, { useState, useEffect } from 'react';
import './EmployeeReports.css';
import EmployeeReportModal from './EmployeeReportModal';

const EmployeeReports = ({ onClose, employees = [] }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  
  const defaultEmployees = [
    { 
      id: 1,
      name: "Sarah Johnson", 
      remainingBudget: 3500, 
      savingsRate: 35, 
      status: "good",
      department: "Engineering",
      monthlyIncome: 6500,
      monthlyExpenses: 3000,
      lastUpdated: "2024-01-15"
    },
    { 
      id: 2,
      name: "Mike Chen", 
      remainingBudget: 2800, 
      savingsRate: 28, 
      status: "good",
      department: "Marketing",
      monthlyIncome: 5800,
      monthlyExpenses: 3000,
      lastUpdated: "2024-01-14"
    },
    { 
      id: 3,
      name: "Emily Davis", 
      remainingBudget: 2500, 
      savingsRate: 25, 
      status: "good",
      department: "Sales",
      monthlyIncome: 6200,
      monthlyExpenses: 3700,
      lastUpdated: "2024-01-13"
    },
    { 
      id: 4,
      name: "David Wilson", 
      remainingBudget: 1800, 
      savingsRate: 18, 
      status: "warning",
      department: "HR",
      monthlyIncome: 5500,
      monthlyExpenses: 3700,
      lastUpdated: "2024-01-12"
    },
    { 
      id: 5,
      name: "Lisa Brown", 
      remainingBudget: 1200, 
      savingsRate: 12, 
      status: "warning",
      department: "Finance",
      monthlyIncome: 6000,
      monthlyExpenses: 4800,
      lastUpdated: "2024-01-11"
    },
    { 
      id: 6,
      name: "Tom Anderson", 
      remainingBudget: 800, 
      savingsRate: 8, 
      status: "danger",
      department: "Operations",
      monthlyIncome: 5200,
      monthlyExpenses: 4400,
      lastUpdated: "2024-01-10"
    },
    { 
      id: 7,
      name: "Jessica Lee", 
      remainingBudget: 3200, 
      savingsRate: 32, 
      status: "good",
      department: "Engineering",
      monthlyIncome: 6800,
      monthlyExpenses: 3600,
      lastUpdated: "2024-01-09"
    },
    { 
      id: 8,
      name: "Alex Rodriguez", 
      remainingBudget: 1500, 
      savingsRate: 15, 
      status: "warning",
      department: "Sales",
      monthlyIncome: 5900,
      monthlyExpenses: 4400,
      lastUpdated: "2024-01-08"
    }
  ];

  const employeeData = employees.length > 0 ? employees : defaultEmployees;

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

  
  const filteredEmployees = employeeData
    .filter(employee => {
      const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'savingsRate':
          return b.savingsRate - a.savingsRate;
        case 'remainingBudget':
          return b.remainingBudget - a.remainingBudget;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'department':
          return a.department.localeCompare(b.department);
        default:
          return 0;
      }
    });

  const totalEmployees = filteredEmployees.length;
  const healthyEmployees = filteredEmployees.filter(e => e.status === 'good').length;
  const warningEmployees = filteredEmployees.filter(e => e.status === 'warning').length;
  const dangerEmployees = filteredEmployees.filter(e => e.status === 'danger').length;

  return (
    <div className="manager-reports-overlay">
      <div className="manager-reports-content">
        <div className="manager-reports-header">
          <h1>Employee Financial Reports</h1>
          <button className="manager-reports-close" onClick={onClose}>×</button>
        </div>

        {/* Summary Stats */}
        <div className="manager-reports-summary">
          <div className="summary-stat">
            <span className="summary-value">{totalEmployees}</span>
            <span className="summary-label">Total Employees</span>
          </div>
          <div className="summary-stat healthy">
            <span className="summary-value">{healthyEmployees}</span>
            <span className="summary-label">Healthy</span>
          </div>
          <div className="summary-stat warning">
            <span className="summary-value">{warningEmployees}</span>
            <span className="summary-label">Needs Attention</span>
          </div>
          <div className="summary-stat danger">
            <span className="summary-value">{dangerEmployees}</span>
            <span className="summary-label">At Risk</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="manager-reports-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search employees or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="good">Healthy</option>
              <option value="warning">Needs Attention</option>
              <option value="danger">At Risk</option>
            </select>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Sort by Name</option>
              <option value="savingsRate">Sort by Savings Rate</option>
              <option value="remainingBudget">Sort by Budget</option>
              <option value="status">Sort by Status</option>
              <option value="department">Sort by Department</option>
            </select>
          </div>
        </div>

        {/* Employee Reports Table */}
        <div className="manager-reports-table">
          <div className="table-header">
            <div className="header-cell">Employee</div>
            <div className="header-cell">Department</div>
            <div className="header-cell">Monthly Income</div>
            <div className="header-cell">Monthly Expenses</div>
            <div className="header-cell">Remaining Budget</div>
            <div className="header-cell">Savings Rate</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Actions</div>
          </div>
          
          <div className="table-body">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="table-row">
                <div className="table-cell employee-info" data-label="Employee">
                  <span className="employee-name">{employee.name}</span>
                  <span className="last-updated">Updated: {employee.lastUpdated}</span>
                </div>
                <div className="table-cell" data-label="Department">{employee.department}</div>
                <div className="table-cell income" data-label="Monthly Income">${employee.monthlyIncome.toLocaleString()}</div>
                <div className="table-cell expense" data-label="Monthly Expenses">${employee.monthlyExpenses.toLocaleString()}</div>
                <div className="table-cell budget" data-label="Remaining Budget">${employee.remainingBudget.toLocaleString()}</div>
                <div className="table-cell savings" data-label="Savings Rate">{employee.savingsRate}%</div>
                <div className="table-cell" data-label="Status">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(employee.status) }}
                  >
                    {getStatusLabel(employee.status)}
                  </span>
                </div>
                <div className="table-cell" data-label="Actions">
                  <button 
                    className="view-report-btn"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    📊 View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results Message */}
        {filteredEmployees.length === 0 && (
          <div className="no-results">
            <p>No employees found matching your criteria.</p>
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setFilterStatus('all');
                setSearchTerm('');
                setSortBy('name');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Employee Report Modal */}
      {showEmployeeModal && selectedEmployee && (
        <EmployeeReportModal 
          onClose={() => setShowEmployeeModal(false)}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeReports; 