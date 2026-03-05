import React, { useState, useEffect } from "react";
import "./StudentPage.css";
import { useAuth } from "../context/AuthContext";

const classes = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
  "Class 11", "Class 12"
];

const courses = [
  // Class 1-5 (Primary School)
  { subject: "Mathematics", class: "Class 1", lessons: 15, progress: 80, notes: true, videos: true },
  { subject: "English", class: "Class 1", lessons: 12, progress: 75, notes: true, videos: true },
  { subject: "Hindi", class: "Class 1", lessons: 10, progress: 90, notes: true, videos: true },
  { subject: "EVS", class: "Class 1", lessons: 8, progress: 70, notes: true, videos: true },
  
  { subject: "Mathematics", class: "Class 2", lessons: 16, progress: 85, notes: true, videos: true },
  { subject: "English", class: "Class 2", lessons: 14, progress: 80, notes: true, videos: true },
  { subject: "Hindi", class: "Class 2", lessons: 12, progress: 88, notes: true, videos: true },
  { subject: "EVS", class: "Class 2", lessons: 10, progress: 75, notes: true, videos: true },
  
  { subject: "Mathematics", class: "Class 3", lessons: 18, progress: 70, notes: true, videos: true },
  { subject: "English", class: "Class 3", lessons: 16, progress: 75, notes: true, videos: true },
  { subject: "Hindi", class: "Class 3", lessons: 14, progress: 85, notes: true, videos: true },
  { subject: "Science", class: "Class 3", lessons: 12, progress: 65, notes: true, videos: true },
  { subject: "Social Studies", class: "Class 3", lessons: 10, progress: 70, notes: true, videos: true },
  
  { subject: "Mathematics", class: "Class 4", lessons: 20, progress: 75, notes: true, videos: true },
  { subject: "English", class: "Class 4", lessons: 18, progress: 80, notes: true, videos: true },
  { subject: "Hindi", class: "Class 4", lessons: 16, progress: 85, notes: true, videos: true },
  { subject: "Science", class: "Class 4", lessons: 14, progress: 70, notes: true, videos: true },
  { subject: "Social Studies", class: "Class 4", lessons: 12, progress: 75, notes: true, videos: true },
  
  { subject: "Mathematics", class: "Class 5", lessons: 22, progress: 80, notes: true, videos: true },
  { subject: "English", class: "Class 5", lessons: 20, progress: 85, notes: true, videos: true },
  { subject: "Hindi", class: "Class 5", lessons: 18, progress: 90, notes: true, videos: true },
  { subject: "Science", class: "Class 5", lessons: 16, progress: 75, notes: true, videos: true },
  { subject: "Social Studies", class: "Class 5", lessons: 14, progress: 80, notes: true, videos: true },
  
  // Class 6-8 (Middle School)
  { subject: "Mathematics", class: "Class 6", lessons: 25, progress: 70, notes: true, videos: true },
  { subject: "Science", class: "Class 6", lessons: 22, progress: 65, notes: true, videos: true },
  { subject: "English", class: "Class 6", lessons: 20, progress: 75, notes: true, videos: true },
  { subject: "Hindi", class: "Class 6", lessons: 18, progress: 80, notes: true, videos: true },
  { subject: "Social Science", class: "Class 6", lessons: 20, progress: 70, notes: true, videos: true },
  { subject: "Sanskrit", class: "Class 6", lessons: 15, progress: 60, notes: true, videos: true },
  
  { subject: "Mathematics", class: "Class 7", lessons: 28, progress: 75, notes: true, videos: true },
  { subject: "Science", class: "Class 7", lessons: 24, progress: 70, notes: true, videos: true },
  { subject: "English", class: "Class 7", lessons: 22, progress: 80, notes: true, videos: true },
  { subject: "Hindi", class: "Class 7", lessons: 20, progress: 85, notes: true, videos: true },
  { subject: "Social Science", class: "Class 7", lessons: 22, progress: 75, notes: true, videos: true },
  { subject: "Sanskrit", class: "Class 7", lessons: 18, progress: 65, notes: true, videos: true },
  { subject: "Computer", class: "Class 7", lessons: 15, progress: 90, notes: true, videos: true },
  
  { subject: "Mathematics", class: "Class 8", lessons: 30, progress: 80, notes: true, videos: true },
  { subject: "Science", class: "Class 8", lessons: 26, progress: 75, notes: true, videos: true },
  { subject: "English", class: "Class 8", lessons: 24, progress: 85, notes: true, videos: true },
  { subject: "Hindi", class: "Class 8", lessons: 22, progress: 88, notes: true, videos: true },
  { subject: "Social Science", class: "Class 8", lessons: 24, progress: 78, notes: true, videos: true },
  { subject: "Sanskrit", class: "Class 8", lessons: 20, progress: 70, notes: true, videos: true },
  { subject: "Computer", class: "Class 8", lessons: 18, progress: 92, notes: true, videos: true },
  
  // Class 9-10 (Secondary School)
  { subject: "Mathematics", class: "Class 9", lessons: 35, progress: 65, notes: true, videos: true },
  { subject: "Science", class: "Class 9", lessons: 32, progress: 60, notes: true, videos: true },
  { subject: "English", class: "Class 9", lessons: 28, progress: 70, notes: true, videos: true },
  { subject: "Hindi", class: "Class 9", lessons: 26, progress: 75, notes: true, videos: true },
  { subject: "Social Science", class: "Class 9", lessons: 30, progress: 68, notes: true, videos: true },
  { subject: "Sanskrit", class: "Class 9", lessons: 24, progress: 62, notes: true, videos: true },
  { subject: "Computer", class: "Class 9", lessons: 22, progress: 85, notes: true, videos: true },
  
  { subject: "Mathematics", class: "Class 10", lessons: 40, progress: 55, notes: true, videos: true },
  { subject: "Science", class: "Class 10", lessons: 35, progress: 50, notes: true, videos: true },
  { subject: "English", class: "Class 10", lessons: 30, progress: 65, notes: true, videos: true },
  { subject: "Hindi", class: "Class 10", lessons: 28, progress: 70, notes: true, videos: true },
  { subject: "Social Science", class: "Class 10", lessons: 32, progress: 60, notes: true, videos: true },
  { subject: "Sanskrit", class: "Class 10", lessons: 26, progress: 58, notes: true, videos: true },
  { subject: "Computer", class: "Class 10", lessons: 25, progress: 80, notes: true, videos: true },
  
  // Class 11-12 (Higher Secondary) - Science Stream
  { subject: "Physics", class: "Class 11", lessons: 45, progress: 40, notes: true, videos: true },
  { subject: "Chemistry", class: "Class 11", lessons: 42, progress: 35, notes: true, videos: true },
  { subject: "Mathematics", class: "Class 11", lessons: 48, progress: 30, notes: true, videos: true },
  { subject: "Biology", class: "Class 11", lessons: 40, progress: 45, notes: true, videos: true },
  { subject: "English", class: "Class 11", lessons: 30, progress: 60, notes: true, videos: true },
  { subject: "Computer Science", class: "Class 11", lessons: 35, progress: 50, notes: true, videos: true },
  
  { subject: "Physics", class: "Class 12", lessons: 50, progress: 25, notes: true, videos: true },
  { subject: "Chemistry", class: "Class 12", lessons: 48, progress: 20, notes: true, videos: true },
  { subject: "Mathematics", class: "Class 12", lessons: 52, progress: 15, notes: true, videos: true },
  { subject: "Biology", class: "Class 12", lessons: 45, progress: 30, notes: true, videos: true },
  { subject: "English", class: "Class 12", lessons: 32, progress: 55, notes: true, videos: true },
  { subject: "Computer Science", class: "Class 12", lessons: 38, progress: 40, notes: true, videos: true },
];

