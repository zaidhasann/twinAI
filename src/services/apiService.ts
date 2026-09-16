import {
  StudentProfile,
  SkillItem,
  SkillRadarItem,
  CompanyMatch,
  RoadmapPhase,
  DailyTask,
  Integration,
  ResumeAnalysis,
  InterviewAnalytics,
  DigitalTwinNode,
  NotificationItem
} from '../types';

import {
  MOCK_STUDENT,
  MOCK_SKILL_RADAR,
  MOCK_SKILLS,
  MOCK_COMPANIES,
  MOCK_ROADMAP,
  MOCK_DAILY_TASKS,
  MOCK_INTEGRATIONS,
  MOCK_RESUME_ANALYSIS,
  MOCK_INTERVIEW_ANALYTICS,
  MOCK_DIGITAL_TWIN_NODES,
  MOCK_NOTIFICATIONS,
  MOCK_PROGRESS_HISTORY
} from '../data/mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getStudentProfile(): Promise<StudentProfile> {
  await delay(300);
  return { ...MOCK_STUDENT };
}

export async function getPlacementReadiness() {
  await delay(250);
  return {
    score: MOCK_STUDENT.stats.placementReadiness,
    delta: MOCK_STUDENT.stats.readinessDeltaMonth,
    status: 'On Track',
    confidence: 87,
    datapoints: 1247
  };
}

export async function getSkillAnalysis(): Promise<{ skills: SkillItem[]; radar: SkillRadarItem[] }> {
  await delay(300);
  return {
    skills: [...MOCK_SKILLS],
    radar: [...MOCK_SKILL_RADAR]
  };
}

export async function getCompanyMatches(): Promise<CompanyMatch[]> {
  await delay(300);
  return [...MOCK_COMPANIES];
}

export async function getCompanyById(id: string): Promise<CompanyMatch | undefined> {
  await delay(200);
  return MOCK_COMPANIES.find((c) => c.id === id);
}

export async function getRoadmap(): Promise<RoadmapPhase[]> {
  await delay(250);
  return [...MOCK_ROADMAP];
}

export async function getDailyPlan(): Promise<DailyTask[]> {
  await delay(200);
  return [...MOCK_DAILY_TASKS];
}

export async function getInterviewAnalytics(): Promise<InterviewAnalytics> {
  await delay(300);
  return { ...MOCK_INTERVIEW_ANALYTICS };
}

export async function getResumeAnalysis(): Promise<ResumeAnalysis> {
  await delay(250);
  return { ...MOCK_RESUME_ANALYSIS };
}

export async function getDigitalTwin(): Promise<{ nodes: DigitalTwinNode[]; confidence: number; datapoints: number }> {
  await delay(300);
  return {
    nodes: [...MOCK_DIGITAL_TWIN_NODES],
    confidence: 87,
    datapoints: 1247
  };
}

export async function getIntegrations(): Promise<Integration[]> {
  await delay(250);
  return [...MOCK_INTEGRATIONS];
}

export async function getNotifications(): Promise<NotificationItem[]> {
  await delay(150);
  return [...MOCK_NOTIFICATIONS];
}

export async function getProgressHistory() {
  await delay(250);
  return { ...MOCK_PROGRESS_HISTORY };
}

export async function askTwinAIAssistant(userQuery: string): Promise<string> {
  await delay(600);
  const q = userQuery.toLowerCase();

  if (q.includes('study') || q.includes('today')) {
    return 'Based on your digital twin profile, today you should prioritize Binary Trees (DSA) for 45 minutes and DBMS Normalization for 30 minutes. Your DSA is solid at 81%, but your CS fundamentals (58%) need closing to match Accenture and Microsoft requirements.';
  }
  if (q.includes('capgemini')) {
    return 'You have an 88% readiness for Capgemini. Your core problem solving and React skills meet their hiring benchmark. Focus briefly on cloud fundamentals and brush up on behavioral competencies to lock in your offer.';
  }
  if (q.includes('microsoft')) {
    return 'Your readiness for Microsoft is 54%. While your fundamental DSA (Arrays, Trees) is on track, you have significant gaps in System Design (-27%) and Advanced Graph Algorithms (-17%). Complete Phase 2 and 3 of your placement roadmap first.';
  }
  if (q.includes('low') || q.includes('score')) {
    return 'Your placement readiness is at 78% (On Track). The biggest drag on your score is System Design (48%) and Mock Interview confidence (61%). Tackling the 3 high-priority gaps in your Skill Gap tab will immediately bump you past 85%.';
  }
  if (q.includes('resume')) {
    return 'Your resume scores 86/100. To push past 90, quantify your projects with metrics (e.g. Reduced query response by 35% with Redis) and specify your deployment architecture (Docker, CI/CD).';
  }

  return 'I have analyzed your Digital Twin across 1,247 career datapoints. You are on track for 8-15 LPA roles. Focus on System Design basics and complete your daily tasks to maintain your 12-day streak!';
}
