import React, { useState } from "react";
import "./ParentPage.css";

// Simple Pie Chart Component
const PieChart = ({ data }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
  
  // Calculate total
  const total = data.reduce((sum, item) => sum + parseInt(item.value), 0);
  
  // Calculate angles
  let cumulativeAngle = 0;
  const paths = data.map((item, index) => {
    const percentage = parseInt(item.value) / total;
    const angle = percentage * 360;
    
    // Calculate path for pie slice
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    
    // Convert to radians
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    // Calculate points
    const radius = 120;
    const centerX = 150;
    const centerY = 150;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    // Determine if the slice is larger than 180 degrees
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Create SVG path
    const path = `
      M ${centerX} ${centerY}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    `;
    
    cumulativeAngle += angle;
    
    return (
      <g key={item.label}>
        <path
          d={path}
          fill={colors[index % colors.length]}
          stroke="white"
          strokeWidth="2"
          className="pie-slice"
        >
          <title>{`${item.label}: ${item.value}%`}</title>
        </path>
      </g>
    );
  });

  return (
    <div className="pie-chart-container">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {paths}
        <circle cx="150" cy="150" r="60" fill="white" stroke="#667eea" strokeWidth="2"/>
        <text x="150" y="150" textAnchor="middle" dominantBaseline="middle" className="pie-center-text">
          Progress
        </text>
      </svg>
      <div className="pie-legend">
        {data.map((item, index) => (
          <div key={item.label} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></span>
            <span className="legend-label">{item.label}</span>
            <span className="legend-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ParentPage = () => {
  const [selectedChild, setSelectedChild] = useState("Aarav Kumar");
  const [activeTab, setActiveTab] = useState("overview");

  const children = ["Aarav Kumar", "Priya Sharma"];

  const stats = [
    { title: "Attendance", value: "95%", icon: "📅" },
    { title: "Grades", value: "B+", icon: "🎯" },
    { title: "Assignments", value: "8/10", icon: "📝" },
    
  ];

  const childProgress = {
    overallPerformance: "B+ • 78%",
    subjects: [
      { name: "Mathematics", progress: "88%" },
      { name: "Science", progress: "72%" },
      { name: "English", progress: "65%" },
      { name: "Hindi", progress: "80%" },
      { name: "Social Studies", progress: "70%" }
    ],
    timeSpent: {
      week: "4h 20m",
      month: "15h 10m"
    },
    lessons: [
      { lesson: "Fractions - Part 1", status: "Completed", quizScore: "84%", lastAccess: "2025-09-12" },
      { lesson: "Plant Cells", status: "In-progress", quizScore: "-", lastAccess: "2025-09-14" },
      { lesson: "Grammar: Tenses", status: "Pending", quizScore: "-", lastAccess: "-" }
    ],
    upcomingAssignments: [
      { title: "Math worksheet: Fractions", type: "Homework", dueDate: "2025-09-20" },
      { title: "Science project: Plant lifecycle", type: "Project", dueDate: "2025-09-25" }
    ]
  };

  // Academics data
  const academicsData = {
    currentGrades: [
      { subject: "Mathematics", grade: "B+", percentage: "78%", teacher: "Mr. Sharma", remarks: "Good progress" },
      { subject: "Science", grade: "B", percentage: "72%", teacher: "Ms. Patel", remarks: "Needs improvement in practicals" },
      { subject: "English", grade: "C+", percentage: "65%", teacher: "Mr. Singh", remarks: "Focus on grammar" },
      { subject: "Hindi", grade: "B+", percentage: "80%", teacher: "Mrs. Gupta", remarks: "Excellent in writing" },
      { subject: "Social Studies", grade: "B-", percentage: "70%", teacher: "Mr. Kumar", remarks: "Good participation" }
    ],
    testScores: [
      { test: "Math Unit Test 1", score: "42/50", percentage: "84%", date: "2025-08-15" },
      { test: "Science Unit Test 1", score: "35/50", percentage: "70%", date: "2025-08-20" },
      { test: "English Grammar Test", score: "28/40", percentage: "70%", date: "2025-08-25" },
      { test: "Hindi Writing Test", score: "38/50", percentage: "76%", date: "2025-08-28" },
      { test: "Social Studies Quiz", score: "22/30", percentage: "73%", date: "2025-09-02" }
    ],
    teacherComments: [
      { teacher: "Mr. Sharma (Math)", comment: "Aarav is showing good understanding of fractions.", date: "2025-09-10" },
      { teacher: "Ms. Patel (Science)", comment: "Needs to participate more in lab activities.", date: "2025-09-08" },
      { teacher: "Mr. Singh (English)", comment: "Improvement seen in reading comprehension.", date: "2025-09-05" }
    ],
    academicSummary: {
      totalClasses: 45,
      attended: 42,
      averageScore: "74%",
      rank: "15/40",
      overallGrade: "B"
    }
  };

  // Attendance data
  const attendanceData = {
    summary: {
      totalDays: 45,
      present: 42,
      absent: 2,
      late: 1,
      attendancePercentage: "93.3%"
    },
    monthlyBreakdown: [
      { month: "July 2025", present: 20, absent: 1, late: 0, total: 21, percentage: "95.2%" },
      { month: "August 2025", present: 18, absent: 1, late: 1, total: 20, percentage: "90%" },
      { month: "September 2025", present: 4, absent: 0, late: 0, total: 4, percentage: "100%" }
    ],
    subjectWiseAttendance: [
      { subject: "Mathematics", attended: 42, total: 45, percentage: "93.3%" },
      { subject: "Science", attended: 41, total: 45, percentage: "91.1%" },
      { subject: "English", attended: 43, total: 45, percentage: "95.6%" },
      { subject: "Hindi", attended: 42, total: 45, percentage: "93.3%" },
      { subject: "Social Studies", attended: 42, total: 45, percentage: "93.3%" }
    ],
    recentAttendance: [
      { date: "2025-09-15", status: "Present", subject: "All Subjects", time: "8:30 AM - 3:30 PM" },
      { date: "2025-09-14", status: "Present", subject: "All Subjects", time: "8:30 AM - 3:30 PM" },
      { date: "2025-09-13", status: "Late", subject: "All Subjects", time: "9:15 AM - 3:30 PM" },
      { date: "2025-09-12", status: "Present", subject: "All Subjects", time: "8:30 AM - 3:30 PM" },
      { date: "2025-09-11", status: "Absent", subject: "-", time: "-" },
      { date: "2025-09-10", status: "Present", subject: "All Subjects", time: "8:30 AM - 3:30 PM" }
    ],
    holidays: [
      { date: "2025-08-15", occasion: "Independence Day", type: "National Holiday" },
      { date: "2025-08-19", occasion: "Raksha Bandhan", type: "Festival Holiday" },
      { date: "2025-09-05", occasion: "Teachers' Day", type: "School Event" }
    ]
  };

  // Messages data
  const messagesData = {
    unreadCount: 3,
    inbox: [
      {
        id: 1,
        from: "Mr. Sharma (Math Teacher)",
        subject: "Upcoming Math Test",
        message: "There will be a math test on fractions next week. Please ensure Aarav practices regularly.",
        date: "2025-09-14",
        read: false,
        priority: "high",
        category: "academic"
      },
      {
        id: 2,
        from: "Ms. Patel (Science Teacher)",
        subject: "Science Project Submission",
        message: "The plant lifecycle project is due on Sep 25. Aarav has made good progress.",
        date: "2025-09-13",
        read: false,
        priority: "medium",
        category: "assignment"
      },
      {
        id: 3,
        from: "Principal's Office",
        subject: "Parent-Teacher Meeting",
        message: "Parent-Teacher meeting is scheduled for Sep 30, 2025 from 10 AM to 2 PM.",
        date: "2025-09-12",
        read: false,
        priority: "high",
        category: "event"
      },
      {
        id: 4,
        from: "School Admin",
        subject: "Fee Reminder",
        message: "This is a reminder for the second installment of tuition fees due on Oct 5.",
        date: "2025-09-10",
        read: true,
        priority: "medium",
        category: "administrative"
      },
      {
        id: 5,
        from: "PTA Coordinator",
        subject: "Annual Day Preparation",
        message: "Aarav has been selected for the annual day cultural program. Practice starts from Oct 1.",
        date: "2025-09-08",
        read: true,
        priority: "low",
        category: "event"
      },
      {
        id: 6,
        from: "Mr. Singh (English Teacher)",
        subject: "English Assignment",
        message: "Please ensure Aarav completes the essay on 'My Favorite Book' by this weekend.",
        date: "2025-09-07",
        read: true,
        priority: "medium",
        category: "assignment"
      }
    ],
    notifications: [
      { id: 1, message: "New assignment posted in Mathematics", date: "2025-09-15", type: "assignment" },
      { id: 2, message: "School will remain closed on Oct 2 for Gandhi Jayanti", date: "2025-09-14", type: "holiday" },
      { id: 3, message: "PTM registration closing soon", date: "2025-09-13", type: "reminder" }
    ]
  };

  // Pie chart data - subject distribution
  const pieChartData = childProgress.subjects.map(subject => ({
    label: subject.name,
    value: parseInt(subject.progress)
  }));

  return (
    <div className="parent-page">
      <header className="parent-header">
        <h1>Parent Dashboard</h1>
        <p>Monitor your child's academic progress</p>
      </header>

      <div className="child-selector">
        <h3>Select Child</h3>
        <div className="child-buttons">
          {children.map((child) => (
            <button
              key={child}
              className={selectedChild === child ? "active" : ""}
              onClick={() => setSelectedChild(child)}
            >
              {child}
            </button>
          ))}
        </div>
      </div>

      <nav className="parent-nav">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "academics" ? "active" : ""}
          onClick={() => setActiveTab("academics")}
        >
          Academics
        </button>
        <button
          className={activeTab === "attendance" ? "active" : ""}
          onClick={() => setActiveTab("attendance")}
        >
          Attendance
        </button>
        
      </nav>

      <main className="parent-content">
        {activeTab === "overview" && (
          <section className="overview-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <span className="stat-icon">{stat.icon}</span>
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Pie Chart Section */}
            <div className="chart-section">
              <h3>Subject Performance Distribution - {selectedChild}</h3>
              <PieChart data={pieChartData} />
            </div>

            {/* Child Progress Section */}
            <div className="child-progress">
              <h3>Child Progress - {selectedChild} • Class: 6A</h3>
              <div className="progress-buttons">
                <button>Download Excel (CSV)</button>
                <button>Download PDF / Print</button>
              </div>

              <div className="overall-performance">
                <h4>Overall Performance</h4>
                <p>{childProgress.overallPerformance}</p>
              </div>

              <div className="subject-progress">
                <h4>Subject-wise Progress</h4>
                {childProgress.subjects.map((subject) => (
                  <div key={subject.name} className="subject-bar">
                    <span>{subject.name}</span>
                    <div className="progress-bar">
                      <div className="filled" style={{ width: subject.progress }}></div>
                    </div>
                    <span>{subject.progress}</span>
                  </div>
                ))}
              </div>

              <div className="time-spent">
                <h4>Time Spent on Learning</h4>
                <p>This week: {childProgress.timeSpent.week}</p>
                <p>This month: {childProgress.timeSpent.month}</p>
              </div>

              <div className="lessons-completed">
                <h4>Lessons Completed</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Lesson</th>
                      <th>Status</th>
                      <th>Quiz Score</th>
                      <th>Last Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {childProgress.lessons.map((lesson, idx) => (
                      <tr key={idx}>
                        <td>{lesson.lesson}</td>
                        <td>{lesson.status}</td>
                        <td>{lesson.quizScore}</td>
                        <td>{lesson.lastAccess}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="upcoming-assignments">
                <h4>Upcoming Assignments / Notifications</h4>
                <ul>
                  {childProgress.upcomingAssignments.map((assign, idx) => (
                    <li key={idx}>
                      {assign.title} — {assign.type} — Due: {assign.dueDate}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeTab === "academics" && (
          <section className="academics-section">
            <h3>Academic Performance - {selectedChild} • Class: 6A</h3>
            
            {/* Academic Summary Cards */}
            <div className="academic-summary">
              <div className="summary-card">
                <span className="summary-icon">📊</span>
                <div className="summary-details">
                  <h4>Average Score</h4>
                  <p className="summary-value">{academicsData.academicSummary.averageScore}</p>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon">🏆</span>
                <div className="summary-details">
                  <h4>Class Rank</h4>
                  <p className="summary-value">{academicsData.academicSummary.rank}</p>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon">📚</span>
                <div className="summary-details">
                  <h4>Classes Attended</h4>
                  <p className="summary-value">{academicsData.academicSummary.attended}/{academicsData.academicSummary.totalClasses}</p>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon">🎯</span>
                <div className="summary-details">
                  <h4>Overall Grade</h4>
                  <p className="summary-value">{academicsData.academicSummary.overallGrade}</p>
                </div>
              </div>
            </div>

            {/* Current Grades Table */}
            <div className="grades-table-container">
              <h4>Current Grades</h4>
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>Percentage</th>
                    <th>Teacher</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {academicsData.currentGrades.map((grade, idx) => (
                    <tr key={idx}>
                      <td>{grade.subject}</td>
                      <td><span className={`grade-badge grade-${grade.grade.charAt(0).toLowerCase()}`}>{grade.grade}</span></td>
                      <td>{grade.percentage}</td>
                      <td>{grade.teacher}</td>
                      <td>{grade.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Test Scores */}
            <div className="test-scores-container">
              <h4>Recent Test Scores</h4>
              <table className="test-scores-table">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {academicsData.testScores.map((test, idx) => (
                    <tr key={idx}>
                      <td>{test.test}</td>
                      <td>{test.score}</td>
                      <td>
                        <div className="score-progress">
                          <span>{test.percentage}</span>
                          <div className="mini-progress-bar">
                            <div className="mini-filled" style={{ width: test.percentage }}></div>
                          </div>
                        </div>
                      </td>
                      <td>{test.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Teacher Comments */}
            <div className="teacher-comments">
              <h4>Recent Teacher Comments</h4>
              {academicsData.teacherComments.map((comment, idx) => (
                <div key={idx} className="comment-card">
                  <div className="comment-header">
                    <span className="comment-teacher">{comment.teacher}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p className="comment-text">"{comment.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "attendance" && (
          <section className="attendance-section">
            <h3>Attendance Report - {selectedChild} • Class: 6A</h3>
            
            {/* Attendance Summary Cards */}
            <div className="attendance-summary">
              <div className="summary-card attendance-card present">
                <span className="summary-icon">✅</span>
                <div className="summary-details">
                  <h4>Present</h4>
                  <p className="summary-value">{attendanceData.summary.present}</p>
                </div>
              </div>
              <div className="summary-card attendance-card absent">
                <span className="summary-icon">❌</span>
                <div className="summary-details">
                  <h4>Absent</h4>
                  <p className="summary-value">{attendanceData.summary.absent}</p>
                </div>
              </div>
              <div className="summary-card attendance-card late">
                <span className="summary-icon">⏰</span>
                <div className="summary-details">
                  <h4>Late</h4>
                  <p className="summary-value">{attendanceData.summary.late}</p>
                </div>
              </div>
              <div className="summary-card attendance-card percentage">
                <span className="summary-icon">📊</span>
                <div className="summary-details">
                  <h4>Attendance %</h4>
                  <p className="summary-value">{attendanceData.summary.attendancePercentage}</p>
                </div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="monthly-attendance">
              <h4>Monthly Attendance Breakdown</h4>
              <div className="monthly-grid">
                {attendanceData.monthlyBreakdown.map((month, idx) => (
                  <div key={idx} className="month-card">
                    <h5>{month.month}</h5>
                    <div className="month-stats">
                      <div className="stat-item">
                        <span className="stat-label">Present:</span>
                        <span className="stat-value present">{month.present}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Absent:</span>
                        <span className="stat-value absent">{month.absent}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Late:</span>
                        <span className="stat-value late">{month.late}</span>
                      </div>
                      <div className="stat-item total">
                        <span className="stat-label">Total:</span>
                        <span className="stat-value">{month.total}</span>
                      </div>
                      <div className="month-percentage">
                        {month.percentage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject-wise Attendance */}
            <div className="subject-attendance">
              <h4>Subject-wise Attendance</h4>
              {attendanceData.subjectWiseAttendance.map((subject, idx) => (
                <div key={idx} className="subject-attendance-bar">
                  <div className="subject-info">
                    <span>{subject.subject}</span>
                    <span>{subject.attended}/{subject.total} ({subject.percentage})</span>
                  </div>
                  <div className="attendance-progress-bar">
                    <div 
                      className="attendance-filled" 
                      style={{ width: subject.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Attendance Table */}
            <div className="recent-attendance">
              <h4>Recent Attendance</h4>
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Subject</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.recentAttendance.map((record, idx) => (
                    <tr key={idx}>
                      <td>{record.date}</td>
                      <td>
                        <span className={`status-badge status-${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{record.subject}</td>
                      <td>{record.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Holidays */}
            <div className="holidays-section">
              <h4>Upcoming Holidays & Events</h4>
              <div className="holidays-list">
                {attendanceData.holidays.map((holiday, idx) => (
                  <div key={idx} className="holiday-item">
                    <span className="holiday-date">{holiday.date}</span>
                    <span className="holiday-occasion">{holiday.occasion}</span>
                    <span className="holiday-type">{holiday.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "messages" && (
          <section className="messages-section">
            <div className="messages-header">
              <h3>Messages & Notifications</h3>
              <div className="unread-badge">
                {messagesData.unreadCount} Unread
              </div>
            </div>

            {/* Notifications Bar */}
            <div className="notifications-bar">
              {messagesData.notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <span className="notification-icon">🔔</span>
                  <span className="notification-message">{notification.message}</span>
                  <span className="notification-date">{notification.date}</span>
                </div>
              ))}
            </div>

           
          </section>
        )}
      </main>

      
    </div>
  );
};

export default ParentPage;