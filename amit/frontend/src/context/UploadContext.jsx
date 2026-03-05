import React, { createContext, useContext, useState } from 'react';

const UploadContext = createContext();

export const useUploads = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUploads must be used within an UploadProvider');
  }
  return context;
};

export const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([
    // Initial sample data
    { 
      id: 1,
      title: "Math Basics - Addition", 
      type: "PDF", 
      subject: "Mathematics", 
      class: "Class 1", 
      date: "2 hours ago", 
      size: "1.2 MB",
      teacherName: "Mr. Sharma",
      downloads: 45
    },
    { 
      id: 2,
      title: "Alphabet Song", 
      type: "Video", 
      subject: "English", 
      class: "Class 1", 
      date: "3 hours ago", 
      duration: "15 min",
      teacherName: "Mrs. Verma",
      views: 78
    },
    { 
      id: 3,
      title: "Science Experiment - Plants", 
      type: "Video", 
      subject: "Science", 
      class: "Class 3", 
      date: "1 day ago", 
      duration: "25 min",
      teacherName: "Dr. Kumar",
      views: 120
    },
    { 
      id: 4,
      title: "Algebra Notes", 
      type: "PDF", 
      subject: "Mathematics", 
      class: "Class 6", 
      date: "4 hours ago", 
      size: "2.5 MB",
      teacherName: "Mr. Patel",
      downloads: 67
    },
    { 
      id: 5,
      title: "Cell Structure Video", 
      type: "Video", 
      subject: "Science", 
      class: "Class 8", 
      date: "6 hours ago", 
      duration: "35 min",
      teacherName: "Mrs. Gupta",
      views: 95
    }
  ]);

  const addUpload = (newUpload) => {
    const uploadWithId = {
      ...newUpload,
      id: uploads.length + 1,
      date: "Just now"
    };
    setUploads([uploadWithId, ...uploads]);
    return uploadWithId;
  };

  const updateUpload = (id, updatedData) => {
    setUploads(uploads.map(upload => 
      upload.id === id ? { ...upload, ...updatedData } : upload
    ));
  };

  const deleteUpload = (id) => {
    setUploads(uploads.filter(upload => upload.id !== id));
  };

  const getUploadsByClass = (className) => {
    return uploads.filter(upload => upload.class === className);
  };

  const getUploadsByClassAndType = (className, type) => {
    return uploads.filter(upload => 
      upload.class === className && 
      (type === 'all' || upload.type === type)
    );
  };

  const value = {
    uploads,
    addUpload,
    updateUpload,
    deleteUpload,
    getUploadsByClass,
    getUploadsByClassAndType
  };

  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  );
};
