import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight, Plus, MapPin, X } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: '工事' | '打ち合わせ' | '検査';
  participants: string[];
  location?: string;
  description?: string;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: '基礎工事開始',
      date: '2024-03-20',
      time: '09:00',
      type: '工事',
      participants: ['山田健一', '佐藤美咲'],
      location: '新宿区現場A',
      description: '基礎工事の開始。資材の確認と安全チェックを実施。',
    },
    {
      id: 2,
      title: '施主様との進捗確認',
      date: '2024-03-20',
      time: '14:00',
      type: '打ち合わせ',
      participants: ['田中太郎', '鈴木一郎'],
      location: '本社会議室',
      description: '工事の進捗報告と今後のスケジュール確認',
    },
    {
      id: 3,
      title: '電気設備の検査',
      date: '2024-03-20',
      time: '16:00',
      type: '検査',
      participants: ['高橋修', '伊藤直子'],
      location: '渋谷区現場B',
      description: '電気設備の安全検査と動作確認',
    },
  ]);

  const typeColors = {
    '工事': 'bg-blue-100 text-blue-800',
    '打ち合わせ': 'bg-green-100 text-green-800',
    '検査': 'bg-purple-100 text-purple-800',
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const EventModal = () => {
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
      title: '',
      date: selectedDate.toISOString().split('T')[0],
      time: '09:00',
      type: '工事',
      participants: [],
      location: '',
      description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedEvent) {
        setEvents(events.map(event => 
          event.id === selectedEvent.id ? { ...newEvent, id: selectedEvent.id } as Event : event
        ));
      } else {
        setEvents([...events, { ...newEvent, id: events.length + 1 } as Event]);
      }
      setShowEventModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {selectedEvent ? 'イベントを編集' : '新規イベント'}
            </h3>
            <button onClick={() => setShowEventModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  日付
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  時間
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                種類
              </label>
              <select
                value={newEvent.type}
                onChange={e => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="工事">工事</option>
                <option value="打ち合わせ">打ち合わせ</option>
                <option value="検査">検査</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                場所
              </label>
              <input
                type="text"
                value={newEvent.location}
                onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                説明
              </label>
              <textarea
                value={newEvent.description}
                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

    const weekDayHeader = weekDays.map(day => (
      <div key={day} className="text-center font-medium text-gray-600 p-2">
        {day}
      </div>
    ));

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 bg-gray-50 text-gray-400">
          {getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)) - firstDay + i + 1}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const dayEvents = getEventsForDate(date);

      days.push(
        <button
          key={i}
          onClick={() => setSelectedDate(date)}
          className={`p-2 relative hover:bg-gray-100 transition-colors min-h-[80px] ${
            isToday ? 'bg-blue-50' : 'bg-white'
          } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        >
          <span className={`text-sm ${isToday ? 'text-blue-600 font-semibold' : 'text-gray-900'}`}>
            {i}
          </span>
          <div className="mt-1 space-y-1">
            {dayEvents.map((event, index) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded ${typeColors[event.type]} truncate`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
              >
                {event.time} {event.title}
              </div>
            ))}
          </div>
        </button>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
          </h2>
          <div className="flex gap-4 items-center">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDayHeader}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">スケジュール管理</h1>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setShowEventModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>予定を追加</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {renderCalendar()}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}の予定
            </h2>
            <div className="space-y-4">
              {getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventModal(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${typeColors[event.type]}`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{event.participants.length}名が参加</span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {getEventsForDate(selectedDate).length === 0 && (
                <p className="text-gray-500 text-center py-4">予定はありません</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showEventModal && <EventModal />}
    </div>
  );
};

export default Schedule;