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

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/api';
const DEFAULT_STUDENT_ID = 'std_01';

async function fetchFromBackend<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch (err) {
    // Backend offline or timeout -> use resilient fallback
  }
  return fallbackData as T;
}

export async function getStudentProfile(): Promise<StudentProfile> {
  return fetchFromBackend<StudentProfile>(
    `/students/${DEFAULT_STUDENT_ID}/profile`,
    undefined,
    { ...MOCK_STUDENT }
  );
}

export async function updateStudentProfile(profileData: Partial<StudentProfile>): Promise<StudentProfile> {
  const current = await getStudentProfile();
  const merged = { ...current, ...profileData };
  return fetchFromBackend<StudentProfile>(
    `/students/${DEFAULT_STUDENT_ID}/profile`,
    {
      method: 'POST',
      body: JSON.stringify(merged)
    },
    merged
  );
}

export async function getPlacementReadiness() {
  return fetchFromBackend(
    `/students/${DEFAULT_STUDENT_ID}/placement-readiness`,
    undefined,
    {
      score: MOCK_STUDENT.stats.placementReadiness,
      delta: MOCK_STUDENT.stats.readinessDeltaMonth,
      status: 'On Track',
      confidence: 88,
      datapoints: 1247
    }
  );
}

export async function getSkillAnalysis(): Promise<{ skills: SkillItem[]; radar: SkillRadarItem[] }> {
  return fetchFromBackend(
    `/students/${DEFAULT_STUDENT_ID}/skills`,
    undefined,
    {
      skills: [...MOCK_SKILLS],
      radar: [...MOCK_SKILL_RADAR]
    }
  );
}

export async function getCompanyMatches(): Promise<CompanyMatch[]> {
  return fetchFromBackend<CompanyMatch[]>(
    `/students/${DEFAULT_STUDENT_ID}/companies`,
    undefined,
    [...MOCK_COMPANIES]
  );
}

export async function getCompanyById(id: string): Promise<CompanyMatch | undefined> {
  const companies = await getCompanyMatches();
  return companies.find((c) => c.id === id);
}

export async function getRoadmap(): Promise<RoadmapPhase[]> {
  return fetchFromBackend<RoadmapPhase[]>(
    `/students/${DEFAULT_STUDENT_ID}/roadmap`,
    undefined,
    [...MOCK_ROADMAP]
  );
}

export async function getDailyPlan(): Promise<DailyTask[]> {
  return fetchFromBackend<DailyTask[]>(
    `/students/${DEFAULT_STUDENT_ID}/daily-plan`,
    undefined,
    [...MOCK_DAILY_TASKS]
  );
}

export async function getInterviewAnalytics(): Promise<InterviewAnalytics> {
  return { ...MOCK_INTERVIEW_ANALYTICS };
}

export async function getResumeAnalysis(): Promise<ResumeAnalysis> {
  return { ...MOCK_RESUME_ANALYSIS };
}

export async function getDigitalTwin(): Promise<{ nodes: DigitalTwinNode[]; confidence: number; datapoints: number }> {
  return fetchFromBackend(
    `/students/${DEFAULT_STUDENT_ID}/digital-twin`,
    undefined,
    {
      nodes: [...MOCK_DIGITAL_TWIN_NODES],
      confidence: 88,
      datapoints: 1247
    }
  );
}

export async function getIntegrations(): Promise<Integration[]> {
  return [...MOCK_INTEGRATIONS];
}

export async function getNotifications(): Promise<NotificationItem[]> {
  return [...MOCK_NOTIFICATIONS];
}

export async function getProgressHistory() {
  return { ...MOCK_PROGRESS_HISTORY };
}

export async function askTwinAIAssistant(userQuery: string): Promise<string> {
  try {
    const res = await fetchFromBackend<{ reply: string }>(
      '/assistant/chat',
      {
        method: 'POST',
        body: JSON.stringify({ query: userQuery, student_id: DEFAULT_STUDENT_ID })
      },
      { reply: '' }
    );
    if (res.reply) return res.reply;
  } catch (e) {
    // Fallback logic
  }

  const q = userQuery.toLowerCase();
  if (q.includes('study') || q.includes('today')) {
    return 'Based on your Digital Twin concept graph, today you should prioritize Recursion Foundations for 45 minutes to unlock Tree DP and Cycle Detection. Your CS fundamentals (58%) need closing to match Microsoft benchmarks.';
  }
  if (q.includes('capgemini')) {
    return 'You have an 88% readiness for Capgemini. Your core problem solving and React skills meet their hiring benchmark. Focus briefly on cloud fundamentals and brush up on behavioral competencies to lock in your offer.';
  }
  if (q.includes('microsoft')) {
    return 'Your readiness for Microsoft is 54%. While your fundamental DSA (Arrays, Trees) is on track, you have significant gaps in System Design (-27%) and Tree DP (-22%). Complete Phase 1 and 2 of your roadmap first.';
  }
  return 'I have analyzed your Digital Twin across 1,247 career datapoints. You are on track for 8-15 LPA roles. Focus on unblocking prerequisite bottlenecks to maintain your 12-day streak!';
}

// Concept Dependency Graph & Diagnostic Extensions
export async function getConceptGraph() {
  return fetchFromBackend('/graph', undefined, null);
}

export async function runRootCauseDiagnosis(conceptId?: string) {
  return fetchFromBackend(
    `/students/${DEFAULT_STUDENT_ID}/diagnose`,
    {
      method: 'POST',
      body: JSON.stringify({ concept_id: conceptId })
    },
    null
  );
}

export async function syncCodeforces(handle: string, count: number = 100) {
  return fetchFromBackend(
    '/students/sync-codeforces',
    {
      method: 'POST',
      body: JSON.stringify({ handle, count })
    },
    null
  );
}
