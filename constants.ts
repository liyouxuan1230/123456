
import { ActivityType, Detachment, ActivityRecord } from './types';

// 生成甘肃省62个大队的模拟列表（示例名称）
export const DETACHMENTS: Detachment[] = Array.from({ length: 62 }, (_, i) => ({
  id: `DT-${(i + 1).toString().padStart(3, '0')}`,
  name: `路政执法第${i + 1}大队`,
  region: i < 20 ? '河西片区' : i < 40 ? '兰州片区' : '陇东片区',
  completedCount: Math.floor(Math.random() * 15),
  totalPlanned: 20
}));

export const MOCK_RECORDS: ActivityRecord[] = [
  {
    id: '1',
    detachmentId: 'DT-001',
    detachmentName: '路政执法第1大队',
    type: ActivityType.WEAKNESS_CHECK,
    date: '2024-05-15',
    title: 'G30连霍高速Kxxxx段边坡隐患排查',
    description: '对连霍高速重点路段进行了细致排查，发现隐患3处，已下发整改通知书。',
    participants: 5,
    location: 'G30连霍高速',
    status: '已完成'
  },
  {
    id: '2',
    detachmentId: 'DT-012',
    detachmentName: '路政执法第12大队',
    type: ActivityType.DRILL,
    date: '2024-05-18',
    title: '隧道火灾逃生应急演练',
    description: '联合交警、养护部门在木塔寺隧道开展实战演练。',
    participants: 45,
    location: '木塔寺隧道',
    status: '已完成'
  }
];
