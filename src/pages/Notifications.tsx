import React from 'react';
import { Bell, Calendar, Users, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: 1,
      title: '工程の遅延警告',
      description: 'オフィスビルリノベーションプロジェクトで2日間の遅延が発生しています。',
      type: 'warning',
      timestamp: '30分前',
      read: false
    },
    {
      id: 2,
      title: '新規プロジェクトの承認',
      description: '商業施設改装工事の提案が承認されました。',
      type: 'success',
      timestamp: '2時間前',
      read: false
    },
    {
      id: 3,
      title: 'スケジュール更新',
      description: '明日の現場確認ミーティングが10:00に変更されました。',
      type: 'info',
      timestamp: '4時間前',
      read: true
    },
    {
      id: 4,
      title: '安全性の警告',
      description: '現場での安全装備の不備が報告されています。至急の確認が必要です。',
      type: 'error',
      timestamp: '昨日',
      read: true
    }
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">通知</h1>
          <p className="text-gray-600">未読の通知が2件あります</p>
        </div>
        <button className="text-blue-500 hover:text-blue-600 transition-colors">
          すべて既読にする
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.read ? 'bg-white' : getBgColor(notification.type)
            } ${notification.read ? 'border-gray-200' : 'border-transparent'}`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.timestamp}</span>
                </div>
                <p className="text-gray-600 mt-1">{notification.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;