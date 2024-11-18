import React from 'react';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  avatar: string;
  projects: string[];
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: '山田 健一',
      role: '現場監督',
      email: 'yamada.k@buildflow.co.jp',
      phone: '080-1234-5678',
      location: '東京本社',
      department: '建設部',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      projects: ['新築マンション建設', 'オフィスビルリノベーション']
    },
    {
      id: 2,
      name: '佐藤 美咲',
      role: '建築設計士',
      email: 'sato.m@buildflow.co.jp',
      phone: '080-8765-4321',
      location: '大阪支社',
      department: '設計部',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      projects: ['住宅団地開発', '商業施設改装']
    },
    {
      id: 3,
      name: '田中 太郎',
      role: 'プロジェクトマネージャー',
      email: 'tanaka.t@buildflow.co.jp',
      phone: '080-2345-6789',
      location: '東京本社',
      department: 'プロジェクト管理部',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      projects: ['新築マンション建設', '住宅団地開発']
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">チームメンバー</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          メンバーを追加
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>{member.department} • {member.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${member.email}`} className="hover:text-blue-500">
                  {member.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <a href={`tel:${member.phone}`} className="hover:text-blue-500">
                  {member.phone}
                </a>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">担当プロジェクト</p>
              <div className="flex flex-wrap gap-2">
                {member.projects.map((project) => (
                  <span
                    key={project}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;