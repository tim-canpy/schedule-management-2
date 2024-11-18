import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

interface Project {
  title: string;
  progress: number;
  dueDate: string;
  teamSize: number;
  status: '順調' | '要注意' | '遅延';
  description: string;
  client: string;
  budget: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: '新築マンション建設プロジェクト',
      progress: 75,
      dueDate: '2024年9月30日',
      teamSize: 12,
      status: '順調',
      description: '23階建て高層マンションの新築工事。免震構造を採用し、最新の環境技術を導入。',
      client: '住友不動産',
      budget: '15億円'
    },
    {
      title: 'オフィスビルリノベーション',
      progress: 45,
      dueDate: '2024年8月15日',
      teamSize: 8,
      status: '要注意',
      description: '築20年のオフィスビルの全面改装。省エネ設備の導入とワークスペースの最適化。',
      client: '三井不動産',
      budget: '8億円'
    },
    {
      title: '住宅団地開発プロジェクト',
      progress: 30,
      dueDate: '2024年10月20日',
      teamSize: 15,
      status: '遅延',
      description: '50戸規模の戸建て住宅団地の開発。コミュニティースペースと緑地帯の整備を含む。',
      client: '大和ハウス',
      budget: '12億円'
    },
    {
      title: '商業施設改装工事',
      progress: 90,
      dueDate: '2024年5月10日',
      teamSize: 10,
      status: '順調',
      description: '大型ショッピングモールのリニューアル工事。店舗レイアウトの変更と共用部の改装。',
      client: 'イオンモール',
      budget: '6億円'
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">プロジェクト一覧</h1>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5" />
          <span>新規プロジェクト</span>
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="プロジェクトを検索..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5" />
          <span>フィルター</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;