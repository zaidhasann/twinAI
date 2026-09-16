export interface StudentProfile {
  id: string;
  name: string;
  college: string;
  degree: string;
  graduationYear: number;
  cgpa: number;
  avatarUrl: string;
  targetRole: string;
  targetSalary: string;
  targetCompanies: string[];
  stats: {
    leetCodeProblems: number;
    githubRepos: number;
    projectsCount: number;
    placementReadiness: number;
    readinessDeltaMonth: number;
    interviewReadiness: number;
    resumeScore: number;
    dsaScore: number;
    developmentScore: number;
    systemDesignScore: number;
    dbmsScore: number;
    communicationScore: number;
    consistencyScore: number;
    streakDays: number;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'DSA' | 'Development' | 'CS Fundamentals' | 'System Design' | 'Soft Skills';
  currentScore: number;
  requiredScore: number;
  priority: 'high' | 'medium' | 'low';
  gap: number;
  impactOnPlacement: string;
  recommendation: string;
  recommendedTopics: string[];
}

export interface SkillRadarItem {
  subject: string;
  score: number;
  benchmark: number;
  fullMark: number;
}

export interface CompanyMatch {
  id: string;
  name: string;
  logo: string;
  readiness: number;
  status: 'Strong Match' | 'Good Match' | 'Needs Preparation';
  salaryRange: string;
  role: string;
  skillsMatched: string[];
  missingSkills: string[];
  recommendedPreparation: string[];
  description: string;
  targetTimeline: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedHours: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  category: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  progressPercentage: number;
  topics: RoadmapTopic[];
}

export interface DailyTask {
  id: string;
  title: string;
  subtitle: string;
  timeEstimate: string;
  status: 'completed' | 'pending' | 'in_progress';
  type: 'dsa' | 'dbms' | 'development' | 'interview';
  priority: 'high' | 'medium' | 'standard';
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  statusText: string;
  lastSynced: string;
  detail: string;
  actionText: string;
}

export interface ResumeAnalysis {
  overallScore: number;
  breakdown: {
    skills: number;
    projects: number;
    experience: number;
    formatting: number;
    atsCompatibility: number;
  };
  suggestions: {
    type: 'warning' | 'success' | 'info';
    text: string;
    impact: string;
  }[];
}

export interface InterviewAnalytics {
  overallScore: number;
  breakdown: {
    technical: number;
    communication: number;
    problemSolving: number;
    confidence: number;
    csFundamentals: number;
  };
  weeklyProgress: {
    week: string;
    score: number;
  }[];
  aiFeedback: string;
  strengths: string[];
  growthAreas: string[];
}

export interface DigitalTwinNode {
  id: string;
  label: string;
  score: number;
  status: 'Strong' | 'Good' | 'Attention';
  description: string;
  updatedAgo: string;
  x: number;
  y: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'success' | 'alert' | 'update' | 'growth';
}
