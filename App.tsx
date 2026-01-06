
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  Users, 
  ShieldCheck,
  Send
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import DetachmentList from './components/DetachmentList';
import DeploymentGuide from './components/DeploymentGuide';
import { DETACHMENTS, MOCK_RECORDS } from './constants';
import { ActivityRecord } from './types';

const BottomNavItem = ({ to, icon: Icon, label }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
        isActive ? 'text-blue-600' : 'text-slate-400'
      }`}
    >
      <Icon size={20} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] mt-1 font-bold">{label}</span>
    </Link>
  );
};

const App: React.FC = () => {
  // 从本地存储加载数据，如果没有则使用模拟数据
  const [records, setRecords] = useState<ActivityRecord[]>(() => {
    const saved = localStorage.getItem('gs_road_safety_data');
    return saved ? JSON.parse(saved) : MOCK_RECORDS;
  });

  // 每当数据变动时，自动保存到本地
  useEffect(() => {
    localStorage.setItem('gs_road_safety_data', JSON.stringify(records));
  }, [records]);

  const addRecord = (newRecord: ActivityRecord) => {
    setRecords(prev => [newRecord, ...prev]);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 pb-20 lg:pb-0 font-sans">
        {/* PC端侧边栏 */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white p-6 fixed h-full z-50">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-blue-600 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <h1 className="font-bold text-lg">甘肃路政安全</h1>
          </div>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all"><LayoutDashboard size={18}/>全省统计</Link>
            <Link to="/report" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all"><PlusCircle size={18}/>数据上报</Link>
            <Link to="/list" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all"><ClipboardList size={18}/>工作台账</Link>
            <Link to="/detachments" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all"><Users size={18}/>大队矩阵</Link>
            <Link to="/guide" className="flex items-center gap-3 px-4 py-3 text-blue-400 bg-blue-400/10 rounded-xl transition-all"><Send size={18}/>推广上线</Link>
          </nav>
        </aside>

        {/* 移动端顶部 */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-center z-40 lg:hidden px-4">
          <div className="w-8"></div>
          <span className="font-bold text-slate-800 flex-1 text-center">甘肃高速安全管理</span>
          <div className="w-8"></div>
        </header>

        {/* 主内容 */}
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-8 px-4 max-w-5xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard records={records} />} />
            <Route path="/report" element={<ActivityForm onAdd={addRecord} />} />
            <Route path="/list" element={<ActivityList records={records} />} />
            <Route path="/detachments" element={<DetachmentList detachments={DETACHMENTS} />} />
            <Route path="/guide" element={<DeploymentGuide />} />
          </Routes>
        </main>

        {/* 底部导航 */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-around h-16 lg:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <BottomNavItem to="/" icon={LayoutDashboard} label="统计" />
          <BottomNavItem to="/report" icon={PlusCircle} label="上报" />
          <BottomNavItem to="/list" icon={ClipboardList} label="台账" />
          <BottomNavItem to="/detachments" icon={Users} label="大队" />
          <BottomNavItem to="/guide" icon={Send} label="推广" />
        </nav>
      </div>
    </HashRouter>
  );
};

export default App;
