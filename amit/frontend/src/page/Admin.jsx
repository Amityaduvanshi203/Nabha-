import React, { useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalStudents: 1250,
    totalTeachers: 85,
    totalParents: 980,
    totalClasses: 45,
    attendanceRate: 92,
    revenue: 2500000
  });

  const adminStats = [
    { title: "Total Students", value: stats.totalStudents, icon: "👥", change: "+5%" },
    { title: "Total Teachers", value: stats.totalTeachers, icon: "👨‍🏫", change: "+2%" },
    { title: "Total Parents", value: stats.totalParents, icon: "👨‍👩‍👧‍👦", change: "+8%" },
    { title: "Total Classes", value: stats.totalClasses, icon: "🏫", change: "0%" },
    { title: "Attendance Rate", value: `${stats.attendanceRate}%`, icon: "📊", change: "+3%" },
    { title: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: "💰", change: "+12%" }
  ];

  const recentActivities = [
    { user: "John Doe", action: "Added new student", time: "5 mins ago", type: "student" },
    { user: "Jane Smith", action: "Updated teacher profile", time: "15 mins ago", type: "teacher" },
    { user: "System", action: "Generated monthly report", time: "1 hour ago", type: "system" },
    { user: "Admin", action: "Approved parent registration", time: "2 hours ago", type: "parent" }
  ];

  const pendingApprovals = [
    { id: 1, name: "Rahul Kumar", type: "Student Registration", date: "2024-02-20" },
    { id: 2, name: "Priya Sharma", type: "Teacher Application", date: "2024-02-19" },
    { id: 3, name: "Amit Singh", type: "Parent Registration", date: "2024-02-18" }
  ];

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Complete system overview and management</p>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button 
          className={activeTab === "classes" ? "active" : ""}
          onClick={() => setActiveTab("classes")}
        >
          Classes
        </button>
        <button 
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
        <button 
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === "dashboard" && (
          <section className="dashboard-section">
            <div className="stats-grid">
              {adminStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-header">
                    <span className="stat-icon">{stat.icon}</span>
                    <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              ))}
            </div>

            <div className="dashboard-grid">
              <div className="recent-activities">
                <h3>Recent Activities</h3>
                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <span className={`activity-type ${activity.type}`}></span>
                      <div className="activity-details">
                        <p><strong>{activity.user}</strong> {activity.action}</p>
                        <small>{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pending-approvals">
                <h3>Pending Approvals</h3>
                <div className="approval-list">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="approval-item">
                      <div className="approval-details">
                        <h4>{item.name}</h4>
                        <p>{item.type}</p>
                        <small>{item.date}</small>
                      </div>
                      <div className="approval-actions">
                        <button className="approve-btn">Approve</button>
                        <button className="reject-btn">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "users" && (
          <section className="users-section">
            <h3>User Management</h3>
            <div className="user-filters">
              <button className="filter-btn active">All Users</button>
              <button className="filter-btn">Students</button>
              <button className="filter-btn">Teachers</button>
              <button className="filter-btn">Parents</button>
              <button className="add-user-btn">+ Add User</button>
            </div>
            
            <div className="users-table">
              <div className="table-header">
                <div>Name</div>
                <div>Role</div>
                <div>Email</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              <div className="table-row">
                <div>Rahul Kumar</div>
                <div>Student</div>
                <div>rahul@email.com</div>
                <div><span className="status active">Active</span></div>
                <div>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
              <div className="table-row">
                <div>Priya Sharma</div>
                <div>Teacher</div>
                <div>priya@email.com</div>
                <div><span className="status active">Active</span></div>
                <div>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "classes" && (
          <section className="classes-section">
            <h3>Class Management</h3>
            <button className="add-class-btn">+ Add New Class</button>
            
            <div className="classes-grid">
              <div className="class-card">
                <h4>Class 5-A</h4>
                <p>Teacher: Mr. Sharma</p>
                <p>Students: 35</p>
                <div className="class-actions">
                  <button>View Details</button>
                  <button>Edit</button>
                </div>
              </div>
              <div className="class-card">
                <h4>Class 5-B</h4>
                <p>Teacher: Mrs. Gupta</p>
                <p>Students: 32</p>
                <div className="class-actions">
                  <button>View Details</button>
                  <button>Edit</button>
                </div>
              </div>
              <div className="class-card">
                <h4>Class 6-A</h4>
                <p>Teacher: Mr. Kumar</p>
                <p>Students: 38</p>
                <div className="class-actions">
                  <button>View Details</button>
                  <button>Edit</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "reports" && (
          <section className="reports-section">
            <h3>Reports & Analytics</h3>
            <div className="report-filters">
              <select>
                <option>Monthly Report</option>
                <option>Quarterly Report</option>
                <option>Annual Report</option>
              </select>
              <button>Generate Report</button>
            </div>
            
            <div className="reports-grid">
              <div className="report-card">
                <h4>Attendance Report</h4>
                <p>Overall attendance: 92%</p>
                <button>Download PDF</button>
              </div>
              <div className="report-card">
                <h4>Academic Performance</h4>
                <p>Average grades: A-</p>
                <button>Download PDF</button>
              </div>
              <div className="report-card">
                <h4>Financial Report</h4>
                <p>Revenue: ₹25,00,000</p>
                <button>Download PDF</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="settings-section">
            <h3>System Settings</h3>
            <div className="settings-grid">
              <div className="setting-card">
                <h4>School Information</h4>
                <div className="setting-item">
                  <label>School Name</label>
                  <input type="text" defaultValue="AMIT College" />
                </div>
                <div className="setting-item">
                  <label>Contact Email</label>
                  <input type="email" defaultValue="info@amitcollege.edu" />
                </div>
                <button>Save Changes</button>
              </div>
              
              <div className="setting-card">
                <h4>Academic Settings</h4>
                <div className="setting-item">
                  <label>Current Academic Year</label>
                  <input type="text" defaultValue="2024-2025" />
                </div>
                <div className="setting-item">
                  <label>Passing Percentage</label>
                  <input type="number" defaultValue="40" />
                </div>
                <button>Save Changes</button>
              </div>
            </div>
          </section>
        )}
      </main>

      
    </div>
  );
};

export default AdminPage;