const quickLinks = [
  { title: "Notes", type: "PDF", icon: "📄", count: "150+" },
  { title: "Videos", type: "Video", icon: "🎥", count: "200+" },
  { title: "Quizzes", type: "Quiz", icon: "📝", count: "75+" },
  { title: "Assignments", type: "Assignment", icon: "📚", count: "100+" },
];

const recentUploads = [
  // Class 1-5 Uploads
  { title: "Math Basics - Addition", type: "PDF", subject: "Mathematics", class: "Class 1", date: "2 hours ago", size: "1.2 MB" },
  { title: "Alphabet Song", type: "Video", subject: "English", class: "Class 1", date: "3 hours ago", duration: "15 min" },
  { title: "Numbers Quiz", type: "Quiz", subject: "Mathematics", class: "Class 2", date: "5 hours ago", questions: 10 },
  { title: "Science Experiment - Plants", type: "Video", subject: "Science", class: "Class 3", date: "1 day ago", duration: "25 min" },
  
  // Class 6-8 Uploads
  { title: "Algebra Notes", type: "PDF", subject: "Mathematics", class: "Class 6", date: "4 hours ago", size: "2.5 MB" },
  { title: "Cell Structure Video", type: "Video", subject: "Science", class: "Class 8", date: "6 hours ago", duration: "35 min" },
  { title: "Hindi Grammar PDF", type: "PDF", subject: "Hindi", class: "Class 7", date: "8 hours ago", size: "1.8 MB" },
  { title: "Computer Basics", type: "Video", subject: "Computer", class: "Class 7", date: "12 hours ago", duration: "40 min" },
  
  // Class 9-10 Uploads
  { title: "Trigonometry Formulas", type: "PDF", subject: "Mathematics", class: "Class 9", date: "1 day ago", size: "3.2 MB" },
  { title: "Chemical Reactions", type: "Video", subject: "Science", class: "Class 10", date: "1 day ago", duration: "45 min" },
  { title: "History Notes - Chapter 5", type: "PDF", subject: "Social Science", class: "Class 9", date: "2 days ago", size: "2.8 MB" },
  
  // Class 11-12 Uploads
  { title: "Physics - Electrostatics", type: "PDF", subject: "Physics", class: "Class 12", date: "2 days ago", size: "4.5 MB" },
  { title: "Organic Chemistry", type: "Video", subject: "Chemistry", class: "Class 11", date: "3 days ago", duration: "55 min" },
  { title: "Calculus Practice", type: "PDF", subject: "Mathematics", class: "Class 12", date: "3 days ago", size: "3.8 MB" },
  { title: "DNA Structure", type: "Video", subject: "Biology", class: "Class 11", date: "4 days ago", duration: "50 min" },
];

