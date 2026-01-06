
export enum ActivityType {
  WEAKNESS_CHECK = '弱势排查',
  TRAINING = '安全培训',
  PROMOTION = '安全宣传',
  DRILL = '应急演练'
}

export interface ActivityRecord {
  id: string;
  detachmentId: string;
  detachmentName: string;
  type: ActivityType;
  date: string;
  title: string;
  description: string;
  participants: number;
  location: string;
  status: '已完成' | '进行中' | '计划中';
}

export interface Detachment {
  id: string;
  name: string;
  region: string;
  completedCount: number;
  totalPlanned: number;
}

export interface DashboardStats {
  totalActivities: number;
  typeDistribution: Record<ActivityType, number>;
  completionRate: number;
  recentActivities: ActivityRecord[];
}
