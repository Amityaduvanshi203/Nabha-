import React, { useState } from "react";
import "./TeacherPage.css";

const TeacherPage = () => {
  const [selectedClass, setSelectedClass] = useState("Class 5");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [uploadType, setUploadType] = useState("notes");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [selectedMonth, setSelectedMonth] = useState("March 2024");
  const [selectedReportType, setSelectedReportType] = useState("attendance");
  const [selectedTrainingModule, setSelectedTrainingModule] = useState("all");

  const [newUpload, setNewUpload] = useState({
    title: "",
    type: "notes",
    subject: "",
    class: "Class 5",
    description: "",
    file: null
  });

  const classes = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
  "Class 11", "Class 12"
];
  
  const subjects = {
    "Class 1": ["Mathematics", "English", "Hindi", "Environmental Studies", "Art"],
    "Class 2": ["Mathematics", "English", "Hindi", "Environmental Studies", "Art"],
    "Class 3": ["Mathematics", "English", "Hindi", "Environmental Studies", "Computer", "Art"],
    "Class 4": ["Mathematics", "English", "Hindi", "Environmental Studies", "Computer", "Art"],
    "Class 5": ["Mathematics", "Science", "English", "Hindi", "Social Studies"],
    "Class 6": ["Mathematics", "Science", "English", "Hindi", "Social Science", "Sanskrit", "Computer"],
    "Class 7": ["Mathematics", "Science", "English", "Hindi", "Social Science", "Sanskrit", "Computer"],
    "Class 8": ["Mathematics", "Science", "English", "Hindi", "Social Science", "Sanskrit", "Computer"],
    "Class 9": ["Mathematics", "Science", "English", "Hindi", "Social Science", "Sanskrit", "Computer"],
    "Class 10": ["Mathematics", "Science", "English", "Hindi", "Social Science", "Sanskrit", "Computer"],
    "Class 11": ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science", "Physical Education"],
    "Class 12": ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science", "Physical Education"]
  };
  
  const stats = [
    { title: "Total Students", value: "120", icon: "👥" },
    { title: "Classes Today", value: "4", icon: "📚" },
    { title: "Assignments", value: "8", icon: "📝" },
    { title: "Messages", value: "15", icon: "💬" }
  ];

  const schedule = [
    { time: "9:00 AM", subject: "Mathematics", class: "Class 5", room: "Room 101" },
    { time: "10:30 AM", subject: "Science", class: "Class 6", room: "Room 102" },
    { time: "12:00 PM", subject: "English", class: "Class 5", room: "Room 103" },
    { time: "2:00 PM", subject: "Social Studies", class: "Class 7", room: "Room 104" }
  ];

  // Teacher's uploaded materials
  const [teacherUploads, setTeacherUploads] = useState([
    { 
      id: 1,
      title: "Algebra Basics - Chapter 1",
      type: "notes",
      subject: "Mathematics",
      class: "Class 5",
      date: "2 hours ago",
      size: "2.5 MB",
      downloads: 45,
      status: "published"
    },
    { 
      id: 2,
      title: "Quadratic Equations - Video Lecture",
      type: "videos",
      subject: "Mathematics",
      class: "Class 6",
      date: "1 day ago",
      duration: "35 min",
      views: 78,
      status: "published"
    },
    { 
      id: 3,
      title: "Cell Structure - Notes",
      type: "notes",
      subject: "Science",
      class: "Class 8",
      date: "3 days ago",
      size: "1.8 MB",
      downloads: 32,
      status: "published"
    },
    { 
      id: 4,
      title: "Weekly Assignment - Fractions",
      type: "assignments",
      subject: "Mathematics",
      class: "Class 5",
      date: "5 hours ago",
      dueDate: "March 20, 2024",
      submissions: 23,
      totalStudents: 45,
      status: "published"
    },
    { 
      id: 5,
      title: "Science Quiz - Chapter 3",
      type: "quizzes",
      subject: "Science",
      class: "Class 7",
      date: "2 days ago",
      questions: 15,
      attempts: 34,
      status: "published"
    }
  ]);

  // Course Builder Data
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Mathematics - Class 5",
      subject: "Mathematics",
      class: "Class 5",
      modules: [
        { id: 1, name: "Algebra Basics", lessons: 5, duration: "2 weeks", status: "published" },
        { id: 2, name: "Geometry", lessons: 4, duration: "1.5 weeks", status: "draft" },
        { id: 3, name: "Fractions", lessons: 6, duration: "2 weeks", status: "published" }
      ],
      totalLessons: 15,
      status: "active"
    },
    {
      id: 2,
      name: "Science - Class 6",
      subject: "Science",
      class: "Class 6",
      modules: [
        { id: 4, name: "Cell Biology", lessons: 4, duration: "1 week", status: "published" },
        { id: 5, name: "Plant Kingdom", lessons: 3, duration: "1 week", status: "published" }
      ],
      totalLessons: 7,
      status: "active"
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    subject: "",
    class: selectedClass,
    description: ""
  });

  const [newModule, setNewModule] = useState({
    name: "",
    lessons: "",
    duration: "",
    courseId: null
  });

  // Class Analytics Data
  const [analytics, setAnalytics] = useState({
    class5: {
      averageAttendance: 92,
      averageMarks: 78,
      topStudents: ["Rahul Kumar", "Priya Sharma", "Amit Patel"],
      strugglingStudents: ["Rohan Singh", "Neha Gupta"],
      subjectPerformance: {
        "Mathematics": 82,
        "Science": 79,
        "English": 88,
        "Hindi": 85,
        "Social Studies": 76
      },
      weeklyProgress: [75, 82, 88, 85, 90, 87, 92]
    },
    class6: {
      averageAttendance: 88,
      averageMarks: 75,
      topStudents: ["Anjali Verma", "Vikram Singh", "Pooja Mehta"],
      strugglingStudents: ["Rajesh Kumar", "Sneha Reddy"],
      subjectPerformance: {
        "Mathematics": 78,
        "Science": 72,
        "English": 85,
        "Hindi": 80,
        "Social Science": 70,
        "Sanskrit": 65
      },
      weeklyProgress: [70, 75, 78, 82, 80, 85, 88]
    }
  });

  // Attendance Tracker Data
  const [attendance, setAttendance] = useState({
    class5: [
      { id: 1, name: "Rahul Kumar", rollNo: 15, attendance: 95, status: "regular", lastWeek: [1,1,1,1,1,0,1] },
      { id: 2, name: "Priya Sharma", rollNo: 16, attendance: 98, status: "regular", lastWeek: [1,1,1,1,1,1,1] },
      { id: 3, name: "Amit Patel", rollNo: 17, attendance: 88, status: "regular", lastWeek: [1,1,0,1,1,1,0] },
      { id: 4, name: "Rohan Singh", rollNo: 18, attendance: 75, status: "irregular", lastWeek: [0,1,0,1,0,1,0] },
      { id: 5, name: "Neha Gupta", rollNo: 19, attendance: 92, status: "regular", lastWeek: [1,1,1,1,0,1,1] }
    ],
    class6: [
      { id: 6, name: "Anjali Verma", rollNo: 20, attendance: 96, status: "regular", lastWeek: [1,1,1,1,1,1,1] },
      { id: 7, name: "Vikram Singh", rollNo: 21, attendance: 90, status: "regular", lastWeek: [1,1,1,0,1,1,1] }
    ]
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMarked, setAttendanceMarked] = useState({});

  // Gradebook Data
  const [gradebook, setGradebook] = useState({
    class5: [
      { id: 1, name: "Rahul Kumar", rollNo: 15, mathematics: 85, science: 78, english: 92, hindi: 88, social: 75, average: 83.6 },
      { id: 2, name: "Priya Sharma", rollNo: 16, mathematics: 92, science: 88, english: 95, hindi: 90, social: 85, average: 90 },
      { id: 3, name: "Amit Patel", rollNo: 17, mathematics: 78, science: 82, english: 85, hindi: 80, social: 72, average: 79.4 }
    ],
    class6: [
      { id: 4, name: "Anjali Verma", rollNo: 20, mathematics: 88, science: 85, english: 90, hindi: 86, social: 82, sanskrit: 75, average: 84.3 }
    ]
  });

  const [selectedExam, setSelectedExam] = useState("midterm");
  const [editingGrades, setEditingGrades] = useState(false);

  // Teacher Training Data
  const [trainingModules, setTrainingModules] = useState([
    {
      id: 1,
      title: "Modern Teaching Methodologies",
      category: "pedagogy",
      duration: "2 hours",
      progress: 80,
      completed: true,
      certificate: true,
      description: "Learn about modern teaching techniques and student engagement strategies"
    },
    {
      id: 2,
      title: "Classroom Management",
      category: "management",
      duration: "1.5 hours",
      progress: 60,
      completed: false,
      certificate: false,
      description: "Effective strategies for managing classroom behavior and creating positive learning environment"
    },
    {
      id: 3,
      title: "Educational Technology Tools",
      category: "technology",
      duration: "3 hours",
      progress: 30,
      completed: false,
      certificate: false,
      description: "Master digital tools and platforms for enhanced teaching"
    },
    {
      id: 4,
      title: "Student Assessment Techniques",
      category: "assessment",
      duration: "2.5 hours",
      progress: 100,
      completed: true,
      certificate: true,
      description: "Learn various assessment methods and grading strategies"
    },
    {
      id: 5,
      title: "Inclusive Education",
      category: "special",
      duration: "2 hours",
      progress: 0,
      completed: false,
      certificate: false,
      description: "Strategies for teaching diverse learners and inclusive classroom practices"
    }
  ]);

  const [trainingProgress, setTrainingProgress] = useState({
    completed: 2,
    inProgress: 2,
    total: 5,
    certificates: 2
  });

  // Report Data
  const [reports, setReports] = useState({
    attendance: {
      class5: { present: 42, absent: 3, late: 2, percentage: 92 },
      class6: { present: 38, absent: 4, late: 1, percentage: 88 }
    },
    performance: {
      class5: { above90: 12, between75to89: 18, between60to74: 10, below60: 5 },
      class6: { above90: 8, between75to89: 15, between60to74: 12, below60: 7 }
    },
    assignments: {
      class5: { submitted: 40, pending: 5, graded: 35, averageScore: 82 },
      class6: { submitted: 35, pending: 8, graded: 30, averageScore: 78 }
    }
  });

  const [generatedReport, setGeneratedReport] = useState(null);

  const handleUploadChange = (e) => {
    const { name, value } = e.target;
    setNewUpload(prev => ({
      ...prev,
      [name]: value,
      class: name === "class" ? value : prev.class
    }));
  };

  const handleFileChange = (e) => {
    setNewUpload(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    
    const uploadItem = {
      id: teacherUploads.length + 1,
      title: newUpload.title,
      type: newUpload.type,
      subject: newUpload.subject,
      class: newUpload.class,
      date: "Just now",
      status: "published",
      ...(newUpload.type === "notes" && { size: "2.3 MB", downloads: 0 }),
      ...(newUpload.type === "videos" && { duration: "25 min", views: 0 }),
      ...(newUpload.type === "assignments" && { dueDate: "March 25, 2024", submissions: 0, totalStudents: 45 }),
      ...(newUpload.type === "quizzes" && { questions: 10, attempts: 0 })
    };

    setTeacherUploads([uploadItem, ...teacherUploads]);
    
    setNewUpload({
      title: "",
      type: "notes",
      subject: "",
      class: selectedClass,
      description: "",
      file: null
    });
    
    document.getElementById("file-upload").value = "";
    alert("Material uploaded successfully!");
  };

  const deleteUpload = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setTeacherUploads(teacherUploads.filter(upload => upload.id !== id));
      alert("Material deleted successfully!");
    }
  };

  const editUpload = (id) => {
    const upload = teacherUploads.find(u => u.id === id);
    if (upload) {
      setNewUpload({
        title: upload.title,
        type: upload.type,
        subject: upload.subject,
        class: upload.class,
        description: upload.description || "",
        file: null
      });
      // Remove the old upload temporarily for editing
      setTeacherUploads(teacherUploads.filter(u => u.id !== id));
    }
  };

  const filteredUploads = teacherUploads.filter(upload => 
    upload.class === selectedClass && 
    (uploadType === "all" || upload.type === uploadType)
  );

  const getUploadStats = () => {
    return {
      total: teacherUploads.filter(u => u.class === selectedClass).length,
      notes: teacherUploads.filter(u => u.class === selectedClass && u.type === "notes").length,
      videos: teacherUploads.filter(u => u.class === selectedClass && u.type === "videos").length,
      assignments: teacherUploads.filter(u => u.class === selectedClass && u.type === "assignments").length,
      quizzes: teacherUploads.filter(u => u.class === selectedClass && u.type === "quizzes").length
    };
  };

  const stats_uploads = getUploadStats();

  // Course Builder Functions
  const handleCreateCourse = (e) => {
    e.preventDefault();
    const course = {
      id: courses.length + 1,
      name: newCourse.name,
      subject: newCourse.subject,
      class: newCourse.class,
      modules: [],
      totalLessons: 0,
      status: "draft"
    };
    setCourses([...courses, course]);
    setNewCourse({ name: "", subject: "", class: selectedClass, description: "" });
    alert("Course created successfully!");
  };

  const handleAddModule = (courseId) => {
    const module = {
      id: Math.random(),
      name: newModule.name,
      lessons: parseInt(newModule.lessons),
      duration: newModule.duration,
      status: "draft"
    };
    
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          modules: [...course.modules, module],
          totalLessons: course.totalLessons + module.lessons
        };
      }
      return course;
    }));
    
    setNewModule({ name: "", lessons: "", duration: "", courseId: null });
  };

  // Attendance Functions
  const markAttendance = (studentId, status) => {
    setAttendanceMarked({
      ...attendanceMarked,
      [studentId]: status
    });
  };

  const saveAttendance = () => {
    alert(`Attendance saved for ${selectedDate}`);
  };

  // Gradebook Functions
  const updateGrade = (studentId, subject, value) => {
    setGradebook(prev => ({
      ...prev,
      [selectedClass.toLowerCase().replace(' ', '')]: prev[selectedClass.toLowerCase().replace(' ', '')].map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [subject.toLowerCase()]: parseInt(value) };
          // Recalculate average
          const grades = Object.values(updatedStudent).filter(v => typeof v === 'number' && v !== student.id && v !== student.rollNo);
          updatedStudent.average = (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
          return updatedStudent;
        }
        return student;
      })
    }));
  };

  // Training Functions
  const startTraining = (moduleId) => {
    setTrainingModules(modules =>
      modules.map(m =>
        m.id === moduleId ? { ...m, progress: 10, completed: false } : m
      )
    );
  };

  const updateTrainingProgress = (moduleId, progress) => {
    setTrainingModules(modules =>
      modules.map(m => {
        if (m.id === moduleId) {
          const newProgress = Math.min(100, progress);
          const completed = newProgress === 100;
          return { ...m, progress: newProgress, completed };
        }
        return m;
      })
    );
  };

  // Report Functions
  const generateReport = () => {
    let reportData = {};
    
    switch(selectedReportType) {
      case "attendance":
        reportData = {
          title: "Attendance Report",
          data: reports.attendance[selectedClass.toLowerCase().replace(' ', '')],
          generated: new Date().toLocaleString()
        };
        break;
      case "performance":
        reportData = {
          title: "Academic Performance Report",
          data: reports.performance[selectedClass.toLowerCase().replace(' ', '')],
          generated: new Date().toLocaleString()
        };
        break;
      case "assignments":
        reportData = {
          title: "Assignment Completion Report",
          data: reports.assignments[selectedClass.toLowerCase().replace(' ', '')],
          generated: new Date().toLocaleString()
        };
        break;
      case "combined":
        reportData = {
          title: "Comprehensive Class Report",
          data: {
            attendance: reports.attendance[selectedClass.toLowerCase().replace(' ', '')],
            performance: reports.performance[selectedClass.toLowerCase().replace(' ', '')],
            assignments: reports.assignments[selectedClass.toLowerCase().replace(' ', '')]
          },
          generated: new Date().toLocaleString()
        };
        break;
    }
    
    setGeneratedReport(reportData);
  };

  const downloadReport = (format) => {
    alert(`Downloading report in ${format} format`);
  };

  return (
    <div className="teacher-page">
      <header className="teacher-header">
        <h1>Teacher Dashboard</h1>
        <p>Welcome back! Here's your teaching overview</p>
      </header>

      <nav className="teacher-nav">
        <button 
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === "schedule" ? "active" : ""}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
        <button 
          className={activeTab === "assignments" ? "active" : ""}
          onClick={() => setActiveTab("assignments")}
        >
          Assignments
        </button>
        <button 
          className={activeTab === "students" ? "active" : ""}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>
        <button 
          className={activeTab === "upload" ? "active" : ""}
          onClick={() => setActiveTab("upload")}
        >
          📤 Upload
        </button>
        <button 
          className={activeTab === "coursebuilder" ? "active" : ""}
          onClick={() => setActiveTab("coursebuilder")}
        >
          1️⃣ Course Builder
        </button>
        <button 
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          2️⃣ Class Analytics
        </button>
        <button 
          className={activeTab === "attendance" ? "active" : ""}
          onClick={() => setActiveTab("attendance")}
        >
          3️⃣ Attendance Tracker
        </button>
        <button 
          className={activeTab === "gradebook" ? "active" : ""}
          onClick={() => setActiveTab("gradebook")}
        >
          4️⃣ Gradebook
        </button>
        <button 
          className={activeTab === "training" ? "active" : ""}
          onClick={() => setActiveTab("training")}
        >
          5️⃣ Teacher Training
        </button>
        <button 
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          6️⃣ Download Reports
        </button>
      </nav>

      <main className="teacher-content">
        {activeTab === "dashboard" && (
          <section className="dashboard-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <span className="stat-icon">{stat.icon}</span>
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              ))}
            </div>

            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span>📝</span>
                  <p>New assignment posted for Class 5 - Mathematics</p>
                  <small>2 hours ago</small>
                </div>
                <div className="activity-item">
                  <span>✅</span>
                  <p>Graded 15 assignments for Class 6</p>
                  <small>5 hours ago</small>
                </div>
                <div className="activity-item">
                  <span>💬</span>
                  <p>Parent meeting scheduled for tomorrow</p>
                  <small>1 day ago</small>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "schedule" && (
          <section className="schedule-section">
            <h3>Today's Schedule</h3>
            <div className="class-selector">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className={selectedClass === cls ? "active" : ""}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls}
                </button>
              ))}
            </div>
            <div className="schedule-list">
              {schedule
                .filter((item) => item.class === selectedClass)
                .map((item, index) => (
                  <div key={index} className="schedule-item">
                    <div className="time">{item.time}</div>
                    <div className="details">
                      <h4>{item.subject}</h4>
                      <p>{item.class} - {item.room}</p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {activeTab === "assignments" && (
          <section className="assignments-section">
            <h3>Assignments</h3>
            <div className="assignment-list">
              <div className="assignment-card">
                <h4>Mathematics Homework</h4>
                <p>Class 5 - Due Tomorrow</p>
                <div className="assignment-actions">
                  <button>View Submissions</button>
                  <button>Grade</button>
                </div>
              </div>
              <div className="assignment-card">
                <h4>Science Project</h4>
                <p>Class 6 - Due in 3 days</p>
                <div className="assignment-actions">
                  <button>View Submissions</button>
                  <button>Grade</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "students" && (
          <section className="students-section">
            <h3>Students</h3>
            <div className="student-list">
              <div className="student-card">
                <div className="student-info">
                  <span className="student-avatar">👤</span>
                  <div>
                    <h4>Rahul Kumar</h4>
                    <p>Class 5 - Roll No: 15</p>
                  </div>
                </div>
                <div className="student-actions">
                  <button>View Profile</button>
                  <button>Send Message</button>
                </div>
              </div>
              <div className="student-card">
                <div className="student-info">
                  <span className="student-avatar">👤</span>
                  <div>
                    <h4>Priya Sharma</h4>
                    <p>Class 5 - Roll No: 16</p>
                  </div>
                </div>
                <div className="student-actions">
                  <button>View Profile</button>
                  <button>Send Message</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "upload" && (
          <section className="upload-section">
            <h3>📤 Upload Study Materials</h3>
            
            <div className="class-selector upload-class-selector">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className={selectedClass === cls ? "active" : ""}
                  onClick={() => {
                    setSelectedClass(cls);
                    setNewUpload(prev => ({ ...prev, class: cls }));
                  }}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="upload-stats">
              <div className="stat-item">
                <span>📊 Total</span>
                <h4>{stats_uploads.total}</h4>
              </div>
              <div className="stat-item">
                <span>📄 Notes</span>
                <h4>{stats_uploads.notes}</h4>
              </div>
              <div className="stat-item">
                <span>🎥 Videos</span>
                <h4>{stats_uploads.videos}</h4>
              </div>
              <div className="stat-item">
                <span>📝 Assignments</span>
                <h4>{stats_uploads.assignments}</h4>
              </div>
              <div className="stat-item">
                <span>❓ Quizzes</span>
                <h4>{stats_uploads.quizzes}</h4>
              </div>
            </div>

            <div className="upload-form-container">
              <h4>Upload New Material</h4>
              <form onSubmit={handleUploadSubmit} className="upload-form">
                <div className="form-group">
                  <label>Material Type:</label>
                  <select 
                    name="type" 
                    value={newUpload.type} 
                    onChange={handleUploadChange}
                    required
                  >
                    <option value="notes">📄 Notes (PDF)</option>
                    <option value="videos">🎥 Video Lecture</option>
                    <option value="assignments">📝 Assignment</option>
                    <option value="quizzes">❓ Quiz</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject:</label>
                  <select 
                    name="subject" 
                    value={newUpload.subject} 
                    onChange={handleUploadChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects[selectedClass]?.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newUpload.title}
                    onChange={handleUploadChange}
                    placeholder="Enter title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description (Optional):</label>
                  <textarea
                    name="description"
                    value={newUpload.description}
                    onChange={handleUploadChange}
                    placeholder="Add description"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Upload File:</label>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept={
                      newUpload.type === "notes" ? ".pdf,.doc,.docx" :
                      newUpload.type === "videos" ? ".mp4,.webm,.avi" :
                      newUpload.type === "assignments" ? ".pdf,.doc,.docx" :
                      ".pdf,.txt"
                    }
                    required
                  />
                  <small>
                    {newUpload.type === "notes" && "Supported: PDF, DOC, DOCX"}
                    {newUpload.type === "videos" && "Supported: MP4, WebM, AVI"}
                    {newUpload.type === "assignments" && "Supported: PDF, DOC, DOCX"}
                    {newUpload.type === "quizzes" && "Supported: PDF, TXT"}
                  </small>
                </div>

                <button type="submit" className="upload-submit-btn">
                  📤 Upload Material
                </button>
              </form>
            </div>

            <div className="upload-filter-tabs">
              <button 
                className={uploadType === "all" ? "active" : ""}
                onClick={() => setUploadType("all")}
              >
                All
              </button>
              <button 
                className={uploadType === "notes" ? "active" : ""}
                onClick={() => setUploadType("notes")}
              >
                📄 Notes
              </button>
              <button 
                className={uploadType === "videos" ? "active" : ""}
                onClick={() => setUploadType("videos")}
              >
                🎥 Videos
              </button>
              <button 
                className={uploadType === "assignments" ? "active" : ""}
                onClick={() => setUploadType("assignments")}
              >
                📝 Assignments
              </button>
              <button 
                className={uploadType === "quizzes" ? "active" : ""}
                onClick={() => setUploadType("quizzes")}
              >
                ❓ Quizzes
              </button>
            </div>

            <div className="uploaded-materials">
              <h4>Your Uploaded Materials - {selectedClass}</h4>
              <div className="materials-grid">
                {filteredUploads.map((upload) => (
                  <div key={upload.id} className="material-card">
                    <div className="material-icon">
                      {upload.type === "notes" && "📄"}
                      {upload.type === "videos" && "🎥"}
                      {upload.type === "assignments" && "📝"}
                      {upload.type === "quizzes" && "❓"}
                    </div>
                    <div className="material-info">
                      <h5>{upload.title}</h5>
                      <p>{upload.subject}</p>
                      <div className="material-meta">
                        {upload.type === "notes" && (
                          <>
                            <span>📄 {upload.size}</span>
                            <span>⬇️ {upload.downloads} downloads</span>
                          </>
                        )}
                        {upload.type === "videos" && (
                          <>
                            <span>⏱️ {upload.duration}</span>
                            <span>👁️ {upload.views} views</span>
                          </>
                        )}
                        {upload.type === "assignments" && (
                          <>
                            <span>📅 Due: {upload.dueDate}</span>
                            <span>📊 {upload.submissions}/{upload.totalStudents} submitted</span>
                          </>
                        )}
                        {upload.type === "quizzes" && (
                          <>
                            <span>❓ {upload.questions} questions</span>
                            <span>📊 {upload.attempts} attempts</span>
                          </>
                        )}
                      </div>
                      <small>Uploaded {upload.date}</small>
                    </div>
                    <div className="material-actions">
                      <button className="edit-btn" onClick={() => editUpload(upload.id)}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => deleteUpload(upload.id)}>🗑️ Delete</button>
                      <button className="stats-btn" onClick={() => alert(`Stats for ${upload.title}`)}>📊 Stats</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 1️⃣ Course Builder */}
        {activeTab === "coursebuilder" && (
          <section className="course-builder-section">
            <h3>1️⃣ Course Builder</h3>
            
            <div className="class-selector">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className={selectedClass === cls ? "active" : ""}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="course-builder-grid">
              {/* Create New Course */}
              <div className="create-course-card">
                <h4>Create New Course</h4>
                <form onSubmit={handleCreateCourse}>
                  <div className="form-group">
                    <label>Course Name:</label>
                    <input
                      type="text"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                      placeholder="e.g., Advanced Mathematics"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject:</label>
                    <select
                      value={newCourse.subject}
                      onChange={(e) => setNewCourse({...newCourse, subject: e.target.value})}
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects[selectedClass]?.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      placeholder="Course description"
                      rows="3"
                    />
                  </div>
                  <button type="submit" className="create-btn">Create Course</button>
                </form>
              </div>

              {/* Course List */}
              <div className="course-list-card">
                <h4>Your Courses</h4>
                {courses.filter(c => c.class === selectedClass).map(course => (
                  <div key={course.id} className="course-item">
                    <div className="course-header">
                      <h5>{course.name}</h5>
                      <span className={`status-badge ${course.status}`}>{course.status}</span>
                    </div>
                    <p>Total Lessons: {course.totalLessons}</p>
                    <div className="course-modules">
                      <h6>Modules:</h6>
                      {course.modules.map(module => (
                        <div key={module.id} className="module-item">
                          <span>{module.name}</span>
                          <span className="module-details">{module.lessons} lessons • {module.duration}</span>
                          <span className={`status-badge small ${module.status}`}>{module.status}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add Module Form */}
                    <div className="add-module-form">
                      <h6>Add New Module</h6>
                      <div className="module-inputs">
                        <input
                          type="text"
                          placeholder="Module name"
                          value={newModule.courseId === course.id ? newModule.name : ""}
                          onChange={(e) => setNewModule({...newModule, name: e.target.value, courseId: course.id})}
                        />
                        <input
                          type="number"
                          placeholder="Lessons"
                          value={newModule.courseId === course.id ? newModule.lessons : ""}
                          onChange={(e) => setNewModule({...newModule, lessons: e.target.value, courseId: course.id})}
                        />
                        <input
                          type="text"
                          placeholder="Duration"
                          value={newModule.courseId === course.id ? newModule.duration : ""}
                          onChange={(e) => setNewModule({...newModule, duration: e.target.value, courseId: course.id})}
                        />
                        <button onClick={() => handleAddModule(course.id)} className="add-btn">Add</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 2️⃣ Class Analytics */}
        {activeTab === "analytics" && (
          <section className="analytics-section">
            <h3>2️⃣ Class Analytics</h3>
            
            <div className="class-selector">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className={selectedClass === cls ? "active" : ""}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="analytics-grid">
              {/* Overview Cards */}
              <div className="analytics-card">
                <h4>Class Overview</h4>
                <div className="overview-stats">
                  <div className="stat">
                    <span className="stat-label">Average Attendance</span>
                    <span className="stat-value">{analytics[selectedClass.toLowerCase().replace(' ', '')]?.averageAttendance || 0}%</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Average Marks</span>
                    <span className="stat-value">{analytics[selectedClass.toLowerCase().replace(' ', '')]?.averageMarks || 0}%</span>
                  </div>
                </div>
              </div>

              {/* Top Students */}
              <div className="analytics-card">
                <h4>Top Performers ⭐</h4>
                <ul className="student-list">
                  {analytics[selectedClass.toLowerCase().replace(' ', '')]?.topStudents.map((student, idx) => (
                    <li key={idx}>{student}</li>
                  ))}
                </ul>
              </div>

              {/* Students Needing Attention */}
              <div className="analytics-card warning">
                <h4>Need Attention ⚠️</h4>
                <ul className="student-list">
                  {analytics[selectedClass.toLowerCase().replace(' ', '')]?.strugglingStudents.map((student, idx) => (
                    <li key={idx}>{student}</li>
                  ))}
                </ul>
              </div>

              {/* Subject Performance */}
              <div className="analytics-card wide">
                <h4>Subject-wise Performance</h4>
                <div className="subject-performance">
                  {Object.entries(analytics[selectedClass.toLowerCase().replace(' ', '')]?.subjectPerformance || {}).map(([subject, score]) => (
                    <div key={subject} className="subject-bar">
                      <span className="subject-name">{subject}</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${score}%` }}></div>
                      </div>
                      <span className="subject-score">{score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="analytics-card wide">
                <h4>Weekly Progress Trend</h4>
                <div className="weekly-progress">
                  {analytics[selectedClass.toLowerCase().replace(' ', '')]?.weeklyProgress.map((progress, week) => (
                    <div key={week} className="week-bar">
                      <div className="bar" style={{ height: `${progress}%` }}>
                        <span className="bar-value">{progress}%</span>
                      </div>
                      <span className="week-label">Week {week + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3️⃣ Attendance Tracker */}
        {activeTab === "attendance" && (
          <section className="attendance-section">
            <h3>3️⃣ Attendance Tracker</h3>
            
            <div className="class-selector">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className={selectedClass === cls ? "active" : ""}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="attendance-controls">
              <div className="date-selector">
                <label>Select Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <button onClick={saveAttendance} className="save-attendance-btn">Save Attendance</button>
            </div>

            <div className="attendance-summary">
              <div className="summary-card present">
                <span>Present</span>
                <h3>{attendance[selectedClass.toLowerCase().replace(' ', '')]?.filter(s => s.attendance > 85).length || 0}</h3>
              </div>
              <div className="summary-card absent">
                <span>Absent Today</span>
                <h3>{attendance[selectedClass.toLowerCase().replace(' ', '')]?.filter(s => s.lastWeek[6] === 0).length || 0}</h3>
              </div>
              <div className="summary-card total">
                <span>Total Students</span>
                <h3>{attendance[selectedClass.toLowerCase().replace(' ', '')]?.length || 0}</h3>
              </div>
            </div>

            <div className="attendance-table">
              <table>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Overall %</th>
                    <th>Last Week</th>
                    <th>Today's Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance[selectedClass.toLowerCase().replace(' ', '')]?.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>
                        <span className={`attendance-percent ${student.attendance < 80 ? 'low' : ''}`}>
                          {student.attendance}%
                        </span>
                      </td>
                      <td>
                        <div className="week-indicator">
                          {student.lastWeek.map((present, day) => (
                            <span key={day} className={`day-indicator ${present ? 'present' : 'absent'}`}>
                              {present ? 'P' : 'A'}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <select
                          value={attendanceMarked[student.id] || ''}
                          onChange={(e) => markAttendance(student.id, e.target.value)}
                          className="attendance-select"
                        >
                          <option value="">Select</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                          <option value="holiday">Holiday</option>
                        </select>
                      </td>
                      <td>
                        <button className="view-history-btn">View History</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 4️⃣ Gradebook */}
        {activeTab === "gradebook" && (
          <section className="gradebook-section">
            <h3>4️⃣ Gradebook</h3>
            
            <div className="class-selector">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className={selectedClass === cls ? "active" : ""}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="gradebook-controls">
              <div className="exam-selector">
                <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                  <option value="midterm">Mid Term Exams</option>
                  <option value="final">Final Exams</option>
                  <option value="weekly">Weekly Tests</option>
                  <option value="assignments">Assignments</option>
                </select>
              </div>
              <button 
                className="edit-grades-btn"
                onClick={() => setEditingGrades(!editingGrades)}
              >
                {editingGrades ? 'Done Editing' : 'Edit Grades'}
              </button>
            </div>

            <div className="gradebook-table-container">
              <table className="gradebook-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    {subjects[selectedClass]?.map(subject => (
                      <th key={subject}>{subject}</th>
                    ))}
                    <th>Average</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {gradebook[selectedClass.toLowerCase().replace(' ', '')]?.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      {subjects[selectedClass]?.map(subject => {
                        const subjectKey = subject.toLowerCase().replace(' ', '');
                        return (
                          <td key={subject}>
                            {editingGrades ? (
                              <input
                                type="number"
                                value={student[subjectKey] || 0}
                                onChange={(e) => updateGrade(student.id, subject, e.target.value)}
                                className="grade-input"
                                min="0"
                                max="100"
                              />
                            ) : (
                              student[subjectKey] || '-'
                            )}
                          </td>
                        );
                      })}
                      <td className="average-cell">{student.average}</td>
                      <td>
                        <span className={`grade-badge ${
                          student.average >= 90 ? 'a-plus' :
                          student.average >= 80 ? 'a' :
                          student.average >= 70 ? 'b' :
                          student.average >= 60 ? 'c' : 'd'
                        }`}>
                          {student.average >= 90 ? 'A+' :
                           student.average >= 80 ? 'A' :
                           student.average >= 70 ? 'B' :
                           student.average >= 60 ? 'C' : 'D'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="gradebook-summary">
              <h4>Class Summary</h4>
              <div className="summary-stats">
                <div className="summary-stat">
                  <span>Class Average</span>
                  <h3>82.5%</h3>
                </div>
                <div className="summary-stat">
                  <span>Highest Score</span>
                  <h3>98%</h3>
                </div>
                <div className="summary-stat">
                  <span>Passing Rate</span>
                  <h3>94%</h3>
                </div>
                <div className="summary-stat">
                  <span>Total Students</span>
                  <h3>45</h3>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5️⃣ Teacher Training */}
        {activeTab === "training" && (
          <section className="training-section">
            <h3>5️⃣ Teacher Training & Development</h3>
            
            <div className="training-progress">
              <div className="progress-card">
                <span>Completed Modules</span>
                <h3>{trainingProgress.completed}/{trainingProgress.total}</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(trainingProgress.completed / trainingProgress.total) * 100}%` }}></div>
                </div>
              </div>
              <div className="progress-card">
                <span>In Progress</span>
                <h3>{trainingProgress.inProgress}</h3>
              </div>
              <div className="progress-card">
                <span>Certificates Earned</span>
                <h3>{trainingProgress.certificates}</h3>
              </div>
            </div>

            <div className="training-filters">
              <button 
                className={selectedTrainingModule === "all" ? "active" : ""}
                onClick={() => setSelectedTrainingModule("all")}
              >
                All Modules
              </button>
              <button 
                className={selectedTrainingModule === "pedagogy" ? "active" : ""}
                onClick={() => setSelectedTrainingModule("pedagogy")}
              >
                Pedagogy
              </button>
              <button 
                className={selectedTrainingModule === "technology" ? "active" : ""}
                onClick={() => setSelectedTrainingModule("technology")}
              >
                Technology
              </button>
              <button 
                className={selectedTrainingModule === "management" ? "active" : ""}
                onClick={() => setSelectedTrainingModule("management")}
              >
                Management
              </button>
              <button 
                className={selectedTrainingModule === "assessment" ? "active" : ""}
                onClick={() => setSelectedTrainingModule("assessment")}
              >
                Assessment
              </button>
            </div>

            <div className="training-modules">
              {trainingModules
                .filter(m => selectedTrainingModule === "all" || m.category === selectedTrainingModule)
                .map(module => (
                <div key={module.id} className="training-card">
                  <div className="training-header">
                    <h4>{module.title}</h4>
                    <span className={`status-badge ${module.completed ? 'completed' : 'in-progress'}`}>
                      {module.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <p className="training-description">{module.description}</p>
                  <div className="training-meta">
                    <span>⏱️ {module.duration}</span>
                    <span>📊 {module.progress}% complete</span>
                    {module.certificate && <span>🏆 Certificate Available</span>}
                  </div>
                  <div className="training-progress-bar">
                    <div className="progress-fill" style={{ width: `${module.progress}%` }}></div>
                  </div>
                  <div className="training-actions">
                    {module.progress === 0 ? (
                      <button onClick={() => startTraining(module.id)} className="start-btn">Start Module</button>
                    ) : module.progress < 100 ? (
                      <>
                        <button onClick={() => updateTrainingProgress(module.id, module.progress + 10)} className="continue-btn">
                          Continue ({module.progress}%)
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={module.progress}
                          onChange={(e) => updateTrainingProgress(module.id, parseInt(e.target.value))}
                          className="progress-slider"
                        />
                      </>
                    ) : (
                      <>
                        <button className="review-btn">Review Module</button>
                        {module.certificate && <button className="certificate-btn">Download Certificate</button>}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6️⃣ Download Reports */}
        {activeTab === "reports" && (
          <section className="reports-section">
            <h3>6️⃣ Download Reports</h3>
            
            <div className="class-selector">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className={selectedClass === cls ? "active" : ""}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="reports-grid">
              {/* Report Type Selection */}
              <div className="report-generator">
                <h4>Generate Report</h4>
                <div className="form-group">
                  <label>Report Type:</label>
                  <select 
                    value={selectedReportType}
                    onChange={(e) => setSelectedReportType(e.target.value)}
                  >
                    <option value="attendance">Attendance Report</option>
                    <option value="performance">Academic Performance</option>
                    <option value="assignments">Assignment Completion</option>
                    <option value="combined">Comprehensive Class Report</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date Range:</label>
                  <select>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Semester</option>
                    <option>Custom Range</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Format:</label>
                  <div className="format-options">
                    <label>
                      <input type="radio" name="format" value="pdf" defaultChecked /> PDF
                    </label>
                    <label>
                      <input type="radio" name="format" value="excel" /> Excel
                    </label>
                    <label>
                      <input type="radio" name="format" value="csv" /> CSV
                    </label>
                  </div>
                </div>

                <button onClick={generateReport} className="generate-btn">Generate Report</button>
              </div>

              {/* Generated Report Preview */}
              {generatedReport && (
                <div className="report-preview">
                  <h4>Report Preview</h4>
                  <div className="report-content">
                    <h5>{generatedReport.title}</h5>
                    <p>Class: {selectedClass}</p>
                    <p>Generated: {generatedReport.generated}</p>
                    
                    {selectedReportType === "attendance" && (
                      <div className="report-data">
                        <div className="data-item">
                          <span>Present:</span>
                          <strong>{generatedReport.data.present}</strong>
                        </div>
                        <div className="data-item">
                          <span>Absent:</span>
                          <strong>{generatedReport.data.absent}</strong>
                        </div>
                        <div className="data-item">
                          <span>Late:</span>
                          <strong>{generatedReport.data.late}</strong>
                        </div>
                        <div className="data-item">
                          <span>Percentage:</span>
                          <strong>{generatedReport.data.percentage}%</strong>
                        </div>
                      </div>
                    )}

                    {selectedReportType === "performance" && (
                      <div className="report-data">
                        <div className="data-item">
                          <span>Above 90%:</span>
                          <strong>{generatedReport.data.above90}</strong>
                        </div>
                        <div className="data-item">
                          <span>75-89%:</span>
                          <strong>{generatedReport.data.between75to89}</strong>
                        </div>
                        <div className="data-item">
                          <span>60-74%:</span>
                          <strong>{generatedReport.data.between60to74}</strong>
                        </div>
                        <div className="data-item">
                          <span>Below 60%:</span>
                          <strong>{generatedReport.data.below60}</strong>
                        </div>
                      </div>
                    )}

                    {selectedReportType === "assignments" && (
                      <div className="report-data">
                        <div className="data-item">
                          <span>Submitted:</span>
                          <strong>{generatedReport.data.submitted}</strong>
                        </div>
                        <div className="data-item">
                          <span>Pending:</span>
                          <strong>{generatedReport.data.pending}</strong>
                        </div>
                        <div className="data-item">
                          <span>Graded:</span>
                          <strong>{generatedReport.data.graded}</strong>
                        </div>
                        <div className="data-item">
                          <span>Average Score:</span>
                          <strong>{generatedReport.data.averageScore}%</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="report-actions">
                    <button onClick={() => downloadReport('pdf')} className="download-btn">⬇️ Download PDF</button>
                    <button onClick={() => downloadReport('excel')} className="download-btn">📊 Download Excel</button>
                    <button className="print-btn">🖨️ Print</button>
                    <button className="email-btn">📧 Email Report</button>
                  </div>
                </div>
              )}

              {/* Quick Download Options */}
              <div className="quick-downloads">
                <h4>Quick Downloads</h4>
                <div className="quick-download-list">
                  <div className="quick-item">
                    <span>Monthly Attendance Report</span>
                    <div>
                      <button className="pdf-btn">PDF</button>
                      <button className="excel-btn">Excel</button>
                    </div>
                  </div>
                  <div className="quick-item">
                    <span>Grade Sheet - All Subjects</span>
                    <div>
                      <button className="pdf-btn">PDF</button>
                      <button className="excel-btn">Excel</button>
                    </div>
                  </div>
                  <div className="quick-item">
                    <span>Assignment Completion Summary</span>
                    <div>
                      <button className="pdf-btn">PDF</button>
                      <button className="excel-btn">Excel</button>
                    </div>
                  </div>
                  <div className="quick-item">
                    <span>Student Performance Analysis</span>
                    <div>
                      <button className="pdf-btn">PDF</button>
                      <button className="excel-btn">Excel</button>
                    </div>
                  </div>
                  <div className="quick-item">
                    <span>Parent-Teacher Meeting Schedule</span>
                    <div>
                      <button className="pdf-btn">PDF</button>
                      <button className="excel-btn">Excel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TeacherPage;