const announcements = [
  { title: "Science Exhibition 2024", date: "March 15, 2024", type: "event", class: "All Classes" },
  { title: "Annual Examination Schedule", date: "March 20, 2024", type: "exam", class: "All Classes" },
  { title: "Parent-Teacher Meeting", date: "March 10, 2024", type: "meeting", class: "All Classes" },
  { title: "Mathematics Olympiad", date: "March 25, 2024", type: "event", class: "Class 6-12" },
  { title: "Holiday - Holi", date: "March 25, 2024", type: "holiday", class: "All Classes" },
  { title: "Science Quiz Competition", date: "April 5, 2024", type: "event", class: "Class 8-12" },
];

export default function StudentPage() {
  const { userClass } = useAuth();
  const [selectedClass, setSelectedClass] = useState(userClass || "Class 1");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [showClassSelection, setShowClassSelection] = useState(!userClass);

  useEffect(() => {
    if (userClass) {
      setSelectedClass(userClass);
      setShowClassSelection(false);
    }
  }, [userClass]);

  const filteredCourses = courses.filter(course => course.class === selectedClass);
  const filteredUploads = recentUploads.filter(upload => 
    (upload.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    upload.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSubject === "all" || upload.subject === selectedSubject)
  );

  const subjects = [...new Set(filteredCourses.map(course => course.subject))];

  return (
    <div className="student-page">
      {/* Class Selection Modal - Show if no class is selected */}
      {showClassSelection && (
        <div className="class-selection-modal">
          <div className="modal-content">
            <h2>📋 Select Your Class</h2>
            <p>Please select your class to continue</p>
            <div className="class-buttons">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setShowClassSelection(false);
                  }}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="student-header">
        <h1>Student Dashboard - {selectedClass}</h1>
        <p>Welcome back! Keep learning and growing</p>
        <div className="student-info">
          <span>📚 Student ID: AMIT2024001</span>
          <span>🎓 Roll No: 24CS101</span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="student-nav">
        <button 
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button 
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => setActiveTab("courses")}
        >
          📚 My Courses
        </button>
        <button 
          className={activeTab === "assignments" ? "active" : ""}
          onClick={() => setActiveTab("assignments")}
        >
          📝 Assignments
        </button>
        <button 
          className={activeTab === "resources" ? "active" : ""}
          onClick={() => setActiveTab("resources")}
        >
          📖 Study Resources
        </button>
        <button 
          className={activeTab === "videos" ? "active" : ""}
          onClick={() => setActiveTab("videos")}
        >
          🎥 Video Library
        </button>
        <button 
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => setActiveTab("notes")}
        >
          📄 Notes
        </button>
      </nav>

      <main className="student-content">
        {activeTab === "dashboard" && (
          <>
            {/* Search Bar */}
            <section className="search-section">
              <input
                type="text"
                placeholder="🔍 Search courses, notes, videos, or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>Search</button>
            </section>

            {/* Stats */}
            <section className="stats-section">
              <div className="stat-card">
                <span>📚</span>
                <h3>{filteredCourses.length}</h3>
                <p>Active Courses</p>
              </div>
              <div className="stat-card">
                <span>✅</span>
                <h3>
                  {Math.round(filteredCourses.reduce((acc, course) => acc + course.progress, 0) / filteredCourses.length || 0)}%
                </h3>
                <p>Avg Progress</p>
              </div>
              <div className="stat-card">
                <span>📊</span>
                <h3>
                  {filteredCourses.filter(c => c.progress >= 80).length}
                </h3>
                <p>Near Completion</p>
              </div>
              <div className="stat-card">
                <span>⏰</span>
                <h3>{filteredCourses.reduce((acc, course) => acc + course.lessons, 0)}h</h3>
                <p>Total Lessons</p>
              </div>
            </section>

            {/* Quick Links */}
            <section className="quick-links">
              <h3>⚡ Quick Access</h3>
              <div className="links-grid">
                {quickLinks.map((link, idx) => (
                  <div key={idx} className="link-card">
                    <span className="link-icon">{link.icon}</span>
                    <div className="link-info">
                      <p>{link.title}</p>
                      <small>{link.count} available</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Uploads with Download Options */}
            <section className="recent-uploads">
              <h3>📥 Recent Uploads - {selectedClass}</h3>
              <div className="subject-filter">
                <select onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="uploads-grid">
                {filteredUploads.map((upload, idx) => (
                  <div key={idx} className="upload-card">
                    <div className="upload-icon">
                      {upload.type === "PDF" ? "📄" : upload.type === "Video" ? "🎥" : upload.type === "Quiz" ? "📝" : "📚"}
                    </div>
                    <div className="upload-info">
                      <h4>{upload.title}</h4>
                      <p>{upload.subject}</p>
                      <small>
                        {upload.type === "PDF" ? `📄 ${upload.size || '2.5 MB'}` : 
                         upload.type === "Video" ? `🎥 ${upload.duration || '30 min'}` :
                         upload.type === "Quiz" ? `📝 ${upload.questions || 15} questions` : '📚 Assignment'}
                      </small>
                      <small className="upload-date">🕐 {upload.date}</small>
                    </div>
                    <div className="upload-actions">
                      {upload.type === "PDF" && (
                        <>
                          <button className="download-btn" title="Download PDF">
                            ⬇️ Download
                          </button>
                          <button className="view-btn" title="View Online">
                            👁️ View
                          </button>
                        </>
                      )}
                      {upload.type === "Video" && (
                        <>
                          <button className="download-btn" title="Download Video">
                            ⬇️ Download
                          </button>
                          <button className="watch-btn" title="Watch Now">
                            ▶️ Watch
                          </button>
                        </>
                      )}
                      {upload.type === "Quiz" && (
                        <button className="quiz-btn">Start Quiz</button>
                      )}
                      {upload.type === "Assignment" && (
                        <button className="assignment-btn">View Assignment</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Announcements */}
            <section className="announcements-section">
              <h3>📢 Announcements & Events</h3>
              <div className="announcements-list">
                {announcements.map((announcement, idx) => (
                  <div key={idx} className="announcement-card">
                    <div className="announcement-icon">
                      {announcement.type === "event" ? "🎉" : 
                       announcement.type === "exam" ? "📝" : 
                       announcement.type === "meeting" ? "👥" :
                       announcement.type === "holiday" ? "🎊" : "📢"}
                    </div>
                    <div className="announcement-content">
                      <h4>{announcement.title}</h4>
                      <p>📅 {announcement.date}</p>
                      <small>👥 {announcement.class}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === "courses" && (
          <section className="courses-full-section">
            <h3>📚 My Courses - {selectedClass}</h3>
            <div className="courses-grid">
              {filteredCourses.map((course, idx) => (
                <div key={idx} className="course-card">
                  <h4>{course.subject}</h4>
                  <p className="lessons">📖 {course.lessons} lessons</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{course.progress}% Complete</span>
                  <div className="course-actions">
                    <button className="continue-btn">Continue Learning</button>
                    {course.notes && (
                      <button className="notes-btn" title="Download Notes">
                        📄 Notes
                      </button>
                    )}
                    {course.videos && (
                      <button className="videos-btn" title="Watch Videos">
                        🎥 Videos
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "videos" && (
          <section className="videos-section">
            <h3>🎥 Video Library - {selectedClass}</h3>
            <div className="videos-grid">
              {filteredCourses.map((course, idx) => (
                <div key={idx} className="video-card">
                  <div className="video-thumbnail">
                    <span>🎥</span>
                  </div>
                  <div className="video-info">
                    <h4>{course.subject} - Video Lectures</h4>
                    <p>{course.lessons} videos available</p>
                    <small>Total duration: {course.lessons * 25} minutes</small>
                    <div className="video-actions">
                      <button className="watch-btn">▶️ Watch Playlist</button>
                      <button className="download-btn">⬇️ Download All</button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredUploads.filter(u => u.type === "Video").map((video, idx) => (
                <div key={`video-${idx}`} className="video-card">
                  <div className="video-thumbnail">
                    <span>🎬</span>
                  </div>
                  <div className="video-info">
                    <h4>{video.title}</h4>
                    <p>{video.subject}</p>
                    <small>Duration: {video.duration || '30 min'}</small>
                    <div className="video-actions">
                      <button className="watch-btn">▶️ Watch</button>
                      <button className="download-btn">⬇️ Download</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "notes" && (
          <section className="notes-section">
            <h3>📄 Study Notes - {selectedClass}</h3>
            <div className="notes-grid">
              {filteredCourses.map((course, idx) => (
                <div key={idx} className="note-card">
                  <div className="note-icon">📄</div>
                  <div className="note-info">
                    <h4>{course.subject} - Complete Notes</h4>
                    <p>Chapter 1-{Math.ceil(course.lessons/5)}</p>
                    <small>Size: {(course.lessons * 1.5).toFixed(1)} MB</small>
                    <div className="note-actions">
                      <button className="download-btn">⬇️ Download PDF</button>
                      <button className="view-btn">👁️ Preview</button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredUploads.filter(u => u.type === "PDF").map((note, idx) => (
                <div key={`note-${idx}`} className="note-card">
                  <div className="note-icon">📄</div>
                  <div className="note-info">
                    <h4>{note.title}</h4>
                    <p>{note.subject}</p>
                    <small>Size: {note.size || '2.5 MB'}</small>
                    <div className="note-actions">
                      <button className="download-btn">⬇️ Download</button>
                      <button className="view-btn">👁️ Preview</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "assignments" && (
          <section className="assignments-section">
            <h3>📝 Assignments - {selectedClass}</h3>
            <div className="assignments-list">
              {filteredCourses.map((course, idx) => (
                <div key={idx} className="assignment-card pending">
                  <div className="assignment-header">
                    <h4>{course.subject} Assignment</h4>
                    <span className="status pending">Pending</span>
                  </div>
                  <p>Complete exercises from Chapter {idx + 1}</p>
                  <p className="due-date">Due: March {15 + idx}, 2024</p>
                  <div className="assignment-actions">
                    <button className="download-btn">⬇️ Download</button>
                    <button className="submit-btn">Submit Assignment</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "resources" && (
          <section className="resources-section">
            <h3>📖 Study Resources - {selectedClass}</h3>
            <div className="resources-grid">
              <div className="resource-category">
                <h4>📚 Textbooks & Notes</h4>
                <div className="resource-list">
                  {filteredCourses.map((course, idx) => (
                    <div key={idx} className="resource-item">
                      <span>📄</span>
                      <div>
                        <p>{course.subject} Textbook</p>
                        <small>PDF • {(course.lessons * 2).toFixed(1)} MB</small>
                      </div>
                      <button className="download-btn">Download</button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="resource-category">
                <h4>🎥 Video Lectures</h4>
                <div className="resource-list">
                  {filteredCourses.map((course, idx) => (
                    <div key={idx} className="resource-item">
                      <span>🎥</span>
                      <div>
                        <p>{course.subject} - Complete Course</p>
                        <small>Video • {course.lessons} lessons</small>
                      </div>
                      <div className="resource-actions">
                        <button className="watch-btn">Watch</button>
                        <button className="download-btn">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="resource-category">
                <h4>📝 Practice Materials</h4>
                <div className="resource-list">
                  {filteredCourses.map((course, idx) => (
                    <div key={idx} className="resource-item">
                      <span>📝</span>
                      <div>
                        <p>{course.subject} - Practice Tests</p>
                        <small>Quiz • {course.lessons * 2} questions</small>
                      </div>
                      <button className="quiz-btn">Start Practice</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      </div>
  );
}